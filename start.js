require('dotenv').config({ path: __dirname + `/config/.env`, debug: true });
const fs = require('fs');
const server = require('./src/server');

const env = process.env;
const assert = require('node:assert');

const winston = require("winston");
const log = winston.createLogger({
  level: process.env.NODE_ENV=="development"?"debug":"info",
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
//    new winston.transports.File({ filename: "logs/app.log" }),
  ],
});

assert.ok(env.FILE_PATH, 'Please set FILE_PATH env variable')

//initialize the app.
async function initialize() { 
    //syncronously setup required resources
    server.log = log;
    server.storage_folder = env.FILE_PATH;
};

initialize()
    .then( server.listen(env.HTTP_PORT) )
    .catch( e => log.error(e) )
    .finally( log.info(`API listening on port:${env.HTTP_PORT}`) );
