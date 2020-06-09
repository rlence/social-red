const express = require('express');
const config = require('../cofing');
const bodyParser = require('body-parser');
const swaeggerUi = require('swagger-ui-express');
const errors = require('../network/error');

//componentes de networks
const user = require('./components/user/network');
const auth = require('./components/auth/network');

const app = express();
const swaggerDoc = require('./swagger.json')

// Midelwere
app.use(bodyParser.json());

//ruta para documentacion
app.use('/api-docs', swaeggerUi.serve, swaeggerUi.setup(swaggerDoc))
// ROUTER
app.use('/api/user', user);
app.use('/api/auth', auth )

//Midelwere
app.use(errors);


app.listen( config.api.port, (req, res) => {

    console.log('[Api listen en port]: ', config.api.port)

} );