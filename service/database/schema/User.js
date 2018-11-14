const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId //主键
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10 //加盐强度

//创建userschema
const userSchema = new Schema({
        UserId: ObjectId,
        userName: { unique: true, type: String }, //unique不重复
        password: String,
        createAt: { type: Date, default: Date.now() },
        lastLoginAt: { type: Date, default: Date.now() }
    })
    //加盐  
userSchema.pre('save', function(next) {
        bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
            if (err) return next(err)
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) return next(err)
                this.password = hash
                next()
            })
        })
    })
    // 比对密码
userSchema.methods = {
        comparePassword: (_password, password) => {
            return new Promise((resolve, reject) => {
                bcrypt.compare(_password, password, (err, isMatch) => {
                    if (!err) resolve(isMatch)
                    else reject(err)
                })
            })
        }
    }
    //发布模型
mongoose.model('User', userSchema)