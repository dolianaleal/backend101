import exp from 'constants'
import express from 'express'
import crypto from 'crypto'

const PORT = 8080
const app = express() //Cuando llame a app, se ejecuta Express

app.use(express.json()) //Permite enviar y recibir JSON en las peticiones
//filtro por la marca enviada en los queries
app.use(express.urlencoded({ extended: true })) // Permite realizar peticiones mas complejas (req.query)

const products = []

app.get('/', (req, res) => {
    res.send("Hi, server")
})

app.get('/api/products', (req, res) => {
    //let { marca, precio } = req.query
    //Filtro por la marca enviada en los queries
    //let prodsFiltrados = products.filter(prod => prod.marca.toLowerCase === marca)

   // res.status(200).send(prodsFiltrados)
   res.status(200).send(products)
})

// : hace referencia a un parametro
app.get('/api/products/:pid', (req, res) => {
    const productId = (req.params.pid)// Toda informacion que venga por el parametro, es un string

    const producto = products.find(prod => prod.id === productId)

    if (producto) {
        res.status(200).send(producto)
    } else {
        res.status(404).send("El producto no existe")
    }
})

app.post('/api/products', (req, res) => {
    let { nombre, marca, precio, stock } = req.body

    const newProduct = {
        id: crypto.randomBytes(10).toString('hex'),
        nombre: nombre,
        marca: marca,
        precio: precio,
        stock: stock
    }
    products.push(newProduct)
    res.status(201).send(`Producto creado con el id: ${newProduct.id}`)
})

app.put('/api/products/:pid',(req,res) => {

})

app.listen(PORT, () => {
    console.log("Server on port: ", PORT)
})