# GROUPOMANIA

Create an enterprise social network with REACT and SQL

## DATABASE

1. Connect to the mySQL server of your choice
2. Create a new schema (for example : groupomania)
3. Edit db_config.js file in the config folder with the username and the password which you use to connect to your database, then modify the name of the database by the name of the schema that you have previously created

## SERVER

1. Create a file named .env in the config folder
2. Open the .env file and add the lines:

- PORT=Port number of your choice
- SECRET_KEY=Random sequence of characters of your choice
- ADMIN_USERNAME=admin username of your choice
- ADMIN_EMAIL=admin email of your choice
- ADMIN_PASSWORD=admin password of your choice

3. Open the terminal from the server folder and type the following command:

- npm install package.json

4. Type npm start from the server folder in the terminal to start the server

## CLIENT

1.  Open the terminal from the client folder and type the following command:

- npm install package.json

2. Create a file named .env at the root of the client folder
3. Open the .env file and add the line :

- REACT_APP_API_URL=Your URL based on the port you have chosen for the server (ex: http://localhost:8800)

4. Type npm start from the client folder in the terminal to start the react app

### If you want to test the server with postman, you can import the postman_test_collection.json file into it
