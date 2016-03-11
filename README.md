This serves as a boilerplate to get started with the application development using node.js, HANA, and Open UI5.

# Prerequisites

Download and install the most recent LTS release from https://nodejs.org

Make sure `node` and `npm` are in your path

Download and install git from https://git-scm.com/downloads


# Installation

1. clone the repository:
  * with Open UI5: `git clone https://github.com/cebit16/nodejs-boilerplate.git --branch ui5 --single-branch`
  * without Open UI5: `git clone https://github.com/cebit16/nodejs-boilerplate.git --branch master --single-branch`
2. `cd nodejs-boilerplate`
3. `npm install` (This loads all third party modules)
4. `cp db_conf.json.template db_conf.json` and add your database credentials


# Folder overview

* lib: contains the server-side code
* web: contains all client-side files that will be served by the web server
* node_modules: contains all third party dependencies (we already have hdb and express in there)


# Linting

Please lint your code! We have already included the eslint module for you (https://www.npmjs.com/package/eslint)


# Start Up

* `node .` starts the application
* `npm start` starts the application with nodemon (automatic restart when files are changing)