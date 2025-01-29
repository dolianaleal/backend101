const  { Router } = require('express')


const router = Router() // Instanciar


//Controlador
router.get('/', (req, res) => {
    res.render('home', {})
})

module.exports = router