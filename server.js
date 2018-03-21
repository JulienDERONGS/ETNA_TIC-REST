'use strict';

const Hapi = require('hapi');
const DB = require('./modules/Database/Database.js');
const routes = require("./modules/routes/routes.js")

// Server creation
const server = Hapi.server({
    host: 'localhost',
    port: 80
});

// Monitor logs into console
server.events.on('response', function (request) {
    console.log(request.info.host + ' | ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode);
});

// Adding routes
server.route(routes);

// Server launching function
async function start() {
    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('Server running at:', server.info.uri);
};

start();