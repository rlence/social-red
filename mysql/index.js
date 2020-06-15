const express = require('express');
const bodyParser = require('body-parser');

const config = require('../cofing');
const router = require('./network');
const app = express();

app.use(bodyParser.json());

//Rutas
app.use('/', router)

app.listen( config.mysqlService.port, ()=> {
    console.info('[Listen MySQL service in port]: ' + config.mysqlService.port);
})