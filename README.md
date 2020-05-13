# pryv_exercise_3
## Dependencies
1. Install Node.js and npm:
    ```bash
    $ curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash - && sudo apt install -y nodejs
    ```
1. Install [`project`]'s dependencies:
    ```bash
    $ npm i -s
    ```

## Launch the `Project` 
1. [Optional] Find and kill the process that are running on the port 3000:
    ```bash
    $ netstat -ano | findstr :3000
        
    $ tskill typeyourPIDhere
    ```
2. Launch the [`reader`](reader) component:
    ```bash
    $ node reader/index.js
    ```

