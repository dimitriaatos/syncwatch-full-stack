const ip = require('ip')
const {PORT} = process.env

module.exports = `http://${ip.address()}${PORT == 80 ? '' : `:${PORT}`}/`