const Koa = require('koa');
const forums = require('koa-router')();
const posts = require('koa-router')();
const app = new Koa();

// 第一个路由
posts.get('/', async (ctx, next) => {
  ctx.response.body = `<h1>responds to ${ctx.path}
  </br>
  可以获到外面的fid:${ctx.params.fid}</h1>`
})
posts.get('/:pid', async (ctx, next) => {
  ctx.response.body = `<h1>responds pid to ${ctx.path}
  </br>
  可以获到外面的fid:${ctx.params.fid}和pid:${ctx.params.pid}
  </h1>`
})

/* 第二个路由
*  第二个参数:将第一个路由作为中间件传入,
*  第三个参数:将第一个路由异常处理方法传入,
*/

/* 这个地址作为根地址,
 * 当访问/forums/123/posts时,就是访问posts的'/';
 * 访问/forums/123/posts/123的时候,就是访问posts的'/:pid'
*/
forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods());

// responds to '/forums/123/posts'
// responds to '/forums/123/posts/123'
app.use(forums.routes());

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})