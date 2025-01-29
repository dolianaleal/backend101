const express = require('express');
const multer = require('multer');
const logger = require('morgan');
const path = require('path');
const productRouter = require('./routes/products.router.js');
const handlebar = require ('express-handlebars')

// Configuración de multer para subir el archivo
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/public/image');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploader = multer({ storage: storage });

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public'))); // Ruta estática para imágenes
app.use(logger('dev'));

//Conf de motor de plantilla
app.engine('handlebars')

// Ruta para servir el archivo index.html al acceder a la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});



// Servir el archivo index.html con el formulario
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para manejar la subida de archivos
app.post('/subirarchivo', uploader.single('myFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No se ha subido ningún archivo.');
    }
    res.send('Archivo subido correctamente');
});

// Rutas de productos
app.use('/api/products', productRouter);

// Manejo de errores
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Error de servidor');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});