import http from 'http'

const PORT = 8080

const server = http.createServer((req, res) => {
    res.end('Hola, 1st server')
})