import express from 'express'

const PORT = 8080
const app = express() //Cuando llame a app, se ejecuta Express

const products = [
    {
        id:1,
        nombre: "Product 1",
        marca: "Test 1",
        precio: 1200 ,
        stock: 30
    },
    {
        id:2,
        nombre: "Product 2",
        marca: "Test 2",
        precio: 2000,
        stock: 10
    },
    {
        id:2,
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

// : hace referencia a un parametro
app.get('/products/:pid', (req, res) => {
    const productId = req.params.pid
    console.log(productId)
    res.send(`Producto con ID: ${productId}`)
})

app.listen(PORT, () => {
    console.log("Server on port: ", PORT)
})