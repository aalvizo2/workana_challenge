const express= require('express')
const app= express()
const path= require('path')
const connection= require('./routes/db')
const registro= require('./routes/registro')
const bodyParser= require('body-parser')
app.use(bodyParser.json());
const auth= require('./routes/auth')

app.use(bodyParser.urlencoded({ extended: true }));
//settings 
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//port settings

app.listen(2000, ()=>{
  console.log('app running on port 2000')
  app.get('/', (req, res)=>{
    connection.query('SELECT * FROM producto', (err, filas)=>{
      connection.query('SELECT * FROM fabrica', (err, dato)=>{
        if(err) throw err
        res.render('inicio', {
          filas: filas, 
          dato: dato
        })
      })
      console.log(filas)
      
    })
   
  })
  
  app.use('/', registro)
  app.use('/', auth)
})