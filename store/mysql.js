const mysql = require('mysql');

const config = require('../cofing');

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    prort: config.mysql.port
};

let connection;

function handelConnect(){
    connection = mysql.createConnection(dbconf);
    connection.connect( (err) => {
        if(err){
            console.error('[db connect]', err)
            setTimeout( handelConnect, 2000);
        }else{
            console.log('[DB connected]')
        }
    })
    connection.on('error', err => {
        console.error('[db error]', err)
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            handelConnect();
        }else{
            throw err;
        }
    })
}

handelConnect();

function list(table) {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if(err) {
                return reject(error);
            }
            resolve(data)
        })
    })
}

module.exports = {
    list,
}