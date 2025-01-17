const { Router } = require('express')

const router = Router();


const midd1 = function (req, res, next){
    req.username = 'John Doe'
    next ()
}

// http://localhost:8080/api/products/
router.get('/', midd1, (req, res) => {
    try{
        res.send(req.username)
    } catch (error){
        next (error)
    } 
    
});

const authentication = (req, res, next) => {
    if (req.username != 'Fede') return res.send('usuario no valido')
        next ()
}

router.post('/', (req, res) => {
    res.send('create products')
});

router.put('/:pid', (req, res) => {
    res.send('update products')
});

router.delete('/:pid', (req, res) => {
    res.send('delete products')
});

module.exports = router
