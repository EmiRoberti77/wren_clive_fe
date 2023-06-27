import ftplib
import os
import glob
import pandas as pd
import csv
import psycopg2 as ps
from sqlalchemy import create_engine
import csv
import psycopg2 as ps
import os
import glob
from sqlalchemy import create_engine



#data=pd.read_csv('DATA_28_03.csv')

def storing(data2,fl):
    #fl ='Heatmapstore1'
    conn = ps.connect("host=localhost port=5432  dbname=pos user=postgres password=admin")
    print("Connecting to Database")

    # %%
    cur=conn.cursor()

    # %%
    engine = create_engine('postgresql://postgres:admin@localhost:5432/pos')
    data2.to_sql(fl,con = engine, if_exists= "append",index=False)

#store(data)

csv = pd.read_csv('testdata2.csv')
# from store2 import storing as stori
storing(csv,'Heatmapstore')

csv = pd.read_csv('niketestdata2.csv')
# from store2 import storing as stori
storing(csv,'Heatmapstore1')

csv = pd.read_csv('nikedatach4.csv')
# # from store2 import storing as stori
storing(csv,'Heatmapstore2')

csv = pd.read_csv('ch2_metadata.csv')
# from store2 import storing as stori
storing(csv,'Heatmapstore3')
