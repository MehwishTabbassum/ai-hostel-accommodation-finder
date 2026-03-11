from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.db import get_db
from app.models.hostel import Hostel # Import Hostel model
from typing import Optional, List

router = APIRouter(prefix="/hostels", tags=["Hostels"])

@router.get("")
def list_hostels(
    lat: Optional[float] = Query(None),
    lon: Optional[float] = Query(None),
    radius: int = Query(2000, description="Search radius in meters"),
    min_price: Optional[int] = Query(None, ge=0),
    max_price: Optional[int] = Query(None, ge=0),
    room_type: Optional[str] = Query(None), # e.g., "Single", "Double"
    amenity: Optional[str] = Query(None), # e.g., "WiFi", "Food"
    min_rating: Optional[float] = Query(None, ge=0, le=5),
    sort_by: Optional[str] = Query(None, regex="^(price|rating)_(asc|desc)$"), # e.g., "price_asc", "rating_desc"
    db: Session = Depends(get_db)
):
    # Base query for selecting all hostel fields
    select_columns = """
        SELECT id, name, price, rating, amenities, room_types, image_gallery, check_in_time, check_out_time
    """
    if lat is not None and lon is not None:
        select_columns += """,
            ST_Distance(
                location,
                ST_MakePoint(:lon, :lat)::geography
            ) AS distance_m
        """

    from_clause = " FROM hostels "
    where_clauses = []
    order_by_clauses = []
    
    query_params = {}

    if lat is not None and lon is not None:
        where_clauses.append("ST_DWithin(location, ST_MakePoint(:lon, :lat)::geography, :radius)")
        query_params["lat"] = lat
        query_params["lon"] = lon
        query_params["radius"] = radius
        order_by_clauses.append("distance_m") # Default sort by distance if location provided

    if min_price is not None:
        where_clauses.append("price >= :min_price")
        query_params["min_price"] = min_price
    
    if max_price is not None:
        where_clauses.append("price <= :max_price")
        query_params["max_price"] = max_price

    if room_type:
        where_clauses.append("room_types LIKE :room_type_pattern")
        query_params["room_type_pattern"] = f"%{room_type}%"

    if amenity:
        where_clauses.append("amenities LIKE :amenity_pattern")
        query_params["amenity_pattern"] = f"%{amenity}%"
    
    if min_rating is not None:
        where_clauses.append("rating >= :min_rating")
        query_params["min_rating"] = min_rating

    # Apply sorting
    if sort_by:
        field, order = sort_by.split('_')
        if field == "price":
            order_by_clauses.insert(0, f"price {order.upper()}") # Prioritize price sort
        elif field == "rating":
            order_by_clauses.insert(0, f"rating {order.upper()}") # Prioritize rating sort

    full_query = select_columns + from_clause
    if where_clauses:
        full_query += " WHERE " + " AND ".join(where_clauses)
    if order_by_clauses:
        full_query += " ORDER BY " + ", ".join(order_by_clauses)
    
    full_query += " LIMIT 50;" # Always limit results for performance

    result = db.execute(text(full_query), query_params).fetchall()

    response_hostels = []
    for r in result:
        hostel_data = {
            "id": r.id,
            "name": r.name,
            "price": r.price,
            "rating": r.rating,
            "amenities": r.amenities,
            "room_types": r.room_types,
            "image_gallery": r.image_gallery,
            "check_in_time": r.check_in_time,
            "check_out_time": r.check_out_time,
        }
        if lat is not None and lon is not None:
            hostel_data["distance_m"] = round(r.distance_m)
        response_hostels.append(hostel_data)
    
    return response_hostels


@router.get("/{hostel_id}")
def get_hostel_details(
    hostel_id: int,
    db: Session = Depends(get_db)
):
    hostel = db.query(Hostel).filter(Hostel.id == hostel_id).first()
    if not hostel:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Hostel not found")
    
    return {
        "id": hostel.id,
        "name": hostel.name,
        "price": hostel.price,
        "rating": hostel.rating,
        "amenities": hostel.amenities,
        "room_types": hostel.room_types,
        "image_gallery": hostel.image_gallery,
        "check_in_time": hostel.check_in_time,
        "check_out_time": hostel.check_out_time,
        "location": {
            "lat": hostel.location.y,
            "lon": hostel.location.x
        }
    }
