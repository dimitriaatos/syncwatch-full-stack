let {PORT} = process.env

const app = require('./server')
const ServerWatch = require('./../server')
const ip = require('ip')

let server

const listen = (port = PORT) => {
	try {server.close()}
	catch (e){'do nothing'}
	PORT = port
	return app.listen(PORT, () => {
		console.log(`Listening on http://${ip.address()}${PORT == 80 ? '' : `:${PORT}`}/`)
	})
}

server = listen()

const watch = new ServerWatch(()=>{}, {server, cli: true})

watch.cli.on('port', (port) => {
	server = listen(port)
	watch.server = server
})

watch.on('connection', () => console.log('Device connected'))
watch.on('disconnection', () => console.log('Device disconnected'))
