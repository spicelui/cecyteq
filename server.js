const express = require('express');
const path = require('path');
const app = express();

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));

// Redirigir raíz al login
app.get('/', (req, res) => {
  res.redirect('/html/login.html');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
