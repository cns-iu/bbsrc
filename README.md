# BBSRC Production Release Build

## Installation Instructions

```
# Checkout this branch:
git clone https://github.com/cns-iu/bbsrc.git -b production

# Go into the build
cd bbsrc

# Install dependencies:
npm install

# Copy the db-dump.json to this directory:
cp /path/to/db-dump.json .

# If you are upgrading, clean the project:
npm run clean

# Set the port for the server to use:
export PORT=8080

# Start the server:
npm start
```

## Get latest Build

To get the latest build, just do a `git pull origin release`. You may then want to
run `npm install && npm run clean` before `npm start`ing again.
