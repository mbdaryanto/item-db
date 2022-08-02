# Item Database

Concept code to build server and client for item database.
Consist of two part: server and client

# server

The server is serving graphql endpoints using apollo-server

1. Install dependencies

    cd server
    yarn

2. start server

    yarn start

## to deploy server

1. `yarn build`
2. edit .env with these line (adjust to your own environment)


        DATABASE_URL="mysql://db_user:db_password@127.0.0.1:3306/itemdb"
        SERVER_PORT=4000

# client

The client is using create-react-app connected to server using graphql

1. Install dependencies

    cd client
    yarn

2. start client

    yarn start
