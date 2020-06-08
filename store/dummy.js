const db = {
    'user':[
        {id: '1' , name:'Ricardo'},
    ]
};

async function list(table){
    return db[table];
}

async function getUser(table, id){
    let col =  await list(table);
    let user = col.filter( item => item.id === id)[0] || null;
    return user;
}

async function upsert(table, data){
 
    if(!db[table]) {
        db[table] = [];
    }
    
    db[table].push(data)
    console.log(db[table])
}

async function remove(table, id){
    let col =  await list(table);
    let newDb = col.filter( item => item.id !== id);
    db[table] = newDb;
    return 'User delete succes'
}

async function query(table, q) {

    let col =  await list(table);
    let keys = Object.keys(q);
    let key = keys[0];
    let user = col.filter( item => item[key] === q[key] )[0] || null;
    return user;
}

module.exports ={
    list,
    getUser,
    upsert,
    remove,
    query
}