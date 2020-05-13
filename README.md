# pryv_exercise_3
## Dependencies
1. Install Node.js and npm:
    ```bash
    $ curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash - && sudo apt install -y nodejs
    ```
2. Install MongoDB, following this link [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#install-mongodb-community-edition-using-deb-packages)    
3. Install [`project`]'s dependencies, in the project folder type:
    ```bash
    $ npm i -s
    ```

## Launch the `Server` 
1. Start MongoDB:
    ```bash
    $ sudo service mongod start    
    ```
2. Optionally, free the  server port which is set to 3000 by default:
    ```bash
    $ lsof -i tcp:3000 | grep LISTEN | awk '{print $2}' | xargs kill
    ```
3. Run the server:
    ```bash
    $ chmod u+x start.sh
    $ ./server.sh
    ```
4. Optionally, it's possible to chose a port with the command:
    ```bash
    $ PORT = typeyourport ./server.sh
    ```
   
## APIs
Following a brief explanation of the available APIs which can be tested simply using software like postman
1. Users API:
    1. POST to create a new users 
    ```bash
        localhost:3000/users 
    ```
      body:
    ```bash
            {"name": "name","password" : "password"} 
    ```
2. Login API:
    1. GET to login and to get a valid Token
    ```bash
       localhost:3000/auth/login 
    ```
      body:
    ```bash
       {"name": "name","password" : "password"} 
    ```
3. Resource API:

    All APIs need authentication, after logging, copy the token obtained in the Bearer Token field.
    1. POST to create a new resource. 
        ```bash
           localhost:3000/auth/resource 
        ```
          body:
        ```bash
           {"id": "idResource", "data": [{"field1": "exemple"}]}
        ```
    2. GET to obtain all resources. 
        ```bash
           localhost:3000/auth/resource 
        ```
    3. GET to obtain one resources. 
        ```bash
           localhost:3000/auth/resource/idResource
        ```
    4. PUT to update one resources. 
        ```bash
           localhost:3000/auth/resource/idResource
        ```
        body:
        ```bash
           {"data": [{"field1": "newValue"}]}
        ```
    5. DELETE to delete one resources. 
        ```bash
           localhost:3000/auth/resource/idResource
        ```
  
## Launch the `Tests` 
1. Run the test:
    ```bash
    $ chmod u+x test.sh
    $ ./test.sh
    ```


