const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');


const app = express();

//Conctando base de datos
mongoose.connect('mongodb+srv://usuario_1:1234@bigdata.hzs3k.mongodb.net/Vuelos?retryWrites=true&w=majority',{
  useNewUrlParser: true, 
  useUnifiedTopology: true})
.then(()=>{
  console.log('Mongodb Coenctado...');
});

// importando rutas
const indexRoutes = require('./routes/index');

//configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))

// rutas
app.use('/', indexRoutes);


//Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});