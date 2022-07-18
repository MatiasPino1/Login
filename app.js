const express=require("express")
const app=express();
const hbs=require("hbs")
const path=require("path")
const port=procecss.env.PORT
const session=require("express-session")//Paquete de seguridad para los login.
//configuramos express session copiando el codigo de la documentacion.
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized:true
    })
)

//creamos un middleware para preguntar si el usuario esta autorizado a entrar a la ruta secret
const secured=async(req,res,next)=>{  
    if(req.session.user){
        app.locals.loggedUser = req.session.user;
        next()//da el permiso para seguir
    }
    else{
        const message="Logueese primero"
     res.render("login",{message})
    }
}
const isAuth=(req,res,next)=>{ //Middleware para ver si el usuario esta autorizado.Y de esa manera ver si la pagina muestra el login o no.
    app.locals.loggedUser = req.session.user;  //crea una variable que se puede usar desded cualquier archivo.
    console.log(app.locals.loggedUser)
next()
}
const routeIndex=require("./routes/index")
const routeLogin=require("./routes/login")
const routeSecret=require("./routes/secret")

app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:false}))


app.set("view engine","hbs")//setea el motor de plantillas de hbs.
hbs.registerPartials(path.join(__dirname,"./views/partials"))//importo la carpeta donde estan los partials.



app.use("/",isAuth,routeIndex)
app.use("/login",isAuth,routeLogin)
app.use("/secret",secured,routeSecret)//cuando entra a secret ejecuta la funcion secured para ver si hay un usuario valido que ingreso para dejarlo pasar.


app.listen(port,(err)=>{
    err? console.log("Ha pasado algo"): console.log("Servidor iniciado en http://localhost:3002/")
})