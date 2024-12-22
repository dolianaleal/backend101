/*
import crypto from 'crypto'


const algoritmo = 'aes-256-ctr'
const clave_secreta = 'codercodercodercodercodercoderco' // pass 32 caracteres
const iv = 'codercodercoderc' //vector de inicializaicon de 16 caracteres

const encrypt = (password) => {
    const cipher = crypto.createCipheriv(algoritmo, clave_secreta, iv) // generar password utilizando el iv, algoritmo y contrase;a
    const encryptPass = Buffer.concat([cipher.update(password), cipher.final()])
    //.update = actualizo el cipher con la contrase;a enviada
    //.final = retorno el resultado de dicha encriptacion

    const passE = encryptPass.toString('hex')
    console.log(passE);
    return passE
}

const decrypt = (encryptedPassword) => {
    const decipher = crypto.createDecipheriv(algoritmo, clave_secreta, iv)
    const decryptedPass = Buffer.concat([decipher.update(Buffer.from(encryptedPassword, 'hex')), decipher.final()])

    return decryptedPass.toString()
}

let password = 'coderhouse'
let passwordE = encrypt(password)

console.log(decrypt(passwordE))

*/


/*
import moment from "moment";
console.log(moment())
*/

import fs from 'fs/promises'
import crypto from 'crypto'
const ruta = 'productos.json'

const leerProductos = async () => {
    try {
        const data = await fs.readFile(ruta, 'utf8') //Lo leo como un JSON
        const productos = JSON.parse(data)
        console.log(productos)
        return productos

    } catch (error) {
        console.log("Error en lectura de productos", error)

    }


}

const agregarProductos = async (nuevoProducto) => {

    try {
        const prods = await leerProductos()
        prods.push(nuevoProducto) // Al transformalo de JSON a objeto, lo puedo tratar como un array de js
        await fs.writeFile(ruta, JSON.stringify(prods)) // Para guardarlo lo vuelvo a transformar en JSON
        console.log("Producto almacenado")     
    } catch (error) {
        console.log("Error al agregar producto:", error)
    }
}

const newProduct = {
    id: crypto.randomBytes(5).toString('hex'), //genero ID unico
    nombre: "Coffee",
    marca: "Test",
    precio: 100,
    stock: 10
}

agregarProductos(newProduct)