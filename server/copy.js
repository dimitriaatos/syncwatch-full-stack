const clipboard = require('clipboardy')

const copy = (url) => {
	clipboard.writeSync(url)
}

module.exports = copy