***

# Welcome to La Table! A clone of [Open Table](https://www.opentable.com)

Link to the [live site](https://la-table.herokuapp.com/)

La Table is a clone of Open Table with CRUD operations for Restaurants, Reservations & Reviews. You can also favorite and search restaurants currently on the app. 

### [Database Schema](https://github.com/ashleighctucker/OpenTableClone/wiki/Database-Schema-&-Breakdowns)

### [Current MVPs](https://github.com/ashleighctucker/OpenTableClone/wiki/Feature-List)

### [Example Redux State](https://github.com/ashleighctucker/OpenTableClone/wiki/Redux-State)


##Tech Stack

### [Front-End](https://github.com/ashleighctucker/OpenTableClone/wiki/Frontend-Routes)

* ![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) 
* ![NODE JS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
* ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
* ![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
* ![HTML](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)
* ![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
* ![HEROKU](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)

### [Back-End](https://github.com/ashleighctucker/OpenTableClone/wiki/API-Backend-Routes)
* ![Python](https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white)
* ![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
* ![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
* SQL Alchemy/Alembic
* Faker API
* Docker

## Want to try it out locally? La Table requires Postgres.

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


## Future Features for La Table 

* Auto removal of reservations after the date has passed 
* Messaging


