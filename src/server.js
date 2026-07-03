const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();

app.use(express.json());

const server = http.createServer(app);

const io = new Server(server);

app.use(express.static('src/public'));

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

/*
    Endpoint para PHP
*/
app.post('/notify', (req, res) => {

    const data = req.body;

    io.emit('support-alert', {
        titulo: data.titulo,
        mensaje: data.mensaje,
        fecha: new Date()
    });

    res.json({
        success: true
    });
});

server.listen(3000, () => {
    console.log('Servidor iniciado');
});