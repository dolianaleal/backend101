const { Router } = require('express');
const router = Router();

// Controlador para renderizar home.handlebars
router.get('/', (req, res) => {

    const user = {
        name: 'Test',
        last_name: 'Test Ln'
    }

const products = [
    {title: 'prod 1', price: 5000},
    {title: 'prod 2', price: 6000},
    {title: 'prod 3', price: 7000},
    {title: 'prod 4', price: 9000},
    {title: 'prod 5', price: 3000},
    {title: 'prod 6', price: 2000}
]

    res.render('index', {
        user,
        products,
        existProduct: products.length!==0,
        title: 'Home',
        style: 'styles.css'
    })
    
    })


module.exports = router