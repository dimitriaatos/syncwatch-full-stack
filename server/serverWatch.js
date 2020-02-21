const StopWatch = require('@dimitriaatos/syncwatch')
const serverWatchWebSocket = require('./ws')

const ServerWatch = class extends StopWatch {
	constructor(cb, {server, cli, ...options}){
		super(cb, options)
		this._server

		this.server = server

		cli && (this.cli = require('./cli')(this))

		;[
			'toggle', 'reset',
			'play', 'start',
			'pause', 'stop',
			'update'
		].forEach(methodName => {
			this[methodName] = (...args) => this.broadcast(super[methodName](...args))
		})

		;[
			'format',
			'updateInterval'
		].forEach(propertyName => {
			Object.defineProperty(this, propertyName, {
				get: () => super[propertyName],
				set: val => {
					super[propertyName] = val
					this.broadcast(this.output())
					return val
				}
			})
		})

	}

	set server(s){
		this._server = s
		Object.assign(this, serverWatchWebSocket(this))
		this.on = this.events.on.bind(this.events)
		return this._server
	}

	get server(){
		return this._server
	}
}

module.exports = ServerWatch