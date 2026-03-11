from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.db import get_db
from app.models.hostel import Hostel # Import Hostel model
from app.models.facility import Facility # Import Facility model
from typing import List

router = APIRouter(prefix="/hostels", tags=["Nearby Services"])

@router.get("/{hostel_id}/nearby")
def nearby_services(
    hostel_id: int,
    radius: int = Query(1000, description="Search radius in meters"),
    db: Session = Depends(get_db)
):
    # 1. Fetch hostel location
    hostel = db.query(Hostel).filter(Hostel.id == hostel_id).first()

    if not hostel:
        raise HTTPException(status_code=404, detail="Hostel not found")

    response = {
        "hostel": {
            "id": hostel.id,
            "name": hostel.name
        },
        "nearby": {
            "grocery": [],
            "food": [],
            "laundry": [],
            "cafes": [], # Adding new categories based on user requirement
            "daily_need_stores": []
        }
    }

    # 2. Query facilities per category
    for category in ["grocery", "food", "laundry", "cafes", "daily_need_stores"]:
        rows = db.execute(
            text("""
                SELECT id, name, category, address, contact_number, description, image_url,
                       ST_Distance(
                           location,
                           :hostel_loc
                       ) AS distance_m
                FROM facilities
                WHERE category = :category
                  AND ST_DWithin(
                      location,
                      :hostel_loc,
                      :radius
                  )
                ORDER BY distance_m
                LIMIT 5;
            """),
            {
                "category": category,
                "hostel_loc": hostel.location,
                "radius": radius
            }
        ).fetchall()

        response["nearby"][category] = [
            {
                "id": r.id,
                "name": r.name,
                "category": r.category,
                "address": r.address,
                "contact_number": r.contact_number,
                "description": r.description,
                "image_url": r.image_url,
                "distance_m": round(r.distance_m)
            }
            for r in rows
        ]

    return response

# New endpoint for single facility details
@router.get("/facilities/{facility_id}")
def get_facility_details(
    facility_id: int,
    db: Session = Depends(get_db)
):
    facility = db.query(Facility).filter(Facility.id == facility_id).first()
    if not facility:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Facility not found")
    
    return {
        "id": facility.id,
        "name": facility.name,
        "category": facility.category,
        "address": facility.address,
        "contact_number": facility.contact_number,
        "description": facility.description,
        "image_url": facility.image_url,
        "location": {
            "lat": facility.location.y,
            "lon": facility.location.x
        }
    }

