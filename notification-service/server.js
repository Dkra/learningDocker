var express = require('express')
var app = express()

app.get('/notify', function(req, res) {
	res.json({ msg: 'New user created!' })
})
console.log('process.env.port:', process.env.port)
app.listen(process.env.port || 3000)
