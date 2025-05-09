import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from models import Restaurant
from database_connection import get_restaurant_by_id

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

@app.get("/restaurant/{restaurant_id}", response_model=Restaurant)
def get_restaurants(restaurant_id: int):
    restaurant = get_restaurant_by_id(restaurant_id)
    if restaurant is None:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    return restaurant

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)