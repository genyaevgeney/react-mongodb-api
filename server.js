const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const apiPort = 3000
const db = require('./database').connection

exports.router = express.Router();
const router = require('./router/Router')

exports.configure = async () => {
	app.use(async (req, res, next) => {
		res.setHeader("Access-Control-Allow-Origin", "*")
		res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
		res.setHeader(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept, Authorization"
			)
		next()
	})
	app.use(bodyParser.urlencoded({ extended: true }))
	// app.use(bodyParser.json())
	app.use('/', router)
	db.on('error', console.error.bind(console, 'MongoDB connection error:'))
}

exports.start = () => {
	app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
}
