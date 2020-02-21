module.exports = (serverWatch) => {
	const readline = require('readline')
	const url = require('./url')
	const open = require('open')
	const copy = require('./copy')

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	})

	const EventEmitter = require('events')

	const ee = new EventEmitter()
	ee.on('open', () => open(url, {app: 'google chrome'}))
	ee.on('url', () => console.log(url))
	ee.on('copy', () => copy(url))

	;['play', 'pause', 'start', 'stop'].forEach(
		cmd => ee.on(
			cmd,
			() => serverWatch[cmd]()
		)
	)

	ee.on('toggle', (toggle) => serverWatch.toggle(toggle))
	;['reset', 'set'].forEach(() => ee.on('reset', (time) => serverWatch.reset(time)))
	ee.on('format', (format) => serverWatch.format = format)

	const cli = (answer) => {
		ee.emit(...answer.split(' '))
		rl.question('', cli)
	}

	rl.question('', cli)
	return ee
}