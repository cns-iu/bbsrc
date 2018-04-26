# BBSRC Deployment

BBSRC can be deployed in multiple ways, but for our purposes we will describe
how it is deployed using Docker.

See the [Production Branch](https://github.com/cns-iu/bbsrc/blob/production/README.md) for another way to deploy.

## System Requirements

    - node
    - npm
    - sqlite3
    - docker (for production deployments)
    - docker-composer (for development / testing)

## Initial setup

After installing the system requirements, run these commands (or `npm run setup`):

```
cd /path/to/this/repository
npm install -g yarn lerna @angular/cli
git submodule init
git submodule update

lerna bootstrap
lerna link
```

## Copy data dump

Place the processed data into the raw-data directory like this:

```
mkdir -p raw-data
mv ~/Desktop/db-dump.json raw-data
```

## Build the code for docker

Next we will build the code necessary for deploying to docker

```
yarn build
```

## BBSRC Docker Production Deployment

Install docker: <https://docs.docker.com/install/>

After installing docker run `docker build -t bbsrc .` (or `yarn build-docker`).
Your deployment of the docker container will vary depending on your organization's
needs. To test the built docker container, run this command: `docker run -p 80:80 bbsrc`
(or `yarn start-docker`) and point your browser to <http://localhost>.

**Note:** importing the database may take several minutes. You will see a
"DB Loaded" message when its done.

## BBSRC Docker Development / Testing

Install docker-compose: <https://docs.docker.com/compose/install/>

After installing docker-compose run `docker-compose up`. To test
the built docker container, run this command: `docker run -p 4100:80 bbsrc`
and point your browser to <http://localhost:4100>.
