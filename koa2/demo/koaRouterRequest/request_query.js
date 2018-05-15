const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();

router.get('/', async (ctx, next) => {
  ctx.response.body = `<h1>index page</h1>`
})

router.get('/home', async (ctx, next) => {
  let query = ctx.request.query;
  let queryString = ctx.request.querystring;
  // 对象
  console.log(query);
  // 字符串
  console.log(queryString);
  ctx.response.body = `<h1>HOME page</h1>`
})
// add router middleware:
app.use(router.routes())

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})