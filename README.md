--- Welcome to La Table! A clone of Open Table (https://www.opentable.com). ----

Link to the live site: https://la-table.herokuapp.com/

La Table is a clone of Open Table with CRUD operations for Restaurants, Reservations & Reviews. You can also favorite and search restaurants currently on the app. 

Database Schema: 
https://github.com/ashleighctucker/OpenTableClone/wiki/Database-Schema-&-Breakdowns

Current MVPs:
https://github.com/ashleighctucker/OpenTableClone/wiki/Feature-List

Example Redux State:
https://github.com/ashleighctucker/OpenTableClone/wiki/Redux-State

--- Tech Stack --- 

Javascript  

node.js

Express.js

React JS

Redux

Python

SQL Alchemy

Alembic

Faker API

---- Want to try it out locally? La Table requires Postgres. ----

1. Clone our repo with the command: `git clone https://github.com/ashleighctucker/OpenTableClone.git`
2. CD in project directory and install : `pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt`
3. Create a .env file based on the example with proper settings for your development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your .env file
5. Get into your pipenv, migrate your database, seed your database, and run your flask app
  `pipenv shell`
  `flask db upgrade`
  `flask seed all`
  `flask run`
6. To run the React App in development, checkout the README inside the react-app directory.
  
--- Future Features for La Table ---

Auto removal of reservations after the date has passed 

Messaging


