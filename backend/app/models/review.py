from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float
from sqlalchemy.orm import relationship
from app.db import Base
from datetime import datetime

class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    hostel_id = Column(Integer, ForeignKey("hostels.id"))
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True) # Anonymous reviews, so nullable
    rating = Column(Integer, nullable=False) # Star rating (e.g., 1 to 5)
    comment = Column(String, nullable=True)
    date = Column(DateTime, default=datetime.utcnow)

    hostel = relationship("Hostel")
    user = relationship("User") # Optional, for anonymous reviews