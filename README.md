# CokoDocs!

CokoDocs is a modern web-based word processor. CokoDocs is built on CokoServer and Wax (https://waxjs.net). We received support from NLnet for YJS concurrent editing integration. 

CokoDocs is 100% open source and comes out of Coko (https://coko.foundation).

We are planning to take this a lot further and currently looking for various pathways to develop the app. If you would like to know more contact Adam Hyde - adam@coko.foundation

https://cokodocs.net

Secret squirrels pre-production deployment demo here (sssh!): http://demo.cokodocs.net

## Development

Make sure docker is running and
```
docker compose up
```

You can simply use the default environment variables (found in the `docker-compose.yml` file), or override them with a `.env` file in the root of your project.

## Production

Assuming that you have a database running, add all required environment variables to a `.env` file. You can see the list of required variables in the `docker-compose.production.yml` file.


Then
```
docker compose -f docker-compose.production.yml up
```

## Testing production locally

Same as the production section, but we'll fake having a running database with a docker container.

```
docker compose -f docker-compose.production-local.yml -f docker-compose.production.yml up
```
