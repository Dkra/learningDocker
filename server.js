const Koa = require('koa2')

const app = new Koa()

app.use(async function(ctx) {
  ctx.body =
    'Docker volumes can make the data persist util the container stopped!!!!!'
})

app.listen(3000)
