const koa = require('koa')
const app = new koa()
const { connect, initSchemas } = require('./database/init');
const mongoose = require('mongoose');
const Router = require('koa-router')
const user = require('./appAPI/user')
const goods = require('./appAPI/goods')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
let router = new Router()
const hostname = process.env.NODE_ENV == "production" ? '172.19.56.164' : 'localhost';
// cors解决跨域
app.use(cors())
    // bodyParser中间件接收post请求
app.use(bodyParser())
    // 加载所有子路由
router.use('/user', user.routes())
router.use('/goods', goods.routes())
    // 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods(0))

;
(async() => {
    await connect()
    initSchemas()
})()
app.use(async(ctx) => {
    ctx.body = '<h1>hello koa2</h1>'
})

app.listen(3000, hostname, () => {
    console.log('服务器创建成功')
})