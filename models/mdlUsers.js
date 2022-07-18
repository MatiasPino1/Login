const pool = require("../database") //trae el pool de conexiones que conecta con el servidor para poder consultar con la base de datos.
const md5= require("md5") //dependencia para encriptar la password
const mysql= require("mysql")

const getUser= async (user,pass)=> {
    const query= `select * from authusers where userName = ? and userPass = ?` //consulta que va a ir a la database
    const row =await pool.query(query, [user, md5(pass)]) //recibe la consulta sql y en el segundo parametro los datos que reemplazan a los "?" del query.
    return row[0]//el resultado viene en un arreglo,si los datos son correctos devuelve el user y el pass.Estos resultados van a ser utilizados
    //en el post del enrutador.
}
module.exports={getUser}