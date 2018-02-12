const Koa = require('koa2')

const app = new Koa()

app.use(async function(ctx) {
  ctx.body = 'Test automated rebuild when code push to Github!'
})

app.listen(3000)
