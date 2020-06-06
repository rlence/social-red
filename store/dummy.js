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
    console.log(user)
    return user;
}

async function upsert(table, data){
    return db[table].push(data)
}

async function remove(table, id){
    let col =  await list(table);
    let newDb = col.filter( item => item.id !== id);
    db[table] = newDb;
    return 'User delete succes'
}

module.exports ={
    list,
    getUser,
    upsert,
    remove
}