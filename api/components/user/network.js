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
    console.log('estoy aqui', req.params.id)
    Controller.get(req.params.id)
    .then( user => response.succes(req, res, user, 200))
    .catch( err => response.error(req, res, err.message, 500));

});

router.post('/', (req, res) => {
    
    Controller.createUser(req.body)
    .then( data => response.succes(req,  res, 'Usuario creado con exito', 201))
    .catch( err => response.error(req, res, err.message, 400))

});

router.delete('/:id', (req, res) => {
    Controller.deleteUser(req.params.id)
    .then( data => response.succes(req, res, data, 200,))
    .catch( err => response.error(req, res, err.message, 400))
})


module.exports = router;