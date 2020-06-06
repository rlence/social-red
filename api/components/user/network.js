const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();


router.get('/', (req, res) => {

    Controller.list()
    .then( list => response.succes(req, res, list, 200))
    .catch( err => response.error(req, res, err.message, 500));

});

router.get('/:id', (req, res) => {

    Controller.get(req.params.id)
    .then( user => response.succes(req, res, user, 200))
    .catch( err => response.error(req, res, err.message, 500));

});


module.exports = router;