'use strict';

/*
* Create a new router instance (see http://expressjs.com/en/4x/api.html#express.router)
*/
const router = module.exports = require('express').Router();

/*
* You can now add your custom routes here
*/
router.get('/', (req, res, next) => {
	res.end('Hello world ;)');
});