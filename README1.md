Project - House of Games

This is a back-end project that I have been working on which allows the client to make requests to the database through methods such as: - GET - POST - DELETE - PATCH
and then the server responds with the appropriate action.

I have used test driven development to make sure my code works well with all the requests and any errors that the user may face.
I have also used the MVC (model, view, control) pattern to keep my different files in a clear order, making it easy for users to view all the sections of code without getting lost.

If you would like to use the project here are some instructions on getting started:
-Fork this repository and then copy the new url
-In your terminal clone this down (git clone your_url_here)
-Open the project and run npm install to install all the dependencies (listed below)
-Then seed the databases by running the command npm run seed
-Run the tests in the **tests** document put the command npm test
-Please create 2 .env files
-.env.development - and inside this file PGDATABASE=databse_name
-.env.test - and inside this file PGDATABASE=database_name_test

Dependencies that should have downloaded are:
"dotenv": "^10.0.0",
"express": "^4.17.1",
"pg": "^8.7.1",
"pg-format": "^1.0.4",
"supertest": "^6.1.6"

The minimum versions required to run this projects are:
Node.js - v14
Postgres - v14

The hosted link to this project is:
https://heathers-awesome-games.herokuapp.com/api
