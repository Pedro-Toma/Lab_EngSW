from pydantic import BaseModel
from typing import List

class Restaurant(BaseModel):
    id: int
    name: str
    address: str
    rating: int
    price: int
    sustainability: int
    monday_morning_hours: str
    monday_afternoon_hours: str
    tuesday_morning_hours: str
    tuesday_afternoon_hours: str
    wednesday_morning_hours: str
    wednesday_afternoon_hours: str
    thursday_morning_hours: str
    thursday_afternoon_hours: str
    friday_morning_hours: str
    friday_afternoon_hours: str
    saturday_morning_hours: str
    saturday_afternoon_hours: str
    sunday_morning_hours: str
    sunday_afternoon_hours: str

class Restaurants(BaseModel):
    restaurants: List[Restaurant]