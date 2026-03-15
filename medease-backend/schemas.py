from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


# ── Signup ──
class UserCreate(BaseModel):
    pharmacy_name: str
    name:          str
    email:         EmailStr
    password:      str
    role:          Optional[str] = "owner"


# ── Login ──
class UserLogin(BaseModel):
    email:    EmailStr
    password: str


# ── What we send back after login/signup ──
class UserOut(BaseModel):
    id:            int
    pharmacy_name: str
    name:          str
    email:         str
    role:          str
    created_at:    datetime

    class Config:
        from_attributes = True   # allows reading from SQLAlchemy model directly


# ── The token response ──
class Token(BaseModel):
    access_token: str
    token_type:   str
    user:         UserOut


# ── What lives inside the JWT ──
class TokenData(BaseModel):
    user_id: Optional[int] = None
    role:    Optional[str] = None