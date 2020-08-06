#!/bin/bash

docker container stop galaxie_bot
docker rm --force galaxie_bot
docker volume create galaxie_bot_storage
docker run -d \
    --mount source=galaxie_bot_storage,target=/usr/src/bot/storage \
    --restart=on-failure:5 \
    --env-file ~/.env \
    --name galaxie_bot galaxie-bot
