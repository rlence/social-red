const express = require('express');
const config = require('../cofing');
const bodyParser = require('body-parser');
const swaeggerUi = require('swagger-ui-express');
const user = require('./components/user/network');

const app = express();

const swaggerDoc = require('./swagger.json')
// Midelwere
app.use(bodyParser.json());
app.use('/api-docs', swaeggerUi.serve, swaeggerUi.setup(swaggerDoc))
// ROUTER
app.use('/api/user', user);




app.listen( config.api.port, (req, res) => {

    console.log('[Api listen en port]: ', config.api.port)

} );