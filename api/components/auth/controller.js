const bcryt = require('bcrypt');
const TABLA = 'auth';
const auth = require('../../../auth');

module.exports = function(injectedStore){

    let store = injectedStore;
    if(!store){
        store =  require('../../../store/dummy');
    }

    async function upsert(data){
        const authData = {
            id: data.id,
        }

        if(data.username){
            authData.username = data.username;
        }

        if(data.password){
            authData.password = await bcryt.hash(data.password, 5);
        }
        return store.upsert(TABLA, authData);
    }

    async function login(username, password){
        const data = await store.query(TABLA, { username: username })
        return bcryt.compare(password, data.password)
        .then(iqual =>{ 
            
            if(iqual === true){
                //... generar token
                return auth.sign(data);
            }else{
                throw new Error('Informacion invalida')
            }
        })
    }

    return {
        upsert,
        login
    }

}