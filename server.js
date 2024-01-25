const server = require('http')
const url = require('url')
const files = require('fs')
const path = require('path')
const querystring = require('querystring')


server.createServer((req, res) => {
    switch (req.url) {
        case "/":
        case "/home":
            files.readFile("index.html", (err, data) => {
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(data)
                res.end("")
            })
            break
        case "/contact":
            if (req.method === 'GET') {
                files.readFile('contact.html', (err, data) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.write(data)
                    res.end('')
                });
            } else if (req.method === 'POST') {
                let body = ''
                req.on('data', (chunk) => {
                    body += chunk
                })
                req.on('end', () => {
                    const formData = querystring.parse(body),       
                        dataString = `Nombre: ${formData.name}\nCorreo: ${formData.email}\nMensaje: ${formData.message}\n`
                
                    files.appendFile('datos.txt', dataString, (err) => {
                    if (err) {
                        console.error(err)
                        res.writeHead(500, { 'Content-Type': 'text/html' })
                        res.write('Error interno del servidor')
                        res.end('');
                    } else {
                        files.readFile('contact.html', (err, data) => {
                            res.writeHead(200, { 'Content-Type': 'text/html' })
                            res.write(data)
                            res.end('')
                        })
                    }
                })
            }
            break
        default:
                files.readFile("notfound.html", (err, data) => {
                    res.writeHead(200, {'Content-Type': 'text/html'}) 
                    res.write(data)
                    res.end("")
                })           
            break
    }
}).listen(80, () => {
    console.log('Servidor escuchando en http://localhost:80')
})