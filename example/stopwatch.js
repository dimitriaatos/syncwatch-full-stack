const {PORT} = process.env

const app = require('./server')
const ServerWatch = require('./../server')
const ip = require('ip')

const server = app.listen(PORT, () => {
	console.log(`Listening on http://${ip.address()}${PORT == 80 ? '' : `:${PORT}`}/`)
})

const watch = new ServerWatch(()=>{}, {server, cli: true})

watch.on('connection', () => console.log('Device connected'))
watch.on('disconnection', () => console.log('Device disconnected'))
