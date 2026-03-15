from datetime import datetime, timedelta
from typing import Optional

from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from database import get_db
from models import User
from schemas import TokenData

# ── Secret key — change this to a long random string in production ──
# Generate one with: python -c "import secrets; print(secrets.token_hex(32))"
SECRET_KEY  = "change-this-to-a-long-random-secret-key-before-deploying"
ALGORITHM   = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7   # 7 days

# ── Password hashing ──
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ── Bearer token extractor ──
bearer_scheme = HTTPBearer()


def hash_password(plain_password: str) -> str:
    """Convert plain text password to bcrypt hash."""
    return pwd_context.hash(plain_password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Check if plain text password matches the stored hash."""
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create a signed JWT token."""
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_token(token: str) -> TokenData:
    """Decode and verify a JWT token. Raises 401 if invalid."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload  = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id  = payload.get("sub")
        role     = payload.get("role")
        if user_id is None:
            raise credentials_exception
        return TokenData(user_id=int(user_id), role=role)
    except JWTError:
        raise credentials_exception


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db)
) -> User:
    """
    Dependency — use this on any protected route.
    Extracts Bearer token from Authorization header,
    decodes it, and returns the User from the database.
    """
    token_data = decode_token(credentials.credentials)
    user = db.query(User).filter(User.id == token_data.user_id).first()
    if user is None or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive"
        )
    return user


def require_role(*roles: str):
    """
    Role-based access control dependency factory.
    Usage: Depends(require_role("owner", "pharmacist"))
    """
    def role_checker(current_user: User = Depends(get_current_user)) -> User:
        if current_user.role not in roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. Required role: {', '.join(roles)}"
            )
        return current_user
    return role_checker