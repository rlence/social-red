const jwt = require('jsonwebtoken');
const config = require('../cofing');
const error = require('../utils/error');
const secret = config.jwt.secret;

function sign(data) {

    const newToken = jwt.sign(data, secret);
    return newToken;
}

function verify(token) {
    return jwt.verify(token, secret)
}

const check = {
    own: function(req, owner){
        const decoded = decoHeader(req);
        if(decoded !== owner ){
            throw error('No puedes hacer esto', 401)
        } 
    },
    logged: function(req){
        const decoded = decoHeader(req);
        
    },
}

function getToken(auth) {
    if(!auth) {
        throw error('No viene token', 401)
    }

    if(auth.indexOf('Bearer ') === -1 ){
        throw error('Formato invalido', 401)
    }

    let token = auth.replace('Bearer ', '');
    return token;
}

function decoHeader (req) {

    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);
    req.user = decoded;
    return decoded;
}


module.exports = {
    sign,
    check
}