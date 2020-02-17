const StopWatch = require('@dimitriaatos/syncwatch')
const serverWatchWebSocket = require('./ws')

const ServerWatch = class extends StopWatch {
	constructor(cb, {server, cli, ...options}){
		super(cb, options)

		cli && require('./cli')(this)

		const {broadcast, events} = serverWatchWebSocket(this, server)

		this.on = events.on.bind(events)

		;[
			'toggle', 'reset',
			'play', 'start',
			'pause', 'stop',
			'update'
		].forEach(methodName => {
			this[methodName] = (...args) => broadcast(super[methodName](...args))
		})

		;[
			'format',
			'updateInterval'
		].forEach(propertyName => {
			Object.defineProperty(this, propertyName, {
				get: () => super[propertyName],
				set: val => {
					super[propertyName] = val
					broadcast(this.output())
					return val
				}
			})
		})

	}
}

module.exports = ServerWatch