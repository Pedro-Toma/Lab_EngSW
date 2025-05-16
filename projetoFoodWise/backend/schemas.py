from pydantic import BaseModel

class Restaurant(BaseModel):
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

class RestaurantOut(Restaurant):
    id: int

class Manager(BaseModel):
    username: str
    password: str

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