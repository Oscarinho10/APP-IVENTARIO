const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const personasRoutes = require('./routes/persona.routes');
const productosRoutes = require('./routes/producto.routes');

const App = express();
const PORT = 3000;

App.use(bodyParser.json());

App.use('/api/personas', personasRoutes);
App.use('/api/productos', productosRoutes); 

//Conexión a la base de datos

mongoose.connect('mongodb+srv://20233tn143:5yZYXxMXa6998s1H@mongazo1.yez4y.mongodb.net/inventario-db?retryWrites=true&w=majority&appName=Mongazo1', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexión exitosa a la base de datos a MongoDB');
        App.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
    })
    .catch((err) => console.log('Error al conectar en MongoDB', err));
// mongodb+srv://20233tn143:5yZYXxMXa6998s1H@mongazo1.yez4y.mongodb.net/?retryWrites=true&w=majority&appName=Mongazo1'