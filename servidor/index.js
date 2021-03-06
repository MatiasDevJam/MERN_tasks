const express = require('express');
const conectarDB = require('./config/db')
const cors = require('cors')

// crear el servidor
const app = express();

// conectar a la base de datos
conectarDB();

// habilitar cors
app.use(cors())

// habilitar express.json
app.use( express.json({ extend: true })); 

// importar rutas
app.use('/api/usuarios', require('./routes/usuariosRouter'))
app.use('/api/auth', require('./routes/authRouter'))
app.use('/api/proyectos', require('./routes/proyectosRouter'))
app.use('/api/tareas', require('./routes/tareasRouter'))

// variable de entorno para el puerto
const PORT = process.env.PORT || 4000;

// arrancar la app
app.listen( PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${ PORT }`);
} )