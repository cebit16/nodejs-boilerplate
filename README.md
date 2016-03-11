This serves as a boilerplate to get started with the application development using node.js, HANA, and SAP UI5.

# Prerequisites

Download and install the most recent LTS release from https://nodejs.org

Make sure `node` and `npm` are in your path


# Installation

1. Extract the contents of this module somewhere locallly
2. `cd` into that directory
3. ```npm install``` (This loads all third party modules)


# Folder overview

* lib: contains the server-side code
* web: contains all client-side files that will be served by the web server
* node_modules: contains all third party dependencies (we already have hdb and express in there)


# Linting

Please lint your code! We have already included the eslint module for you (https://www.npmjs.com/package/eslint)


# Start Up

* `node .` starts the application
* `npm start` starts the application with nodemon (automatic restart when files are changing)