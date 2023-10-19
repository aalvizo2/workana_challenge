const mysql= require('mysql')

//setting up connection to localhost 
const connection= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789', 
    database: 'productos'
})
connection.connect((err)=>{
    if(err) throw err
    console.log('conectado correctamente a la base de datos')
})



module.exports= connection