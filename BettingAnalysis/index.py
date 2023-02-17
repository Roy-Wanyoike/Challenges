#!/usr/bin/python3
import pandas as pds
from sklearn.linear_model import LinearRegression
import numpy as npy

dataset = pds.read_csv("test.csv", names=['Home', 'Draw', 'Away', 'Event', 'Ouctcome', 'ID'])
print(dataset)
list_id = []
for ID in dataset['ID']:
    if ID not in list_id:
        list_id.append(ID)
data = dataset[dataset['ID'] == list_id[3]]
model = LinearRegression()
x = npy.array(data[['Away', 'Draw']]).reshape(-1, 2)
y = npy.array(data['Home'])
model.fit(x, y)
print("Away "+str(model.coef_),"R "+str(model.score(x,y)),"Constant "+str(model.intercept_))
away = model.coef_[0]
c = model.intercept_
draw = model.coef_[1]
y = away * 3.4 + 4 * draw + c
print(data)
print(y)
