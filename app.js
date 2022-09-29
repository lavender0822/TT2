'use strict';

const express = require('express')
const path = require('path');
const app = express()
const port = 3003
const sum = require("./routes/sum")
const fs = require('fs')
const moment = require('moment')

if (!fs.existsSync(`log.log`)) {
    fs.writeFile(`log.log`, `${moment().format('YYYYMMDD')} logging\r\n`, function (err) {
    });
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'))

app.use('/', sum);
// app.use('/', express.static(path.join(__dirname, '/views')));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;