#!/bin/bash

cd `dirname $0`
export PORT=4000

yarn build

rm -rf dist
mkdir -p dist/db
touch dist/db/.gitkeep

cp packages/bbsrc-database/docker-package.json ./dist/package.json
cp -r packages/client/dist ./dist/client
cp packages/bbsrc-database/build/prod-server.js ./dist/index.js
cp raw-data/db-dump.json ./dist/

pushd dist
  npm install
  npm cache clean --force
  npm shrinkwrap
  rm -rf node_modules
popd

cp -r dist/* ../bbsrc-release/
