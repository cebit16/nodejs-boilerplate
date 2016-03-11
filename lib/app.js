/*
* Only strict mode is allowed, this should be the first line in every server-side code file.
* For the client-side, make sure you include that as the first line
* of your IIFE (https://en.wikipedia.org/wiki/Immediately-invoked_function_expression)
*/

'use strict';

/*
* Start the webserver here. We are using the cluster module so we can leverge the power of multiple cores.
*/
const cluster = require('cluster'),
	path = require('path');



if (cluster.isMaster) {
	/*
	* If the current process is the parent (cluster master), lets just start a couple of workers here
	*/
	let workers = require('os').cpus().length;

	for (let i = 0; i < workers; i++) {
		cluster.fork();
	}
} else {
	/*
	* As a worker, lets load the required modules and setup the webserver.
	* We are using express as our core framework for the webserver (https://www.npmjs.com/package/express)
	*/
	const express = require('express'),
		serveStatic = require('serve-static'),
		router = require('./router'),
		apiRouter = require('./api_router');

	let expressApplication = express();

	/*
	* Here we are initializing routing rules and static file serving
	* for all files in the web folder. Have a look at lib/router.js
	*/
	expressApplication.use(router);
	expressApplication.use('/api', apiRouter);
	expressApplication.use(serveStatic(path.join(__dirname, '..', 'web')));
	expressApplication.listen(process.env['PORT'] || 1337);

	console.log('worker started');
}