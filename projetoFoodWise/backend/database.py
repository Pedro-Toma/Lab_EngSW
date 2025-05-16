from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from typing import Annotated
from fastapi import Depends

# from projetoFoodWise.backend.schema import Restaurant

username = "root"
password = "mack"
public_ip_EC2 = "50.17.113.17"
db_connection_str = f'mysql+pymysql://{username}:{password}@{public_ip_EC2}:3306/projeto-db'
engine = create_engine(db_connection_str)

# def get_restaurant_by_id(restaurant_id: int) -> Restaurant | None:
#     query = f"SELECT * FROM restaurants WHERE id={restaurant_id}"
#     df = pd.read_sql(query, con=db_connection)
#     if df.empty:
#         return None
#     return Restaurant(**df.iloc[0].to_dict())

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
