const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()
    // 登录路由
router.post('/login', async(ctx) => {
    let loginUser = ctx.request.body
        // console.log(loginUser)
    let userName = loginUser.userName
    let password = loginUser.password

    //引入User的model
    const User = mongoose.model('User')

    let result = await User.findOne({ userName: userName }).exec()
        // console.log(result)
    if (result) {
        let newUser = new User()
        await newUser.comparePassword(password, result.password)
            .then(isMatch => {
                ctx.body = { code: 200, message: isMatch }
            })
            .catch(error => {
                console.log(error)
                ctx.body = { code: 500, message: error }
            })
    } else {
        ctx.body = { code: 200, message: null }
    }
})


// 注册路由
router.post('/register', async(ctx) => {
    const User = mongoose.model("User")
    let newUser = new User(ctx.request.body)
    await newUser.save().then(() => {
        ctx.body = {
            code: 200,
            message: '注册成功'
        }
    }).catch(error => {
        ctx.body = {
            code: 500,
            message: error
        }
    })
})
module.exports = router