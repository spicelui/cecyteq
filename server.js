import express from 'express';
import fs from 'fs';

const app = express();
app.use(express.json());
app.use(express.static('public'));

const PASSWORD = '123';
const FILE_PATH = './anuncios.json';

app.get("/", (req, res) => {
  res.redirect("/html/index.html");
});

app.post('/verificar-password', (req, res) => {
  const { password } = req.body;
  if (password === PASSWORD) {
    res.send({ ok: true });
  } else {
    res.status(401).send({ error: 'Contraseña incorrecta' });
  }
});

app.get('/anuncios', (req, res) => {
  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error leyendo archivo');
    res.type('json').send(data || '[]');
  });
});

app.post('/guardar', (req, res) => {
  const { anuncio, password } = req.body;

  if (password !== PASSWORD) {
    return res.status(401).send({ error: 'Contraseña incorrecta' });
  }

  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).send({ error: 'Error leyendo archivo' });

    let anuncios = data ? JSON.parse(data) : [];
    const index = anuncios.findIndex(a => a.id === anuncio.id);

    if (index !== -1) {
      anuncios[index] = anuncio;
    } else {
      anuncios.push(anuncio);
    }

    fs.writeFile(FILE_PATH, JSON.stringify(anuncios, null, 2), err => {
      if (err) return res.status(500).send({ error: 'Error guardando archivo' });
      res.send({ success: true, mensaje: index !== -1 ? 'Anuncio editado' : 'Anuncio creado' });
    });
  });
});

app.post('/eliminar', (req, res) => {
  const { id, password } = req.body;

  if (password !== PASSWORD) {
    return res.status(401).send({ error: 'Contraseña incorrecta' });
  }

  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).send({ error: 'Error leyendo archivo' });

    let anuncios = data ? JSON.parse(data) : [];
    const nuevos = anuncios.filter(a => a.id !== id);

    fs.writeFile(FILE_PATH, JSON.stringify(nuevos, null, 2), err => {
      if (err) return res.status(500).send({ error: 'Error eliminando' });
      res.send({ success: true, mensaje: 'Anuncio eliminado' });
    });
  });
});

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
