from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.review import Review
from app.models.hostel import Hostel
from app.routes.auth import get_current_user # To get user for review submission
from app.models.user import User
from typing import List, Optional

router = APIRouter(prefix="/reviews", tags=["Reviews"])

@router.post("/{hostel_id}")
def submit_review(
    hostel_id: int,
    rating: int,
    comment: Optional[str] = None,
    current_user: Optional[User] = Depends(get_current_user), # Make optional for anonymous
    db: Session = Depends(get_db)
):
    hostel = db.query(Hostel).filter(Hostel.id == hostel_id).first()
    if not hostel:
        raise HTTPException(status_code=404, detail="Hostel not found")

    if not 1 <= rating <= 5:
        raise HTTPException(status_code=400, detail="Rating must be between 1 and 5")

    new_review = Review(
        hostel_id=hostel_id,
        user_id=current_user.id if current_user else None,
        rating=rating,
        comment=comment
    )
    db.add(new_review)
    db.commit()
    db.refresh(new_review)

    # Optional: Update hostel's average rating
    # This would require fetching all reviews for the hostel, recalculating, and updating the hostel record.
    # For now, we'll just add the review.

    return {"message": "Review submitted successfully", "review_id": new_review.id}

@router.get("/{hostel_id}", response_model=List[dict])
def get_reviews_for_hostel(
    hostel_id: int,
    db: Session = Depends(get_db)
):
    reviews = db.query(Review).filter(Review.hostel_id == hostel_id).all()
    if not reviews:
        return [] # Return empty list if no reviews

    # Prepare response to include user name if available
    response_reviews = []
    for review in reviews:
        user_name = None
        if review.user:
            user_name = review.user.name
        response_reviews.append({
            "id": review.id,
            "user_name": user_name,
            "rating": review.rating,
            "comment": review.comment,
            "date": review.date.isoformat()
        })
    return response_reviews