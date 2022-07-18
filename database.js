const mysql=require("mysql")
const util=require("util") 
const pool=mysql.createPool({  //importa unas series de conexiones,host,database user etc.
    connectionLimit:10,
    host: "localhost" ,
    database:"users" ,
    user: "root",
    password: "",

})
pool.query=util.promisify(pool.query) 
module.exports=pool
//este archivo conecta con la base de datos.