from pydantic import BaseModel
from typing import Optional

class Restaurant(BaseModel):
    manager_id: int
    name: str
    address: str
    phone: Optional[str] = None
    money: Optional[bool] = None
    pix: Optional[bool] = None
    credit: Optional[bool] = None
    debit: Optional[bool] = None
    voucher: Optional[bool] = None
    monday_morning_opening: Optional[str] = None
    monday_morning_closing: Optional[str] = None
    monday_afternoon_opening: Optional[str] = None
    monday_afternoon_closing: Optional[str] = None
    tuesday_morning_opening: Optional[str] = None
    tuesday_morning_closing: Optional[str] = None
    tuesday_afternoon_opening: Optional[str] = None
    tuesday_afternoon_closing: Optional[str] = None
    wednesday_morning_opening: Optional[str] = None
    wednesday_morning_closing: Optional[str] = None
    wednesday_afternoon_opening: Optional[str] = None
    wednesday_afternoon_closing: Optional[str] = None
    thursday_morning_opening: Optional[str] = None
    thursday_morning_closing: Optional[str] = None
    thursday_afternoon_opening: Optional[str] = None
    thursday_afternoon_closing: Optional[str] = None
    friday_morning_opening: Optional[str] = None
    friday_morning_closing: Optional[str] = None
    friday_afternoon_opening: Optional[str] = None
    friday_afternoon_closing: Optional[str] = None
    saturday_morning_opening: Optional[str] = None
    saturday_morning_closing: Optional[str] = None
    saturday_afternoon_opening: Optional[str] = None
    saturday_afternoon_closing: Optional[str] = None
    sunday_morning_opening: Optional[str] = None
    sunday_morning_closing: Optional[str] = None
    sunday_afternoon_opening: Optional[str] = None
    sunday_afternoon_closing: Optional[str] = None


class RestaurantOut(Restaurant):
    id: int

class Manager(BaseModel):
    email: str
    password: str
    
class Token(BaseModel):
    access_token: str
    token_type: str

class OpInfo(BaseModel):
    month_year: str
    electric_bill: float
    gas_bill: float
    water_bill: float
    ingredient_total_cost: float

class OpInfoOut(OpInfo):
    id: int
    restaurant_id: int

    class Config:
        from_attributes = True

class WasteInfo(BaseModel):
    month_year: str
    quantity_sold: float
    quantity_wasted: float
    discarded_by_expiration: float
    discarded_by_misuse: float

class WasteInfoOut(WasteInfo):
    id: int
    restaurant_id: int

    class Config:
        from_attributes = True

class FinancialInfo(BaseModel):
    month_year: str
    num_customers_served: int
    num_customers_served: int
    gross_revenue: float
    net_revenue: float
    dishes_sold: int

class FinancialInfoOut(FinancialInfo):
    id: int
    restaurant_id: int

    class Config:
        from_attributes = True

class Dishes(BaseModel):
    name: str
    ingredients: str
    price: float

class DishesOut(Dishes):
    id: int
    restaurant_id: int

    class Config:
        from_attributes = True

class DishDel(BaseModel):
    name: str