import pandas as pd
import csv
import psycopg2 as ps
from datetime import datetime, timedelta
from sqlalchemy import create_engine, text

def data_tables(start_date_str,end_date_str):
    # Convert the input strings to datetime objects
    start_date = datetime.strptime(start_date_str, "%d-%m-%Y")
    end_date = datetime.strptime(end_date_str, "%d-%m-%Y")
    
    # Define a timedelta object with a one-day interval
    one_day = timedelta(days=1)

    #table list
    table_list=[]
    
    # Print the dates between the start and end dates
    current_date = start_date
    while current_date <= end_date:
        table_name="metatable"+current_date.strftime("%d%m%Y")
        #print(table_name+",")
        table_list.append(table_name)
        current_date += one_day
    return table_list


def storing(data2,fl):
    #fl ='Heatmapstore1'
    conn = ps.connect("host=localhost port=5432  dbname=pos user=postgres password=admin")
    print("Connecting to Database")
    cur=conn.cursor()
    engine = create_engine('postgresql://postgres:admin@localhost:5432/pos')
    data2.to_sql(fl,con = engine, if_exists= "append",index=False)

from_date="22-05-2023"
to_date="05-06-2023"

for table_name in data_tables(from_date, to_date):
    df = pd.read_csv(table_name+'.csv')
    storing(df,table_name)
    print(table_name+" is uploaded!")