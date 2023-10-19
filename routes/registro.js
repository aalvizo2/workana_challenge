const express= require('express')
const Router= express.Router()
const connection= require('./db');
const { emitWarning } = require('process');


Router.post('/registrar', (req, res)=>{
    const {Descripcion, Precio, Existencias}=req.body
    connection.query('INSERT INTO fabrica(Descripcion, Precio, Existencias) VALUES(?,?,?)', [Descripcion, Precio, Existencias], (err)=>{
        console.log('Data inserted correctly')
        connection.query('INSERT INTO producto(Descripcion, Precio, Existencias) VALUES(?,?,?)', [Descripcion, Precio, Existencias], (err)=>{
            console.log('Data inserted into producto')
            res.redirect('/')
        })
    })
});
Router.get('/modificar',(req, res)=>{
    const{id}= req.query
    connection.query('SELECT * FROM producto WHERE idFab=?', [id], (err, fila)=>{
        connection.query('SELECT * FROM fabrica WHERE id=?', [id], (err, fila)=>{
            res.render('modificar', {
                fila: fila
            })
        })
        
    })
    
})
Router.post('/modificar', (req, res)=>{
    const{Descripcion}= req.body
    const{Precio}= req.body
    const{Existencias}= req.body
    const{id}=req.body
    console.log(Descripcion,Precio,Existencias,id)
    connection.query('UPDATE producto SET Descripcion=?, Precio=?, Existencias=? WHERE idFab=?', [Descripcion, Precio, Existencias, id],(err, )=>{
         if(err)throw err
         connection.query('UPDATE fabrica SET Descripcion=?, Precio=?, Existencias=? WHERE id=?', [Descripcion, Precio, Existencias, id], (err)=>{
            console.log('id Fabrica actualizado')
         })
        res.redirect('/')
    })
})
Router.get('/eliminar/:id', (req,res)=>{
    const{id}= req.params
    connection.query('DELETE FROM producto WHERE idFab=?', [id], (err)=>{
        connection.query('DELETE FROM fabrica WHERE id=?', [id], (err)=>{
            if(err)throw err 
            
        })
        res.redirect('/') 
    })
    
})

module.exports= Router