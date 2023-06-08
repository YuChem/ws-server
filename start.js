require('dotenv').config({ path: __dirname + `/config/.env`, debug: true });
const fs = require('fs');
const server = require('./src/server');

const env = process.env;
const assert = require('node:assert');

assert.ok(env.FILE_PATH, 'Please set FILE_PATH env variable')

//initialize the app.
async function initialize() { 
    //syncronously setup required resources
    server.storage_folder = env.FILE_PATH;
};

initialize()
    .then( server.listen(env.HTTP_PORT) )
    .catch( e => console.error(e) )
    .finally( console.log(`API listening on port:${env.HTTP_PORT}`) );
