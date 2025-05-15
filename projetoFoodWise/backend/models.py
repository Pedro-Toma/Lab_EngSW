from sqlalchemy import Boolean, Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Restaurant(Base):
    __tablename__ = 'restaurants'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    manager_id = Column(Integer, ForeignKey("managers.id"))
    name = Column(String(40), unique=True)
    address = Column(String(80), unique=True)
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

class Manager(Base):
    __tablename__ = "managers"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(30))
    password = Column(String(15))

    restaurants = relationship("Restaurant", back_populates="manager")