const Koa = require('koa');
// const Router = require('koa-router');
// const router = new Router();
// 因为require('koa-router')返回的是函数,所以有以下简写
const router = require('koa-router')();
const app = new Koa();
// 添加路由
router.get('/', async (ctx, next) => {
  ctx.response.body = `<h1>index page</h1>`;
})

router.get('/home', async (ctx, next) => {
  ctx.response.body = `<h1>home page</h1>`;
})

router.get('/404', async (ctx, next) => {
  ctx.response.body = `<h1>404 not found</h1>`;
})


// 匹配上面没有的地址
router.all('/*', async (ctx, next) => {
  ctx.response.status = 404;
  ctx.response.body = '<h1>404 not found</h1>'
})

// 调用中间件
app.use(router.routes());

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})