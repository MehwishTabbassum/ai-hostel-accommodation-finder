from sqlalchemy import Column, Integer, String, BigInteger, Float
from geoalchemy2 import Geography
from app.db import Base

class Hostel(Base):
    __tablename__ = "hostels"

    id = Column(Integer, primary_key=True, index=True)
    osm_id = Column(BigInteger, unique=True, nullable=False)
    name = Column(String, nullable=False)
    location = Column(Geography(geometry_type="POINT", srid=4326))
    price = Column(Integer, nullable=True)
    rating = Column(Float, nullable=True)
    amenities = Column(String, nullable=True) # e.g., "WiFi, Food, Laundry"
    room_types = Column(String, nullable=True) # e.g., "Single, Double"
    image_gallery = Column(String, nullable=True) # JSON string of image URLs
    check_in_time = Column(String, nullable=True) # e.g., "14:00"
    check_out_time = Column(String, nullable=True) # e.g., "12:00"

