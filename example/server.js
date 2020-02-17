const express = require('express')
const path = require('path')

const app = express()
const publicPath = path.join(__dirname, './public')
const syncWatchPath = path.join(__dirname, './../client')

console.log(syncWatchPath)
const sync = require('./../sync')

app.use(express.static(publicPath))
app.use('/client', express.static(syncWatchPath))
app.use('/sync', sync)
app.get('/', (req, res) => {
	res.sendFile(path.join(publicPath, 'index.html'))
})

module.exports = app