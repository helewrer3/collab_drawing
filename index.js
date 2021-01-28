const socketio = require('socket.io')
const express = require('express')
const shortid = require('shortid')
const http = require('http')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use('/:id', express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    const url = shortid.generate()
    res.redirect(`/${url}`)
})

io.on('connection', (socket) => {
    socket.on('login', (data) => {
        socket.join(data.url)
    })
    socket.on('isstarting', (data) => {
        socket.to(data.url).emit('getstarting');
    })
    socket.on('isending', (data) => {
        socket.to(data.url).emit('getending');
    })
    socket.on('isdrawing', (data) => {
        socket.to(data.url).emit('getdrawing', data);
    })
})


const port = process.env.PORT || 3000
server.listen(port, () => console.log(port))