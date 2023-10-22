const express= require('express')
const Router= express.Router()
const connection= require('./db')
const session= require('express-session')
Router.use(session({
   secret: 'alan', 
   resave: false, 
   saveUninitialized: true
}))
const jwt = require('jsonwebtoken');

const secretKey= 'mysecret'

Router.get('/', (req, res)=>{
    res.render('login')
})
Router.post('/auth', (req, res)=>{
    const {usuario}= req.body
    const {pass}= req.body
    connection.query('SELECT * FROM usuarios WHERE usuario=? AND pass=?', [usuario, pass], (err, dato)=>{
        if(dato.length >0){
            req.session.name= true
            req.session.name = usuario
            const token = jwt.sign({ id: usuario }, 'alan24', { expiresIn: '1h' })
            console.log(token)
            console.log(usuario)
            res.redirect('token_auth')
            Router.post('/token_auth', (req, res)=>{
                const tokenEnviado= req.body.token
                console.log(tokenEnviado)
                if(tokenEnviado === token){
                    res.redirect('inicio')
                    
                }else{
                    res.render('Error de autenticacion')
                }
            })
        }else{
            res.status(401).json({message: 'Invalid Password or username'})
        }
    })
})

Router.get('/token_auth', (req, res)=>{
    const usuario= req.session.name
    if(!usuario){
        res.redirect('/')
    }else{
    res.render('token_auth', {
        login:true, 
        usuario: usuario
    })}
})
Router.get('/logout', (req, res)=>{
    req.session.destroy()
    res.redirect('/')
})

var usuario= session.name
module.exports= usuario
module.exports= Router