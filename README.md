# To setup and start hacking:

- run `docker compose up`

- Wait a bit, go to http://localhost:4000/signup

- Signup with some random data, everything is local and no signup data is sent anywhere
    > Password has to be at least 8 characters

- Go to http://localhost:8080/?pgsql=db&username=dev_user&db=cokodocs_dev&ns=public&select=identities

    - Select System as `PostgreSQL`
    - Server is `db`
    - Username is `dev_user`
    - **Password is `dev_user_password`**
    - Database is `cokodocs_dev`

- On the left sidemenu click "select" next to "identities"
- Click "edit" on first row
- Check "is_verified", so it becomes `true`
- Click on Save
- Go to http://localhost:4000/login
- Login with credentials used at signup
- Happy hacking!

## Setup guide video
https://github.com/OpenPecha/wax-editor-hack/raw/main/setup_guide.mp4
<video src='https://github.com/OpenPecha/wax-editor-hack/raw/main/setup_guide.mp4' width=720/>


# Original Readme below

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
