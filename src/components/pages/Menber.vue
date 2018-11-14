<template>
    <div>
        <div>
            <van-nav-bar  title="会员中心" />
        </div>
        <div class="top">
           <img src="../../assets/images/psu.jpeg"
            v-if="islogin" class="top-img" />
            <div v-if="islogin">欢迎:{{name}},回来!</div>
        </div>
        <div class="login" v-if="islogin">
            <div><van-button plain type="primary" @click="loginout">注销</van-button></div>
            
        </div>
        <div class="login" v-if="!islogin">
            <div><van-button type="warning" @click="tologin">我要登录</van-button></div>
            <div><van-button type="primary" @click="toregister">我要注册</van-button></div>
        </div>
        <div v-if="islogin">
            <van-cell-group>
                <van-cell title="会员卡" is-link />
                <van-cell title="地址管理" is-link  />
                <van-cell title="我的订单" is-link  />
                <van-cell title="会员权益" is-link />
                <van-cell title="联系我们" is-link  />
            </van-cell-group>

        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                islogin: '',
                name:''
            }
        },
        methods: {
            tologin() {
                this.$router.push({name:'Login'})
            },
            toregister() {
                this.$router.push({name:'Register'})
            },
            loginout(){
                localStorage.removeItem('userInfo')
                this.islogin=false
                this.$router.push('/')
            }
        },
        created(){
            if(localStorage.userInfo){
                let result =JSON.parse(localStorage.userInfo)
                // console.log(result)
                if(result.userName){
                    this.islogin=true
                    this.name=result.userName
                }   
            }
        }
    }
</script>

<style scoped>
    .top-img{
        width:70px;
        height: 70px;
        border-radius: 50px;
    }
    .top{
        height:6rem;
        text-align: center;
        padding-top:2rem;
        background-color: #EEA2AD;
            font-size: 14px;
    }
    .login{
        display: flex;
        flex-direction: row;
        background-color: #fff;
        padding:10px;
    }
    .login div{
        flex:1;
        text-align: center;
    }
</style>