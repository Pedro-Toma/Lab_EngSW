from sqlalchemy import Boolean, Column, Integer, Float, String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from database import Base

class Restaurant(Base):
    __tablename__ = 'restaurants'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    manager_id = Column(Integer, ForeignKey("managers.id"), nullable=False)
    name = Column(String(40), unique=True, nullable=False)
    address = Column(String(80), unique=True, nullable=False)
    rating = Column(Integer)
    price = Column(Integer)
    sustainability = Column(Integer)
    monday_morning_hours = Column(String(15))
    monday_afternoon_hours = Column(String(15))
    tuesday_morning_hours = Column(String(15))
    tuesday_afternoon_hours = Column(String(15))
    wednesday_morning_hours = Column(String(15))
    wednesday_afternoon_hours = Column(String(15))
    thursday_morning_hours = Column(String(15))
    thursday_afternoon_hours = Column(String(15))
    friday_morning_hours = Column(String(15))
    friday_afternoon_hours = Column(String(15))
    saturday_morning_hours = Column(String(15))
    saturday_afternoon_hours = Column(String(15))
    sunday_morning_hours = Column(String(15))
    sunday_afternoon_hours = Column(String(15))

    manager = relationship("Manager", back_populates="restaurants")
    dishes = relationship("Dishes", back_populates="restaurant")
    
class Manager(Base):
    __tablename__ = "managers"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(30), unique=True, nullable=False)
    password = Column(String(15), nullable=False)

    restaurants = relationship("Restaurant", back_populates="manager")

class Operational(Base):
    __tablename__ = "operational_records"

    id = Column(Integer, primary_key=True, index=True)
    restaurant_id = Column(Integer, ForeignKey("restaurants.id"), nullable=False)
    month_year = Column(String(10), nullable=False)
    electric_bill = Column(Float, nullable=False)
    gas_bill = Column(Float, nullable=False)
    water_bill = Column(Float, nullable=False)
    ingredient_total_cost = Column(Float, nullable=False)

    __table_args__ = (
        UniqueConstraint('restaurant_id', 'month_year', name='uix_operational_month_year'),
    )

class Waste(Base):
    __tablename__ = "waste_records"

    id = Column(Integer, primary_key=True, index=True)
    restaurant_id = Column(Integer, ForeignKey("restaurants.id"), nullable=False)
    month_year = Column(String(10), nullable=False)
    quantity_sold = Column(Float, nullable=False)
    quantity_wasted = Column(Float, nullable=False)
    discarded_by_expiration = Column(Float, nullable=False)
    discarded_by_misuse = Column(Float, nullable=False)

    __table_args__ = (
        UniqueConstraint('restaurant_id', 'month_year', name='uix_waste_month_year'),
    )

class Financial(Base):
    __tablename__ = "financial_records"

    id = Column(Integer, primary_key=True, index=True)
    restaurant_id = Column(Integer, ForeignKey("restaurants.id"), nullable=False)
    month_year = Column(String(10), nullable=False)
    num_customers_served = Column(Integer, nullable=False)
    num_customers_served = Column(Integer, nullable=False)
    gross_revenue = Column(Float, nullable=False)
    net_revenue = Column(Float, nullable=False)
    dishes_sold = Column(Integer, nullable=False)

    __table_args__ = (
        UniqueConstraint('restaurant_id', 'month_year', name='uix_financial_month_year'),
    )

class Dishes(Base):
    __tablename__ = "menu_dishes"

    id = Column(Integer, primary_key=True, index=True)
    restaurant_id = Column(Integer, ForeignKey("restaurants.id"), nullable=False)
    name = Column(String(20), nullable=False)
    ingredients = Column(String(80))
    price = Column(Float, nullable=False)
    
    restaurant = relationship("Restaurant", back_populates="dishes")

    __table_args__ = (
        UniqueConstraint('restaurant_id', 'name', name='uix_restaurant_dish_name'),
    )