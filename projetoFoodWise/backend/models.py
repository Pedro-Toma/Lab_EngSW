from sqlalchemy import Boolean, Column, Integer, Float, String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from database import Base

class Restaurant(Base):
    __tablename__ = 'restaurants'
    __table_args__ = (
                        UniqueConstraint('name', 'address', name='uix_restaurant_name_address'),
                        {'mysql_engine': 'InnoDB'}
                     )

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    manager_id = Column(Integer, ForeignKey("managers.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(40), nullable=False)
    address = Column(String(80), nullable=False)
    rating = Column(Integer)
    price = Column(Integer)
    sustainability = Column(Integer)
    phone = Column(String(20))
    money = Column(Boolean, default=False)
    pix = Column(Boolean, default=False)
    credit = Column(Boolean, default=False)
    debit = Column(Boolean, default=False)
    voucher = Column(Boolean, default=False)
    monday_morning_opening = Column(String(15))
    monday_morning_closing = Column(String(15))
    monday_afternoon_opening = Column(String(15))
    monday_afternoon_closing = Column(String(15))
    tuesday_morning_opening = Column(String(15))
    tuesday_morning_closing = Column(String(15))
    tuesday_afternoon_opening = Column(String(15))
    tuesday_afternoon_closing = Column(String(15))
    wednesday_morning_opening = Column(String(15))
    wednesday_morning_closing = Column(String(15))
    wednesday_afternoon_opening = Column(String(15))
    wednesday_afternoon_closing = Column(String(15))
    thursday_morning_opening = Column(String(15))
    thursday_morning_closing = Column(String(15))
    thursday_afternoon_opening = Column(String(15))
    thursday_afternoon_closing = Column(String(15))
    friday_morning_opening = Column(String(15))
    friday_morning_closing = Column(String(15))
    friday_afternoon_opening = Column(String(15))
    friday_afternoon_closing = Column(String(15))
    saturday_morning_opening = Column(String(15))
    saturday_morning_closing = Column(String(15))
    saturday_afternoon_opening = Column(String(15))
    saturday_afternoon_closing = Column(String(15))
    sunday_morning_opening = Column(String(15))
    sunday_morning_closing = Column(String(15))
    sunday_afternoon_opening = Column(String(15))
    sunday_afternoon_closing = Column(String(15))


    manager = relationship("Manager", back_populates="restaurants")
    dishes = relationship("Dishes", back_populates="restaurant", cascade="all, delete-orphan")
    
class Manager(Base):
    __tablename__ = "managers"
    __table_args__ = {'mysql_engine': 'InnoDB'}

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(String(30), unique=True, nullable=False)
    password = Column(String(255), nullable=False)

    restaurants = relationship("Restaurant", back_populates="manager", cascade="all, delete-orphan")

class Operational(Base):
    __tablename__ = "operational_records"
    __table_args__ = (
                        UniqueConstraint('restaurant_id', 'month_year', name='uix_operational_month_year'),
                        {'mysql_engine': 'InnoDB'}
                     )

    id = Column(Integer, primary_key=True, index=True)
    restaurant_id = Column(Integer, ForeignKey("restaurants.id", ondelete="CASCADE"), nullable=False)
    month_year = Column(String(10), nullable=False)
    electric_bill = Column(Float, nullable=False)
    gas_bill = Column(Float, nullable=False)
    water_bill = Column(Float, nullable=False)
    ingredient_total_cost = Column(Float, nullable=False)

class Waste(Base):
    __tablename__ = "waste_records"
    __table_args__ = (
                        UniqueConstraint('restaurant_id', 'month_year', name='uix_waste_month_year'),
                        {'mysql_engine': 'InnoDB'}
                     )

    id = Column(Integer, primary_key=True, index=True)
    restaurant_id = Column(Integer, ForeignKey("restaurants.id", ondelete="CASCADE"), nullable=False)
    month_year = Column(String(10), nullable=False)
    quantity_sold = Column(Float, nullable=False)
    quantity_wasted = Column(Float, nullable=False)
    discarded_by_expiration = Column(Float, nullable=False)
    discarded_by_misuse = Column(Float, nullable=False)

class Financial(Base):
    __tablename__ = "financial_records"
    __table_args__ = (
                        UniqueConstraint('restaurant_id', 'month_year', name='uix_financial_month_year'),
                        {'mysql_engine': 'InnoDB'}
                     )

    id = Column(Integer, primary_key=True, index=True)
    restaurant_id = Column(Integer, ForeignKey("restaurants.id", ondelete="CASCADE"), nullable=False)
    month_year = Column(String(10), nullable=False)
    num_customers_served = Column(Integer, nullable=False)
    gross_revenue = Column(Float, nullable=False)
    net_revenue = Column(Float, nullable=False)
    dishes_sold = Column(Integer, nullable=False)

class Dishes(Base):
    __tablename__ = "menu_dishes"
    __table_args__ = (
                        UniqueConstraint('restaurant_id', 'name', name='uix_restaurant_dish_name'),
                        {'mysql_engine': 'InnoDB'}
                     )

    id = Column(Integer, primary_key=True, index=True)
    restaurant_id = Column(Integer, ForeignKey("restaurants.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(20), nullable=False)
    ingredients = Column(String(80))
    price = Column(Float, nullable=False)
    
    restaurant = relationship("Restaurant", back_populates="dishes")
