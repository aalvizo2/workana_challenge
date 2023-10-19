const express= require('express')
const Router= express.Router()
const connection= require('./db')

const jwt = require('jsonwebtoken');

const secretKey= 'mysecret'

Router.get('/login', (req, res)=>{
    res.render('login')
})
Router.post('/auth', (req, res)=>{
    const {usuario}= req.body
    const {pass}= req.body
    connection.query('SELECT * FROM usuarios WHERE usuario=? AND pass=?', [usuario, pass], (err, dato)=>{
        if(dato.length >0){
            
            const token = jwt.sign({ id: usuario }, 'alan24', { expiresIn: '1h' })
            res.json({token})
        }else{
            res.status(401).json({message: 'Invalid Password or username'})
        }
    })
})


module.exports= Router