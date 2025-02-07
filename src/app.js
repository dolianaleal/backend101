const express = require('express');
const multer = require('multer');
const logger = require('morgan');
const path = require('path');
const productRouter = require('./routes/products.router.js');
const viewsRouter = require('./routes/views.router.js');
const handlebars = require('express-handlebars');

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
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(logger('dev'))

//Conf de motor de plantilla
app.engine('hbs', handlebars.engine( {
    extname: '.hbs'
}))
app.set ('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views')); // Establece la carpeta 'views' como la carpeta donde buscar las vistas


// Ruta para manejar la subida de archivos
app.post('/subirarchivo', uploader.single('myFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No se ha subido ningún archivo.');
    }
    res.send('Archivo subido correctamente');
});


app.use('/', viewsRouter)
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