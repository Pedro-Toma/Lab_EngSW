from sqlalchemy import create_engine
import pandas as pd
from models import Restaurant

username = "root"
password = "mack"
db_connection_str = f'mysql+pymysql://{username}:{password}@204.236.221.54:3306/projeto-db'
db_connection = create_engine(db_connection_str)

def get_restaurant_by_id(restaurant_id: int) -> Restaurant | None:
    query = f"SELECT * FROM restaurants WHERE id={restaurant_id}"
    df = pd.read_sql(query, con=db_connection)
    if df.empty:
        return None
    return Restaurant(**df.iloc[0].to_dict())