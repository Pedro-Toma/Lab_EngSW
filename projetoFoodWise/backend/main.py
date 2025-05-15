import uvicorn
import models

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import engine, db_dependency
from schemas import RestaurantCreate, RestaurantSend, ManagerCreate
from typing import List

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

models.Base.metadata.create_all(bind=engine)

# GET (1 restaurante por ID)
@app.get("/restaurant/{restaurant_id}", status_code=status.HTTP_200_OK, response_model=RestaurantSend)
async def retrieve_restaurant(restaurant_id: int, db: db_dependency):
    restaurant = db.query(models.Restaurant).filter(models.Restaurant.id == restaurant_id).first()
    if restaurant is None:
        raise HTTPException(status_code=404, detail="Restaurante não encontrado!")
    return restaurant

# GET (TODOS os restaurante de um gerente)
@app.get("/manager/{manager_id}/restaurants", status_code=status.HTTP_200_OK, response_model=List[RestaurantSend])
async def retrieve_manager_restaurants(manager_id: int, db: db_dependency):
    manager = db.query(models.Manager).filter(models.Manager.id == manager_id).first()
    if manager is None:
        raise HTTPException(status_code=404, detail="Gerente não encontrado")
    return manager.restaurants

# POST (1 restaurante)
@app.post("/restaurant/create", status_code=status.HTTP_201_CREATED)
async def create_restaurant(restaurant: RestaurantCreate, db: db_dependency):
    db_restaurant = models.Restaurant(**restaurant.dict())
    db.add(db_restaurant)
    db.commit()

# DELETE (1 restaurante por ID)
@app.delete("/restaurant/delete/{restaurant_id}", status_code=status.HTTP_200_OK)
async def delete_restaurant(restaurant_id: int, db: db_dependency):
    db_restaurant = db.query(models.Restaurant).filter(models.Restaurant.id == restaurant_id).first()
    if db_restaurant is None:
        raise HTTPException(status_code=404, detail="Restaurante nao encontrado!")
    db.delete(db_restaurant)
    db.commit()

# POST (1 gerente)
@app.post("/manager/create", status_code=status.HTTP_201_CREATED)
async def create_manager(manager: ManagerCreate, db: db_dependency):
    db_manager = models.Manager(**manager.dict())
    db.add(db_manager)
    db.commit()

# @app.get("/restaurant/{restaurant_id}", response_model=Restaurant)
# def get_restaurants(restaurant_id: int):
#     restaurant = get_restaurant_by_id(restaurant_id)
#     if restaurant is None:
#         raise HTTPException(status_code=404, detail="Restaurant not found")
#     return restaurant

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)