import uvicorn
import models

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import engine, db_dependency
from schemas import Restaurant, RestaurantOut, Manager, OpInfo, OpInfoOut, WasteInfo, WasteInfoOut, FinancialInfo, FinancialInfoOut, Dishes, DishesOut, DishDel
from typing import List
from sqlalchemy import or_

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

# RESTAURANTS ENDPOINTS

# GET (1 restaurante por ID)
@app.get("/restaurant/{restaurant_id}", status_code=status.HTTP_200_OK, response_model=RestaurantOut, tags=["Restaurants"])
async def retrieve_restaurant(restaurant_id: int, db: db_dependency):
    
    restaurant = db.query(models.Restaurant).filter(models.Restaurant.id == restaurant_id).first()
    
    if restaurant is None:
        raise HTTPException(status_code=404, detail="Restaurante não encontrado!")
    
    return restaurant

# POST (1 restaurante)
@app.post("/restaurant", status_code=status.HTTP_201_CREATED, tags=["Restaurants"])
async def create_restaurant(restaurant: Restaurant, db: db_dependency):
    
    existing_restaurant = db.query(models.Manager).filter(or_(  models.Restaurant.name == restaurant.name,
                                                                models.Restaurant.address == restaurant.address)).first()
    if existing_restaurant:
        raise HTTPException(status_code=400, detail="Restaurante já cadastrado!")

    db_restaurant = models.Restaurant(**restaurant.dict())
    db.add(db_restaurant)
    db.commit()

# PUT (1 restaurante)
@app.put("/restaurant/{restaurant_id}", status_code=status.HTTP_200_OK, tags=["Restaurants"])
async def update_restaurant(restaurant_id: int, restaurant_update: Restaurant, db: db_dependency):
    
    db_restaurant = db.query(models.Restaurant).filter(models.Restaurant.id == restaurant_id).first()
    
    if db_restaurant is None:
        raise HTTPException(status_code=404, detail="Restaurante nao encontrado!")
    
    updated = False
    for key, value in restaurant_update.dict().items():
        if getattr(db_restaurant, key) != value:
            setattr(db_restaurant, key, value)
            updated = True
    
    if updated:
        db.commit()
        return {"message": "Restaurante atualizado com sucesso"}
    else:
        return {"message": "Nenhuma alteração necessária"}

# DELETE (1 restaurante por ID)
@app.delete("/restaurant/{restaurant_id}", status_code=status.HTTP_200_OK, tags=["Restaurants"])
async def delete_restaurant(restaurant_id: int, db: db_dependency):
    
    db_restaurant = db.query(models.Restaurant).filter(models.Restaurant.id == restaurant_id).first()
    
    if db_restaurant is None:
        raise HTTPException(status_code=404, detail="Restaurante nao encontrado!")
    
    db.delete(db_restaurant)
    db.commit()

# RESTAURANT EXTRA DATA ENDPOINTS

# OP INFO

# POST (Info. Operacionais de 1 restaurante)
@app.post("/restaurant/{restaurant_id}/Op_Info", status_code=status.HTTP_201_CREATED, response_model=OpInfoOut, tags=["Restaurants_OP"])
async def add_op_info(restaurant_id: int, op_data: OpInfo, db: db_dependency):
    
    existing_data = db.query(models.Operational).filter(models.Operational.restaurant_id == restaurant_id,
                                                     models.Operational.month_year == op_data.month_year).first()
    
    if existing_data:
        raise HTTPException(status_code=400, detail="Informações operacionais do mês já cadastradas para este restaurante!")
    
    op_dict = op_data.dict()
    op_dict["restaurant_id"] = restaurant_id

    db_op_data = models.Operational(**op_dict)
    db.add(db_op_data)
    db.commit()
    db.refresh(db_op_data)
    
    return db_op_data

# PUT (Info. Operacionais de 1 restaurante)
@app.put("/restaurant/{restaurant_id}/Op_Info", status_code=status.HTTP_200_OK, response_model=OpInfoOut, tags=["Restaurants_OP"])
async def update_op_info(restaurant_id: int, op_data: OpInfo, db: db_dependency):
    
    db_op_data = db.query(models.Operational).filter(models.Operational.restaurant_id == restaurant_id,
                                                     models.Operational.month_year == op_data.month_year).first()
    if db_op_data is None:
        raise HTTPException(status_code=404, detail="Informações operacionais não encontradas!")
   
    updated = False
    for key, value in op_data.dict().items():
        if getattr(db_op_data, key) != value:
            setattr(db_op_data, key, value)
            updated = True
    
    if updated:
        db.commit()
        db.refresh(db_op_data)
    
    return db_op_data

# WASTE INFO

# POST (Info. Monit. de Desperdício de 1 restaurante)
@app.post("/restaurant/{restaurant_id}/Waste_Info", status_code=status.HTTP_201_CREATED, response_model=WasteInfo, tags=["Restaurants_W"])
async def add_waste_data(restaurant_id: int, waste_data: WasteInfo, db: db_dependency):
    
    existing_data = db.query(models.Waste).filter(models.Waste.restaurant_id == restaurant_id,
                                                     models.Waste.month_year == waste_data.month_year).first()
    
    if existing_data:
        raise HTTPException(status_code=400, detail="Informações de monitoramento de desperdício do mês já cadastradas para este restaurante!")
    
    waste_dict = waste_data.dict()
    waste_dict["restaurant_id"] = restaurant_id

    db_waste_data = models.Waste(**waste_dict)
    db.add(db_waste_data)
    db.commit()
    db.refresh(db_waste_data)
    
    return db_waste_data

# PUT (Info. Monit. de Desperdício de 1 restaurante)
@app.put("/restaurant/{restaurant_id}/Waste_Info", status_code=status.HTTP_200_OK, response_model=WasteInfoOut, tags=["Restaurants_W"])
async def update_waste_info(restaurant_id: int, waste_data: WasteInfo, db: db_dependency):
    
    db_waste_data = db.query(models.Waste).filter(  models.Waste.restaurant_id == restaurant_id,
                                                    models.Waste.month_year == waste_data.month_year).first()
    if db_waste_data is None:
        raise HTTPException(status_code=404, detail="Informações de monitoramento de desperdício não encontradas!")
   
    updated = False
    for key, value in waste_data.dict().items():
        if getattr(db_waste_data, key) != value:
            setattr(db_waste_data, key, value)
            updated = True
    
    if updated:
        db.commit()
        db.refresh(db_waste_data)
    
    return db_waste_data

# FINANCIAL INFO

# POST (Info. Finaceiras de 1 restaurante)
@app.post("/restaurant/{restaurant_id}/Financial_Info", status_code=status.HTTP_201_CREATED, response_model=FinancialInfo, tags=["Restaurants_F"])
async def add_fin_data(restaurant_id: int, fin_data: FinancialInfo, db: db_dependency):
    
    existing_data = db.query(models.Financial).filter(  models.Financial.restaurant_id == restaurant_id,
                                                        models.Financial.month_year == fin_data.month_year).first()
    
    if existing_data:
        raise HTTPException(status_code=400, detail="Informações financeiras do mês já cadastradas para este restaurante!")
    
    fin_dict = fin_data.dict()
    fin_dict["restaurant_id"] = restaurant_id

    db_fin_data = models.Financial(**fin_dict)
    db.add(db_fin_data)
    db.commit()
    db.refresh(db_fin_data)
    
    return db_fin_data

# PUT (Info. Monit. de Desperdício de 1 restaurante)
@app.put("/restaurant/{restaurant_id}/Financial_Info", status_code=status.HTTP_200_OK, response_model=FinancialInfoOut, tags=["Restaurants_F"])
async def update_fin_info(restaurant_id: int, fin_data: FinancialInfo, db: db_dependency):
    
    db_fin_data = db.query(models.Financial).filter(    models.Financial.restaurant_id == restaurant_id,
                                                        models.Financial.month_year == fin_data.month_year).first()
    if db_fin_data is None:
        raise HTTPException(status_code=404, detail="Informações de monitoramento de desperdício não encontradas!")
   
    updated = False
    for key, value in fin_data.dict().items():
        if getattr(db_fin_data, key) != value:
            setattr(db_fin_data, key, value)
            updated = True
    
    if updated:
        db.commit()
        db.refresh(db_fin_data)
    
    return db_fin_data

# DISHES (MENU)

# GET (obtém todos os pratos)
@app.get("/restaurant/{restaurant_id}/menu", status_code=status.HTTP_200_OK, response_model=List[DishesOut], tags=["Restaurants_Menu"])
async def retrieve_dishes(restaurant_id: int, db: db_dependency):
    
    menu = db.query(models.Restaurant).filter(models.Restaurant.id == restaurant_id).first()
    
    if menu is None:
        raise HTTPException(status_code=404, detail="Menu não encontrado")
    
    return menu.dishes

# POST (insere um prato no menu)
@app.post("/restaurant/{restaurant_id}/menu", status_code=status.HTTP_201_CREATED, response_model=DishesOut, tags=["Restaurants_Menu"])
async def add_dish(restaurant_id: int, dish_data: Dishes, db: db_dependency):
    
    exist_dish = db.query(models.Dishes).filter(    models.Dishes.restaurant_id == restaurant_id,
                                                    models.Dishes.name == dish_data.name).first()

    if exist_dish:
        raise HTTPException(status_code=400, detail="Esse prato já existe para este restaurante!")
    
    dish_dict = dish_data.dict()
    dish_dict["restaurant_id"] = restaurant_id

    db_dish_data = models.Dishes(**dish_dict)
    db.add(db_dish_data)
    db.commit()
    db.refresh(db_dish_data)
    
    return db_dish_data

# PUT (atualiza um prato no menu)
@app.put("/restaurant/{restaurant_id}/menu", status_code=status.HTTP_200_OK, response_model=DishesOut, tags=["Restaurants_Menu"])
async def add_dish(restaurant_id: int, dish_data: Dishes, db: db_dependency):
    db_dish_data = db.query(models.Dishes).filter(  models.Dishes.restaurant_id == restaurant_id,
                                                    models.Dishes.name == dish_data.name).first()
    if db_dish_data is None:
        raise HTTPException(status_code=404, detail="Prato não encontrado!")
   
    updated = False
    for key, value in dish_data.dict().items():
        if getattr(db_dish_data, key) != value:
            setattr(db_dish_data, key, value)
            updated = True
    
    if updated:
        db.commit()
        db.refresh(db_dish_data)
    
    return db_dish_data

# DEL (deleta um prato no menu)
@app.delete("/restaurant/{restaurant_id}/menu", status_code=status.HTTP_200_OK, tags=["Restaurants_Menu"])
async def delete_dish(restaurant_id: int, dish_data: DishDel, db: db_dependency):
    
    db_menu = db.query(models.Dishes).filter(models.Dishes.restaurant_id == restaurant_id,
                                             models.Dishes.name == dish_data.name).first()
    
    if db_menu is None:
        raise HTTPException(status_code=404, detail="Prato nao encontrado!")
    
    db.delete(db_menu)
    db.commit()

# MANAGER ENDPOINTS

# POST (1 gerente)
@app.post("/manager", status_code=status.HTTP_201_CREATED, tags=["Managers"])
async def create_manager(manager: Manager, db: db_dependency):
    
    existing_manager = db.query(models.Manager).filter(models.Manager.username == manager.username).first()
    
    if existing_manager:
        raise HTTPException(status_code=400, detail="Nome de usuário já cadastrado! Escolha outro.")
    
    db_manager = models.Manager(**manager.dict())
    db.add(db_manager)
    db.commit()

# GET (TODOS os restaurante de um gerente)
@app.get("/manager/{manager_id}/restaurants", status_code=status.HTTP_200_OK, response_model=List[RestaurantOut], tags=["Managers"])
async def retrieve_manager_restaurants(manager_id: int, db: db_dependency):
    
    manager = db.query(models.Manager).filter(models.Manager.id == manager_id).first()
    
    if manager is None:
        raise HTTPException(status_code=404, detail="Gerente não encontrado")
    return manager.restaurants


# @app.get("/restaurant/{restaurant_id}", response_model=Restaurant)
# def get_restaurants(restaurant_id: int):
#     restaurant = get_restaurant_by_id(restaurant_id)
#     if restaurant is None:
#         raise HTTPException(status_code=404, detail="Restaurant not found")
#     return restaurant

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)