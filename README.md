# Comparison of Transport and Covid Data

This project was made for Systems Integrations Course and Framework Web App Course from Lublin University of Technology. 

## Purpose of the application
Main objective of this app is to present transportation and Covid-19 data from pandemics and present them on charts. Application parses data from sources (.csv), uploads transformed data into MongoDB database, displays them on charts and allows user to export data to .xml or .json. 

App supports authorization with JWT tokens, there are 2 types of users: User and Admin.
Admin has access to advanced chart.

## Functional requirements
- Display data on chart
- Export and import of .json files 
- Export and import of .xml files
- Import .csv files
- JWT-based authorization and authentication

## Non-Functional requirements
- MongoDB database (NoSQL)
- Node.js as base of project
- Works on Linux (Tested on WSL2 Ubuntu)

## Usage
Make sure MongoDB is running. 
Run backend and frontend in 2 seperate terminal instances. 
In backend/.env file make sure you setup link to your MongoDB instance in `DB_CONN_STRING`.
Ports are hardcoded in front, app will only fetch data from localhost:3000.
To upload data to database, make sure backend is running and .csv files are in backend/data/ directory. Invoke `localhost:3000/csv/transport` and `localhost:3000/csv/who` to fill database with data.

### Backend
navigate to backend folder, use `npm install` and `npm run dev` 

### Frontend 
in main folder, use `npm install ` and `npm run dev`

## Technologies

### Node.js
version: v23.8.0

### React 
version: 19.1.0

### Tailwind.css
version: 4.1.5

### Express.js
version 5.1.0

### MongoDB
version v8.0.9

### Chart.js

### Typescript

### Axios

### JWT

## Data sources: 

Data presented in my project is from 2019 to 2023

### WHO-COVID-19-global-data.csv
Source: [data.who.int](https://data.who.int/dashboards/covid19/data)

### Monthly_Transportation_Statistics_20250407.csv
Source: [data.bts.gov](https://data.bts.gov/Research-and-Statistics/Monthly-Transportation-Statistics/crem-w557/about_data)



