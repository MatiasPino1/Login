const mysql=require("mysql")
const util=require("util") 
const pool=mysql.createPool({  //importa unas series de conexiones,host,database user etc.
    connectionLimit:10,
    host: process.env.db_host ,
    database:process.env.db_name ,
    user: process.env.db_user,
    password: process.env.db_pass,

})
pool.query=util.promisify(pool.query) 
module.exports=pool
//este archivo conecta con la base de datos.