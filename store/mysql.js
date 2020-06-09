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
                return reject(err);
            }
            resolve(data)
        })
    })
}

function getUser(table, id) {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id = '${id}'`, (err, data) => {
            if(err) {
                return reject(err);
            }
            resolve(data)
        })
    })
}

function insert(table, data) {
    return new Promise( (resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`,data, (err, reulst) => {
            if(err) {
                return reject(err);
            }
            resolve(reulst)
        })
    })
}

function update(table, data) {
    return new Promise( (resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`,[data, data.id], (err, reulst) => {
            if(err) {
                return reject(err);
            }
            resolve(reulst)
        })
    })
}

function upsert(table, data){
    //... TODO, PEDIE SI EXISTE EL USER CON EL ID, EN CASO DE QUE NO EXISTA 
    //HACER EL INSERT,

    if(data && data.id) {
        return update(table, data)
    }else {
        return insert(table, data);
    }
   
}

function query(table, query){
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, res) =>{
            if(err) return reject(err);
            resolve(res[0] || null);
        })
    })
}

function remove(table, id) {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id = '${id}'`, (err, data) => {
            if(err) {
                return reject(err);
            }
            resolve(data)
        })
    })
}

module.exports = {
    list,
    getUser,
    upsert,
    remove,
    query
}