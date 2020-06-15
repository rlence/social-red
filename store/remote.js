const request = require('request');
const bodyParser = require('body-parser');

function createRemoteDB(host, port){

    const URL = 'http://' +host+':'+port;

    function list(table){
        return req('GET', table)
    }

    function get(table, id){}
    function upsert(table, data){}
    function query(table, query, join){}

    function req(method, table, data){
        let url = URL + '/' + table;
        let body = '';
        return new Promise( (resolve, reject) =>{
            request({
                method,
                headers: {
                    'content-type':''
                },
                url,
                body
            }, (err, req, body)=>{
                if(err){
                    console.error('[Error bd remote]', err);
                    return reject(err.message);
                }

                const resp = JSON.parse(body);
                return resolve(resp.body)
            })
        })
    }

    return {
        list
    }

}

module.exports = createRemoteDB;