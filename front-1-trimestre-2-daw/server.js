


const express = require('express');
const path = require('path');
const app = express();

// Configurar carpetas estáticas para servir archivos CSS, JS e imágenes
app.use('/build/css', express.static(path.join(__dirname, 'css')));
app.use('/build/js', express.static(path.join(__dirname, 'js')));
app.use('/build/images', express.static(path.join(__dirname, 'images')));

// Servir el archivo HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/html', 'home.html'));


  
});

// Configurar el puerto para el servidor
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});




/*

const express = require('express');
const path = require('path');
const app = express();

// Configurar carpetas estáticas para CSS, JS, e imágenes
app.use('/css', express.static(path.join(__dirname, '../css')));
app.use('/js', express.static(path.join(__dirname, '../js')));
app.use('/images', express.static(path.join(__dirname, '../images')));

// Servir páginas HTML dinámicamente
app.get('/:page', (req, res) => {
  const page = req.params.page;
  const filePath = path.join(__dirname, '../html', `${page}`);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`Error al cargar ${page}.html:`, err);
      res.status(404).send('Página no encontrada');
    }
  });
});

// Redirigir todas las rutas no definidas a home.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/home.html'), (err) => {
    if (err) {
      console.error('Error al cargar home.html:', err);
      res.status(500).send('Error en el servidor');
    }
  });
});

// Configurar el puerto y arrancar el servidor
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

*/



/*
const express = require('express');
const path = require('path');
const app = express();

// Configurar carpetas estáticas para CSS, JS, e imágenes
app.use('./build/css', express.static(path.join(__dirname, '../css')));
app.use('/build/js', express.static(path.join(__dirname, '../js')));
app.use('/build/images', express.static(path.join(__dirname, '../images')));

// Servir páginas HTML dinámicamente
app.get('/:page', (req, res) => {
  const page = req.params.page;
  const filePath = path.join(__dirname, '../html', `${page}`);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`Error al cargar ${page}.html:`, err);
      res.status(404).send('Página no encontrada');
    }
  });
});

// Servir el archivo HTML principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'home.html'));
  });
  
  // Configurar el puerto para el servidor
  const PORT = process.env.PORT || 80;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
 */ 