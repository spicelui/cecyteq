const express = require ('express');
const path = require('path');

const app = express();
app.use(express.static('public'));

const PORT= process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo ${PORT}`);
});

