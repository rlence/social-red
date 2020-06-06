const express = require('express');
const config = require('../cofing');

const user = require('./components/user/network');

const app = express();

// ROUTER

app.use('/api/user', user)


app.listen( config.api.port, (req, res) => {

    console.log('[Api listen en port]: ', config.api.port)

} );