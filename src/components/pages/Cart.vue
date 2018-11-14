<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="购物车"></van-nav-bar>
        </div>
        <div class="cart-title">
            <van-button size='small' type='danger'
                @click="clearCart" plain>清空购物车</van-button>
        </div>
        <!-- 显示购物车中的商品 -->
        <div class="cart-list">
            <div class="pang-row" v-for="(item,index) in cartInfo" :key="index">
                <div class="pang-img"><img :src="item.image" width="100%" alt=""></div>
                <div class="pang-text">
                    <div class="pang-goods-name">{{item.Name}}</div>
                    <div class="pang-control">
                        <van-stepper v-model="item.count"></van-stepper>
                    </div>
                </div>
                <div class="pang-goods-price">
                    <div>
                        ¥{{item.price | moneyFilter}}
                    </div>
                    <div>
                        x{{item.count}}
                    </div>
                    <div class="allPrice">
                        ¥{{item.price*item.count | moneyFilter}}
                    </div>
                </div>
            </div>
            <!-- 显示总金额     -->
            <div class="totalMoney">
                商品总价:¥{{totalMoney | moneyFilter}}
            </div>
        </div>
    </div>
</template>

<script>
import{toMoney} from '../filter/moneyFilter.js'
    export default {
       data() {
           return {
               cartInfo: [],
               isEmpty:false,
           }
       }, 
       computed: {
           totalMoney() {
               let allmoney=0
               this.cartInfo.forEach((item,index)=>{
                   allmoney+=item.price*item.count
               })
               localStorage.cartInfo=JSON.stringify(this.cartInfo)
               return allmoney
           }
       },
       filters:{
           moneyFilter(money){
               return toMoney(money)
           }
       },
       methods: {
           //得到购物车数据的方法
           getCartInfo() {
               if(localStorage.cartInfo){
                   this.cartInfo=JSON.parse(localStorage.cartInfo)
               }
            //    console.log('this.cartInfo:'+JSON.stringify(this.cartInfo))
               this.isEmpty=this.cartInfo.length>0 ? true:false
           },
           clearCart(){
               localStorage.removeItem('cartInfo')
               this.cartInfo=[]
           }
       },
       created(){
           this.getCartInfo()
       }
    }
</script>

<style scoped>
.cart-title{
    height: 2rem;
    line-height: 2rem;
    border-color: #fff;
    border-bottom: 1px solid #e4e7ed;
    padding: 5px;
    text-align: right;
}
.cart-list{
    border-color: #fff;

}
.pang-row{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: .5rem;
    font-size: .85rem;
    border-bottom: 1p solid #e4e7ed;
}
.pang-img{
    flex:6;
}
.pang-text{
    flex:14;
    padding-left: 10px;  
}
.pang-goods-name{
    display: flex;
    flex-direction: row;
    justify-content: center;
    /* white-space: nowrap; */
    text-overflow :ellipsis ;
}
.pang-control{
    padding-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.pang-goods-price{
    flex: 4;
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.allPrice{
    color: red;
}
.totalMoney{
    text-align: right;
    border-color: #fff;
    border-bottom: 1px solid #e4e7ed;
    padding: 5px;
}
</style>