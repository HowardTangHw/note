const Koa = require('koa');
// 路由前缀
const router = require('koa-router')({
  prefix: '/users'
});
const app = new Koa();

router.get('/', async (ctx, next) => {
  ctx.response.body = `<h1>response to ${ctx.path}</h1>`;
})
router.get('/:userId', async (ctx, next) => {
  ctx.response.body = `<h1>response to ${ctx.path}</h1>`;
})

app.use(router.routes());

app.listen(3000, () => {
  console.log('list to 3000 port')
})