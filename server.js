const Koa = require('koa2')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const mongoose = require('mongoose')
const logger = require('koa-logger')
const json = require('koa-json')
const User = require('./models/user')
const axios = require('axios')

const mongoUri =
	process.env.mongoUri || 'mongodb://localhost:27017/local-dev-db'
mongoose.connect(mongoUri)

const app = new Koa()
const router = new Router()

router.get('/users', async ctx => {
	await User.find({}, (err, users) => {
		console.log('err:', err)
		ctx.response.body = users
	})
})

router.post('/users', async ctx => {
	const newUser = new User(ctx.request.body)

	await newUser.save((err, user) => {
		if (err) console.log('err:', err)
		else {
			axios
				.get('http://notifications:7777/notify')
				.then(function(response) {
					console.log(response)
				})
				.catch(function(error) {
					console.log(error)
				})
		}
	})

	ctx.response.body = newUser
})

app.use(logger())
app.use(json())
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())

app.on('error', err => {
	err ? console.log('server error', err) : null
})

app.listen(3000)
