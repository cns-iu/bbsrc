#!/bin/bash

cd `dirname $0`
export PORT=4000

yarn build

rm -rf dist
mkdir -p dist/db
touch dist/db/.keep

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

zip -r release.zip dist
mv release.zip dist

echo "Steps to run the release: "
echo "> cd ./dist"
echo "> export PORT=8080"
echo "> npm install"
echo "> npm start"
