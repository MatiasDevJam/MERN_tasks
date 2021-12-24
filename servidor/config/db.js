const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

// conexión con mongo
const conectarDB = async () => {
    try {
        await mongoose.connect( process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB conectada')
    } catch (error) {   
        console.log( error )
        process.exit( 1 ) // detener la app en caso de error
    }
}

module.exports = conectarDB;