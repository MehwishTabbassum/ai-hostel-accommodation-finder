from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.user import User
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Annotated

# Placeholder for actual JWT handling
# In a real application, you'd use a library like `python-jose` for JWT tokens
# For simplicity, we'll just return a success message for login/signup for now.
# This part needs to be fully implemented with proper JWT token generation and validation.

router = APIRouter(prefix="/auth", tags=["Authentication"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token") # This tokenUrl must match the actual login endpoint

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

@router.post("/signup")
def signup(
    name: str,
    email: str,
    password: str,
    user_type: str, # Student or Parent
    phone_number: str | None = None,
    location: str | None = None, # city
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    hashed_password = get_password_hash(password)
    new_user = User(
        name=name,
        email=email,
        phone_number=phone_number,
        location=location,
        user_type=user_type,
        password_hash=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully", "user_id": new_user.id}

@router.post("/token")
def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    # In a real app, generate a JWT token here
    # For now, we'll just return a placeholder access token
    access_token_expires = timedelta(minutes=30)
    # Replace with actual JWT creation
    # access_token = create_access_token(
    #     data={"sub": user.email}, expires_delta=access_token_expires
    # )
    return {"access_token": "fake-access-token", "token_type": "bearer"}

# Dependency to get current user (requires a valid token)
def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
    # In a real app, decode and validate JWT token
    # For now, we'll just assume any token is valid and return a dummy user
    user = db.query(User).filter(User.email == "test@example.com").first() # Placeholder
    if not user:
        raise HTTPException(status_code=400, detail="Could not validate credentials")
    return user

@router.get("/users/me")
def read_users_me(current_user: Annotated[User, Depends(get_current_user)]):
    return current_user