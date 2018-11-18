<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar
                title="商品详情"
                left-text='返回'
                left-arrow
                @click-left='onClickLeft'/>
        </div>
        <div class="topimage-div">
            <img :src="goodsInfo.IMAGE1" width="100%" alt="" :onerror='errorImg'>
        </div>
        <div class="goods-name">{{goodsInfo.NAME}}</div>
        <div class="goods-price">价格:¥{{goodsInfo.PRESENT_PRICE | moneyFilter}}元</div>
        <div>
        <!-- 切换\吸顶  1 -->
            <van-tabs swipeable sticky> 
                <van-tab title="商品详情">
                    <div  class="detail" v-html="goodsInfo.DETAIL" >
                        
                    </div>
                </van-tab>
                <van-tab title="评论制作中"></van-tab>
            </van-tabs>
        </div>
        <!-- 底栏 -->
        <div class="goods-bottom">
            <div>
                <van-button size='large' type='primary' @click="addGoodsToCart">加入购物车</van-button>
            </div>
            <div>
                <van-button size='large' type='danger'>立即购买</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import { Toast } from 'vant';
import config from '@/config'

import {toMoney} from '../../components/filter/moneyFilter.js'
    export default {
        data() {
            return {
                goodsId: '',
                goodsInfo:{},//商品详细信息
                errorImg:'this.src="'+require('../../assets/images/errorimg.png')+'"'
            }
        },
        methods: {
            async getInfo() {
                let {status,data:{code,message}}=await axios.post(`http://${config.API}:3000/goods/getDetailGoodsInfo`,{
                    goodsId:this.goodsId
                })
                if(code==200&&message){  
                    this.goodsInfo=message
                }else{
                    Toast('服务器错误,数据获取失败')
                }
            },
            onClickLeft(){
                this.$router.go(-1)
            },
            //增加商品到购物车
            addGoodsToCart(){
                //取出本地购物车中的商品
                // localStorage.removeItem('cartInfo')
                let cartInfo=localStorage.cartInfo?JSON.parse(localStorage.cartInfo):[]
                let isHaveGoods=cartInfo.find(cart=>cart.goodsId==this.goodsId)//有就返回数据,否则返回undefinded
                // console.log(isHaveGoods)
                if(!isHaveGoods){
                    let newGoodsInfo={
                        goodsId:this.goodsInfo.ID,
                        Name:this.goodsInfo.NAME,
                        price:this.goodsInfo.PRESENT_PRICE,
                        image:this.goodsInfo.IMAGE1,
                        count:1
                    }
                    cartInfo.push(newGoodsInfo)
                    localStorage.cartInfo=JSON.stringify(cartInfo)
                    Toast.success('添加成功')
                }else{
                    Toast.fail('此商品已存在')
                }
                this.$router.push({name:'Cart'})
           }
        },
        created(){
            this.goodsId=this.$route.query.goodsId?this.$route.query.goodsId:this.$route.params.goodsId
            this.getInfo()
            

        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        }
    }
</script>

<style scoped>
.goods-name,.goods-price{
    background-color: #fff;
}
/* 去除图片中的空格*/
.detail{
    font-size: 0;
}
.goods-bottom{
    position: fixed;
    bottom:0px;
    left:0px;
    border-color: #fff;
    width:100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

}
.goods-bottom > div{
    flex:1;
    padding: 5px;
}
</style>