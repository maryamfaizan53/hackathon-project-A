# backend/src/api/auth.py

from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from ..auth import create_access_token, hash_password, verify_token, verify_password
from ..models.user import SignupData, User, UserInDB, LoginData, AuthResponse
from ..services.user_service import create_user, get_user_by_email
import os

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

ACCESS_TOKEN_EXPIRE_DAYS = int(os.getenv("ACCESS_TOKEN_EXPIRE_DAYS", 7))

# PEHLE get_current_user define karo
async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token_data = verify_token(token, credentials_exception)
    user = get_user_by_email(token_data.email)
    if user is None:
        raise credentials_exception
    return User(userId=user.userId, email=user.email, name=user.name, preferences=user.preferences)

@router.post("/signup", response_model=AuthResponse)  # Response model change karo
async def signup_user(signup_data: SignupData):
    db_user = get_user_by_email(signup_data.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    hashed_password = hash_password(signup_data.password)
    user_in_db = UserInDB(
        email=signup_data.email,
        name=signup_data.name,
        preferences=signup_data.preferences,
        hashed_password=hashed_password
    )
    
    created_user = create_user(user_in_db)
    if not created_user:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create user"
        )
    
    access_token_expires = timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    access_token = create_access_token(
        data={"sub": created_user.email}, expires_delta=access_token_expires
    )
    
    # Return proper AuthResponse format
    return AuthResponse(
        message="User successfully registered",
        token=access_token,
        user=User(
            userId=created_user.userId,
            email=created_user.email,
            name=created_user.name,
            preferences=created_user.preferences
        )
    )

@router.post("/login", response_model=AuthResponse)  # Response model change karo
async def login_user(login_data: LoginData):
    print(f"Login attempt for email: {login_data.email}")
    try:
        user = get_user_by_email(login_data.email)
        if not user or not verify_password(login_data.password, user.hashed_password):
            print(f"Login failed: Invalid credentials for {login_data.email}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        access_token_expires = timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
        access_token = create_access_token(
            data={"sub": user.email}, expires_delta=access_token_expires
        )
        
        print(f"Login successful for {login_data.email}")
        # Return proper AuthResponse format
        return AuthResponse(
            message="Login successful",
            token=access_token,
            user=User(
                userId=user.userId,
                email=user.email,
                name=user.name,
                preferences=user.preferences
            )
        )
    except HTTPException:
        raise
    except Exception as e:
        print(f"CRITICAL ERROR during login for {login_data.email}: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Login failed due to server error: {str(e)}"
        )

@router.get("/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user