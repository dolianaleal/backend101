const { Router } = require('express'); // Esto importa correctamente Router desde express
const router = Router(); // Aquí creas la instancia del enrutador

router.get('/', (req, res) => {
    const user = {
        name: 'Test',
        last_name: 'Test Ln'
    };
    const products = [
        {title: 'prod 1', price: 5000},
        {title: 'prod 2', price: 6000},
        {title: 'prod 3', price: 7000},
        {title: 'prod 4', price: 9000},
        {title: 'prod 5', price: 3000},
        
    ];

    res.render('index', {
        user,
        products,
        existProduct: products.length !== 0,
        title: 'PRODUCT',
        style: 'css/styles.css' // Ruta correcta del archivo CSS
    });
});

module.exports = router