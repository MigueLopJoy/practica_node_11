const server = require('http')
const files = require('fs')

server.createServer((req, res) => {
    switch (req.url) {
        case "/":
        case "/home":
            files.readFile("index.html", (err, data) => {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write(data)
                res.end("")
            })
            break
        case "/contact":
            files.readFile('contact.html', (err, data) => {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write(data)
                res.end('')
            });
            break
        default:
            files.readFile("notfound.html", (err, data) => {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write(data)
                res.end("")
            })
            break
    }
}).listen(8080, () => {
    console.log('Servidor escuchando en http://localhost:8080')
})