const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
  res.redirect('/html/login.html');
});

app.use(express.static(path.join(__dirname)));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});

