import SyncWatch from '@dimitriaatos/syncwatch'
import ReconnectingWebSocket from 'reconnectingwebsocket'
import * as timeSync from 'timesync/dist/timesync'
import EventEmitter from 'events'

const sync = (syncWatch, options = {}) => {
	const {syncPath, delay, interval, stopAfter} = Object.assign(options, {syncPath: '/sync', delay: 1000, interval: 5000, stopAfter: 10000})
	const ts = timeSync.create({
		server: syncPath,
		delay,
		interval
	})
	
	syncWatch.offset = ts.now() - Date.now()
	setTimeout(() => {
		ts.destroy()
	}, stopAfter)
	
	ts.on('change', () => {
		syncWatch.offset = ts.now() - Date.now()
	})
}

const clientWatchWebSocket = (syncWatch, options = {}) => {
	const events = new EventEmitter()

	const {reconnectAttemptInterval, url} = Object.assign(options, {
		reconnectAttemptInterval: 2000,
		url: `ws://${window.location.host}`
	})
	
	const maxSocket = new ReconnectingWebSocket(url)
	
	maxSocket.timeoutInterval = reconnectAttemptInterval
	
	maxSocket.onopen = () => {
		events.emit('connection')
	}
	
	maxSocket.onmessage = (event) => {
		syncWatch.update(JSON.parse(event.data))
	}
	
	maxSocket.onclose = () => {
		events.emit('disconnection')
	}
	
	window.onbeforeunload = () => {
		maxSocket.onclose()
		maxSocket.close()
	}

	return events
}

const ClientWatch = class extends SyncWatch {
	constructor(cb, options){
		super(cb, options)
		
		sync(this, options)
		const events = clientWatchWebSocket(this, options)
		this.on = events.on.bind(events)
	}
}

export default ClientWatch