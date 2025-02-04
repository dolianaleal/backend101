const { Router } = require('express')
const ProductManagerFile = require ('../managers/productsManagerFiles.js')

const router = Router();
const {
    getAll,
    get,
    create,
    update,
    remove: deleteAction // Renombrado de 'remove' a 'deleteAction'
} = new ProductManagerFile();



const midd1 = function (req, res, next){
    req.username = 'John Doe'
    next ()
}

// http://localhost:8080/api/products/
router.get('/', midd1, async (req, res, next) => { // Añadido 'async' aquí
    try {
        const product = await get(); // 'await' correctamente
        res.send(req.username);
    } catch (error) {
        next(error);
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
    res.send('remove products')
});

module.exports = router
