const path = require('path');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const { NoEmitOnErrorsPlugin } = require('webpack');
const { AotPlugin } = require('@ngtools/webpack');

module.exports = {
  "target": "node",
  "resolve": {
    "extensions": [
      ".ts",
      ".js"
    ],
    "modules": [
      "./node_modules"
    ]
  },
  "resolveLoader": {
    "modules": [
      "./node_modules"
    ]
  },
  "entry": {
    "src/read-raw-data": [
      './src/read-raw-data.ts'
    ],
    "src/science-mapper": [
      './src/science-mapper.ts'
    ]
  },

  "output": {
    "path": process.cwd(),
    "filename": "[name].js"
  },

  "watch": true,

  "module": {
    "rules": [
      {
        "test": /\.json$/,
        "loader": "json-loader"
      },
      {
        "test": /\.ts$/,
        "loader": "@ngtools/webpack",
        options: {
          "tsConfigPath": "src/tsconfig.app.json"
        }
      }
    ]
  },
  "plugins": [
    new NoEmitOnErrorsPlugin(),
    new ProgressPlugin(),
    new AotPlugin({
      "mainPath": "index.ts",
      "exclude": [],
      "tsConfigPath": "src/tsconfig.app.json",
      "skipCodeGeneration": true
    })
  ],
  "node": {
    "fs": true,
    "global": true,
    "crypto": "empty",
    "tls": "empty",
    "net": "empty",
    "process": true,
    "module": false,
    "clearImmediate": false,
    "setImmediate": false
  }
};
