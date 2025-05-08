import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

class Restaurant(BaseModel):
    id: int
    name: str
    address: str
    rating: int
    price: int
    sustainability: int

class Restaurants(BaseModel):
    restaurants: List[Restaurant]

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

restaurants_db = {
    1: {"id": 1, 
        "name": "Green Day", 
        "address": "Rua Verde, 1820, Pinheiros", 
        "rating": 2, 
        "price": 2, 
        "sustainability": 4},
    2: {"id": 2, 
        "name": "DOM", 
        "address": "Rua Barão de Capanema, 549 - Jardins", 
        "rating": 4, 
        "price": 3, 
        "sustainability": 5},
}

@app.get("/restaurant/{restaurant_id}", response_model=Restaurant)
def get_restaurants(restaurant_id: int):
    restaurant = restaurants_db.get(restaurant_id)
    if restaurant is None:
        return {"error": "Restaurant not found"}
    return restaurant

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)