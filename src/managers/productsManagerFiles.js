const fs = require('fs');
const path = require('path');

class ProductManagerFile {
    constructor() {
        this.productsFilePath = path.join(__dirname, 'products.json'); // Ruta donde se guardan los productos
        this.loadProducts(); // Cargar los productos al iniciar
    }

    // Método para cargar productos desde el archivo
    loadProducts() {
        try {
            const data = fs.readFileSync(this.productsFilePath, 'utf-8');
            this.products = JSON.parse(data);
        } catch (error) {
            this.products = []; // Si no existe el archivo o hay error, inicializamos un array vacío
        }
    }

    // Método para guardar los productos en el archivo
    saveProducts() {
        try {
            fs.writeFileSync(this.productsFilePath, JSON.stringify(this.products, null, 2), 'utf-8');
        } catch (error) {
            console.error('Error al guardar productos:', error);
        }
    }

    // Obtener todos los productos
    async get() {
        return this.products; // Retorna todos los productos cargados
    }

    // Obtener un producto por su ID
    async getById(id) {
        return this.products.find(product => product.id === id); // Buscar un producto por su ID
    }

    // Crear un nuevo producto
    async create(title, price) {
        const newProduct = {
            id: Date.now(), // Usamos el timestamp como ID único
            title,
            price
        };
        this.products.push(newProduct); // Añadimos el producto al array
        this.saveProducts(); // Guardamos los productos actualizados
        return newProduct; // Devolvemos el nuevo producto creado
    }

    // Actualizar un producto
    async update(id, title, price) {
        const productIndex = this.products.findIndex(product => product.id === id); // Buscamos el índice del producto
        if (productIndex === -1) return null; // Si no lo encontramos, retornamos null

        this.products[productIndex] = { id, title, price }; // Actualizamos el producto
        this.saveProducts(); // Guardamos los productos actualizados
        return this.products[productIndex]; // Devolvemos el producto actualizado
    }

    // Eliminar un producto
    async deleteAction(id) {
        const productIndex = this.products.findIndex(product => product.id === id); // Buscamos el índice del producto
        if (productIndex === -1) return null; // Si no lo encontramos, retornamos null

        const deletedProduct = this.products.splice(productIndex, 1); // Eliminamos el producto
        this.saveProducts(); //  actualizados
        return deletedProduct[0]; // producto eliminado
    }
}

module.exports = ProductManagerFile; // exportar la clase