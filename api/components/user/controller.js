const TABLA = 'user';
const nanoid = require('nanoid').nanoid;
const auth = require('../auth');

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

    async function createUser(body){

        if(!body){
            return Promise.reject({message: 'Bad request'})
        }

        const user = {
            name: body.name,
            username: body.username,
        }

        if(body.id){
            user.id = body.id;
        }else{
            user.id = nanoid();
        }
        
        if(body.password || body.username) {
            await auth.upsert({
                id:user.id,
                username: user.username,
                password: body.password
            })
        }

        return store.upsert(TABLA, user);
    }

    function deleteUser(id){
        if(!id){
            return Promise.reject({message:"User not found"})
        }

        return store.remove(TABLA,id);
    }

    function follow(from, to) {
        return store.upsert( TABLA + '_follow',{
            user_from: from,
            user_to: to
        });
    }

    return {
        list,
        get,
        createUser,
        deleteUser,
        follow,
    }
}
