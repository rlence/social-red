module.exports = {

    api: {
        port: process.env.API_PORT || 3000
    },

    jwt:{
        secret: process.env.JWT_SECRET  || 'notasecret!'
    },
    mysql:{
        host: process.env.MYSQL_HOST ||'127.0.0.1',
        user: process.env.MYSQL_USER ||'root',
        password: process.env.MYSQL_PASS ||'20313696rl',
        database: process.env.MYSQL_DB ||'redSocial',
        port: process.env.MYSQL_PORT || '3306'
    },
    mysqlService:{
        port: process.env.MYSQL_SRV_PORT || 3001,
        host: process.env.MYSQL_SRV_HOST || 'localhost'
    }


}