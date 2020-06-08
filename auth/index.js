const jwt = require('jsonwebtoken');
const config = require('../cofing');
const secret = config.jwt.secret;
const error = require('../utils/error');

function sign(data) {
    return jwt.sign(data, secret);
}

function verify(token) {
    return jwt.verify(token, secret)
}

const check = {
    own: function(req, owner){
        const decoded = decoHeader(req);
        console.log('[check decode]',decoded)
        if(decoded.id !== owner ){
            throw error('No puedes hacer esto', 401)
        }
      //...  
    },
}

function getToken(auth) {
    if(!auth) {
        throw new Error('No viene token')
    }

    if(auth.indexOf('Bearer ') === -1 ){
        throw new Error('Formato invalido')
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