const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
router.get('user', '/user/:id', async (ctx, next) => {
  ctx.response.body = '<h1></h1>'
})

const userUrl = router.url('user', 3);
console.log('userUrl', userUrl);
// =>生成路由 /user/3

const userUrl2 = router.url('user', { id: 4 });
console.log('userUrl2', userUrl2);
// =>生成路由 /user/4

// 调用中间件
app.use(router.routes());

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})