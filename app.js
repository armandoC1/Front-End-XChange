const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuración de archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para redirigir a login cuando accedan a la ruta raíz '/'
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Ruta de inicio de sesión
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'usuario', 'login.html'));
});

// Ruta para la página de registro
app.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'usuario', 'registro.html'));
});

// Ruta para servir 'detalles.html'
app.get('/ofertas/detalles', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'ofertas', 'detalles.html'));
});

// Ruta para la página de ofertas
app.get('/ofertas', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'ofertas/index.html'));
});

// Ruta para la página de usuarios (corregida)
app.get('/usuarios', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'usuarios.html'));
});
//ruta general
app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
// Ruta para la página de reseñas
app.get('/reseñas', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'reseñas.html'));
});

// Inicializar el servidor
app.listen(PORT, () => {
  console.log(`Servidor frontend ejecutándose en http://localhost:${PORT}`);
});
