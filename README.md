# CokoDocs!

CokoDocs is a modern web-based word processor. CokoDocs is built on CokoServer and Wax (https://waxjs.net). We received support from NLnet for YJS concurrent editing integration. 

CokoDocs is 100% open source and comes out of Coko (https://coko.foundation).

We are planning to take this a lot further and currently looking for various pathways to develop the app. If you would like to know more contact Adam Hyde - adam@coko.foundation

https://cokodocs.net

Secret squirrels pre-production deployment demo here (sssh!): http://demo.cokodocs.net

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
