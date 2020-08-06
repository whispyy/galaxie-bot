## Getting started

### Run locally

> Require node

- `npm install`

- create `.env` with `DISCORD_GALAXIE_BOT_SECRET=<your_secret>`

- `node index.js`

### Add bot to the server

- client ID of the app: `740750859633295421`

- direct link to add bot to a server: [https://discordapp.com/oauth2/authorize?client_id=740750859633295421&scope=bot&permissions=0](https://discordapp.com/oauth2/authorize?client_id=740750859633295421&scope=bot&permissions=0)

## Run using docker

> Require docker

### Basic usage

- create `.env` with 
    - `DISCORD_GALAXIE_BOT_SECRET=<your_secret>` (required)
    - `TZ=America/Toronto` (optional)

- `docker build -t galaxie-bot .`

- `docker run -d --rm --name gang_bot galaxie-bot`

### Persist the storage

- `docker volume create galaxie_bot_storage`

- `docker run -d --rm --mount source=galaxie_bot_storage,target=/usr/src/bot/storage --name galaxie_bot galaxie-bot`

### Additionnal 

> Enter the container

`docker exec -it <container id> /bin/bash`

> Kill container

`docker container kill galaxie_bot`

> See logs

`docker logs galaxie_bot`

> List all docker containers

`docker ps -a`
