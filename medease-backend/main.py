from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, get_db, Base
from models import User
from schemas import UserCreate, UserLogin, Token, UserOut
from auth import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user
)

# ── Create all database tables on startup ──
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MedEase API",
    description="Pharmacy management system backend",
    version="1.0.0"
)

# ── CORS — allows your HTML frontend to call this API ──
# In production replace "*" with your actual domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ════════════════════════════════════════
# AUTH ROUTES
# ════════════════════════════════════════

@app.post("/auth/signup", response_model=Token, status_code=status.HTTP_201_CREATED)
def signup(user_data: UserCreate, db: Session = Depends(get_db)):
    """
    Register a new pharmacy user.
    Returns a JWT token immediately so the user is
    logged in right after signing up — no extra step.
    """

    # Check if email already exists
    existing = db.query(User).filter(User.email == user_data.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email already exists"
        )

    # Validate password length
    if len(user_data.password) < 8:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters"
        )

    # Validate role
    valid_roles = ["owner", "pharmacist", "staff"]
    if user_data.role not in valid_roles:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Role must be one of: {', '.join(valid_roles)}"
        )

    # Create user
    new_user = User(
        pharmacy_name   = user_data.pharmacy_name.strip(),
        name            = user_data.name.strip(),
        email           = user_data.email.lower().strip(),
        hashed_password = hash_password(user_data.password),
        role            = user_data.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Create token
    token = create_access_token(data={
        "sub":  str(new_user.id),
        "role": new_user.role
    })

    return Token(
        access_token=token,
        token_type="bearer",
        user=new_user
    )


@app.post("/auth/login", response_model=Token)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    """
    Log in with email and password.
    Returns a JWT token on success.
    """

    # Find user by email
    user = db.query(User).filter(
        User.email == credentials.email.lower().strip()
    ).first()

    # Generic error — don't reveal whether email exists or not
    auth_error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect email or password"
    )

    if not user:
        raise auth_error

    if not verify_password(credentials.password, user.hashed_password):
        raise auth_error

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="This account has been deactivated"
        )

    # Create token
    token = create_access_token(data={
        "sub":  str(user.id),
        "role": user.role
    })

    return Token(
        access_token=token,
        token_type="bearer",
        user=user
    )


# ════════════════════════════════════════
# PROTECTED ROUTES (require login)
# ════════════════════════════════════════

@app.get("/auth/me", response_model=UserOut)
def get_me(current_user: User = Depends(get_current_user)):
    """
    Returns the currently logged-in user's profile.
    Frontend calls this on app load to check if
    the stored token is still valid.
    """
    return current_user


@app.patch("/auth/me", response_model=UserOut)
def update_profile(
    updates: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update pharmacy name or display name."""
    allowed_fields = {"pharmacy_name", "name"}
    for field, value in updates.items():
        if field in allowed_fields and value:
            setattr(current_user, field, value.strip())
    db.commit()
    db.refresh(current_user)
    return current_user


# ════════════════════════════════════════
# HEALTH CHECK
# ════════════════════════════════════════

@app.get("/")
def root():
    return {"status": "ok", "app": "MedEase API", "version": "1.0.0"}