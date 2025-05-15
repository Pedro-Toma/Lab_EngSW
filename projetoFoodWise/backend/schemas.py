from pydantic import BaseModel

class RestaurantCreate(BaseModel):
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
    manager_id: int

class RestaurantSend(RestaurantCreate):
    id: int

class ManagerCreate(BaseModel):
    username: str
    password: str