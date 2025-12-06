// Cargar variables de entorno
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor Node + Express + MongoDB funcionando correctamente!');
});

// Conexión a MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mario';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB conectado'))
.catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`🌐 Servidor corriendo en http://localhost:${PORT}`);
});

// Manejar error de puerto ocupado
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Puerto ${PORT} ya está en uso.`);
  } else {
    console.error(err);
  }
});
