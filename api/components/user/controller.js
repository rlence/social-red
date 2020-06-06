const TABLA = 'user';
const nanoid = require('nanoid').nanoid;

module.exports = function(injectedStore){
    let store = injectedStore;
    if(!store){
        store =  require('../../../store/dummy');
    }

    function list(){
        return store.list(TABLA);
    }

    function get(id){
        return store.getUser(TABLA, id);
    }

    function createUser(body){

        if(!body){
            return Promise.reject({message: 'Bad request'})
        }

        const user = {
            name: body.name
        }

        if(body.id){
            user.id = body.id;
        }else{
            user.id = nanoid();
        }

        return store.upsert(TABLA, user);
    }

    function deleteUser(id){
        if(!id){
            return Promise.reject({message:"User not found"})
        }

        return store.remove(TABLA,id);
    }

    return {
        list,
        get,
        createUser,
        deleteUser,
    }
}
