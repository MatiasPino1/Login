"use strict"
const express=require("express")
const router=express.Router()
const mdlUsers= require("../models/mdlUsers")//se importa el archivo que contiene la funcion que valida o no los datos que pasa el usuario.
router.get("/",(req,res)=>{
    res.render("login")
})
router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/")
})
router.post("/",async(req,res)=>{ //la informacion del login llega al post siendo un metodo asincronico porque los datos viajan a la base de datos.
const {user, pass}= req.body //separa los datos de user y pass en dos resultados.
const data =await mdlUsers.getUser(user,pass) //se llama al archivo mdlusers que contiene una funcion que consulta a la base de datos si el usuario existe.
if(data != undefined){ //consulta,si el resultado a la base de datos NO da undefined quiere decir que se encuentra en la base de datos y accede,si no encuentra en la base de datos el resultado va a ser undefined y va a decir datos incorrectos. 

    req.session.user=user//al objeto de session que esta en app.js se le agrega la propiedad user que va a valer cualquier dato que exista en la base de datos,puede ser user,pass o mail en este caso.
    res.render("secret",{user})
}
else{
    const message="Usuario o Contraseña Incorrectos"
    res.render("Login",{message})//renderiza en login la variable mensaje.
}
})
module.exports=router