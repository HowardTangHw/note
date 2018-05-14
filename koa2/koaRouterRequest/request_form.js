const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const app = new Koa()

app.use(bodyParser())

// 注册表单
router.get('/user', async (ctx, next) => {
  ctx.response.body =
    `
  <form action="/user/register" method="post">
    <input name="name" type="text" placeholder="请输入用户名:abc">
    <br/>
    <input name="password" type="text" placeholder="请输入密码:123"/>
    <br/>
    <button>GOGOGOGO!</button>
  </form>
  `
})


// 增加响应表单请求的路由
router.post('/user/register', async (ctx, next) => {
  // 用了bodyParser之后,就能从ctx.request.body中获取参数了
  console.log(ctx.request.body);
  let { name, password } = ctx.request.body;
  if (name === 'abc' && password == '123') {
    ctx.response.body = `hello,${name}`;
  } else {
    ctx.response.body = '账户信息错误'
  }
})

app.use(router.routes())

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})