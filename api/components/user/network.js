const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');


const router = express.Router();


router.get('/', (req, res, next) => {

    Controller.list()
    .then( list => response.succes(req, res, list, 200))
    .catch(next);

});

router.get('/:id', (req, res, next) => {

    Controller.get(req.params.id)
    .then( user => response.succes(req, res, user, 200))
    .catch(next);

});

router.post('/', (req, res, next) => {
    
    Controller.createUser(req.body)
    .then( data => response.succes(req,  res, 'Usuario creado con exito', 201))
    .catch( next)

});

router.put('/', secure('update') ,(req, res, next) => {
    Controller.createUser(req.body)
    .then( data => response.succes(req,  res, 'Usuario creado con exito', 201))
    .catch( next)
})

router.delete('/:id', (req, res, next) => {
    Controller.deleteUser(req.params.id)
    .then( data => response.succes(req, res, data, 200,))
    .catch( next)
})


module.exports = router;