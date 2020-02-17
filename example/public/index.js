import SyncWatch from './client/index.js'

const watch = new SyncWatch(time => console.log(time.ms))

watch.on('connection', () => console.log('WebSocket Connected'))
watch.on('disconnection', () => console.log('WebSocket Disconnected'))