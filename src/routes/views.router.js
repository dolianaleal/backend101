const { Router } = require('express');
const router = Router();

// Controlador para renderizar home.handlebars
router.get('/', (req, res) => {
    res.render('home', { 
        name:'test name',
        last_name: 'test LN'  // el error era una ','
    });
});

module.exports = router;