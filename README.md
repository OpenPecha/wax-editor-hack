# CokoDocs!

## Start

Make sure docker is running and

`docker compose up`

CokoDocs will be available on [http://localhost:4000](http://localhost:4000)

%% node version? 

## Development

Docker use node v16 and yarn

To install a depandency, yarn add it and rebuild the docker client, and re up.

1. `yarn add dependency` 
2. `cd packages/client/ && yarn install`
3. `docker compose build --no-cache client`
4. `docker-compose up`


TODO

test this color set for the different tools: https://iamkate.com/data/12-bit-rainbow/
