<template>
    <div>
        <div class="main-div">
            <keep-alive>
                <router-view/>
            </keep-alive>
        </div>
        <van-tabbar v-model="active" @change="changeTabbar(active)">
            <van-tabbar-item icon='shop'>首页</van-tabbar-item>
            <van-tabbar-item icon='records'>列表</van-tabbar-item>
            <van-tabbar-item icon='cart'>购物车</van-tabbar-item>
            <van-tabbar-item icon='contact'>会员中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 0,
                nowPath:'',//当前路径
            }
        },
        created(){
            this.changTabBarActive()
        },
        updated(){
            this.changTabBarActive()
        },
        methods: {
            changeTabbar(active) {
                // console.log(active)
                switch(active){
                    case 0:
                        this.$router.push({path:'/'})
                        break;
                    case 1:
                        this.$router.push({name:'CategoryList'})
                        break;
                    case 2:
                        this.$router.push({name:'Cart'})
                        break;
                    case 3:
                        this.$router.push({name:'Menber'})
                        break;

                }
            },
            //改变激活属性
            changTabBarActive(){
                this.nowPath=this.$route.path
                if(this.nowPath=='/cart'){
                    this.active=2
                }
                if(this.nowPath=='/CategoryList'){
                    this.active=1
                }
                if(this.nowPath=='/'){
                    this.active=0
                }
                if(this.nowPath=='/ShoppingMall'){
                    this.active=3
                }
            }
        },
    }
</script>

<style scoped>

</style>