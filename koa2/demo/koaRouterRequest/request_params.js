const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();

router.get('/', async (ctx, next) => {
  ctx.response.body = `<h1>index page</h1>`
})

router.get('/home/:id/:name', async (ctx, next) => {
  console.log(ctx.params);
  ctx.response.body = `<h1>id为:${ctx.params.id} name为:${ctx.params.name}</h1>`
})
// add router middleware:
app.use(router.routes())

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})