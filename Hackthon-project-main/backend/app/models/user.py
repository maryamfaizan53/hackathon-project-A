# user.py

from typing import List, Optional
from uuid import UUID, uuid4
from pydantic import BaseModel, EmailStr, Field
import os

# User Preferences Model
class UserPreferences(BaseModel):
    level: str = Field(..., example="beginner", pattern="^(beginner|intermediate|advanced)$")
    languages: List[str] = Field(..., example=["Python", "JavaScript"])
    aiExperience: str = Field(..., example="basic", pattern="^(none|basic|intermediate|advanced)$")
    hardwareKnowledge: str = Field(..., example="intermediate", pattern="^(basic|intermediate|advanced)$")

# Base User Model (for response without hashed password)
class User(BaseModel):
    userId: UUID = Field(default_factory=uuid4)
    email: EmailStr
    name: str
    preferences: UserPreferences

# User Model with password (for signup)
class SignupData(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)  # Add password requirements
    name: str
    preferences: UserPreferences

# User Model for login
class LoginData(BaseModel):
    email: EmailStr
    password: str

# User Model to store in DB (includes hashed password)
class UserInDB(User):
    hashed_password: str

# Token Data (from auth.py) - also used in this module
class TokenData(BaseModel):
    email: Optional[str] = None

# backend/src/models/user.py me ye add karo

class AuthResponse(BaseModel):
    message: str
    token: str
    user: User  # User object without hashed_password