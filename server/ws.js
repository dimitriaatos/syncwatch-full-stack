const WebSocket = require('ws')

const EventEmitter = require('events')
const events = new EventEmitter()

module.exports = (syncWatch) => {
	const wss = new WebSocket.Server({ server: syncWatch._server })

	const broadcast = (data, ws) => {
		data = JSON.stringify(data)
		if (ws == undefined) {		
			wss.clients.forEach(ws => {
				ws.send(data)
			})
		} else {
			ws.send(data)
		}
		return data
	}

	wss.on('connection', (ws) => {
		events.emit('connection', ws)
		broadcast(syncWatch.output(), ws)

		// ws.on('message', (message) => {console.log(message)})

		ws.on('close', () => {
			events.emit('disconnection')
		// ws.terminate()
		})

		ws.on('error', err => console.log(err))

	})

	process.on('exit', () => {
		wss.clients.forEach(ws => {
			ws.close()
		})
	})

	return {broadcast, events, wss}
}
