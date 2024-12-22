import express from 'express'

const PORT = 8080
const app = express() //Cuando llame a app, se ejecuta Express

//filtro por la marca enviada en los queries
app.use(express.urlencoded({extended:true})) // Permite realizar peticiones mas complejas (req.query)

const products = [
    {
        id: 1,
        nombre: "Product 1",
        marca: "Test 1",
        precio: 1200,
        stock: 30
    },
    {
        id: 2,
        nombre: "Product 2",
        marca: "Test 1",
        precio: 2000,
        stock: 10
    },
    {
        id: 2,
        nombre: "Product 3",
        marca: "Test 3",
        precio: 1200,
        stock: 20
    }

]



app.get('/', (req, res) => {
    res.send("Hi, server")
})

app get('/saludar', (req, res) => {
    res.send("Hola")
})

app.get ('/products', (req, res) => {
    let {marca, precio} = req.query
    let prodsFiltrados = products.filter(prod => prod.marca.toLowerCase === marca)
    res.send(prodsFiltrados)
})


// : hace referencia a un parametro
app.get('/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid)// Toda informacion que venga por el parametro, es un string
    
    const producto = products.find(prod => prod.id === + productId)

    if (producto) {
        res.send(producto)
    } else {
        res.send("El producto no existe")
    }

    res.send(`Producto con ID: ${productId}`)
})

app.listen(PORT, () => {
    console.log("Server on port: ", PORT)
})