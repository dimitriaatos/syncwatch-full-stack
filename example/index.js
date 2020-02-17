require('dotenv').config()

const initEnv = {
	// NODE_ENV: 'development',
	PORT: 80,
}

Object.assign(process.env, initEnv, process.env)

require('./stopwatch')