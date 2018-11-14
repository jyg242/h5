<template>
    <div class="goods-info" @click='goGoodspage'>
        <div class="goods-image">
            <img v-lazy='goodsImage' alt="" width="100%">
        </div>
        <div class="goods-name">{{goodsName}}</div>
        <div class="goods-price">¥{{goodsPrice | moneyFilter}}</div>
    </div>
</template>

<script>
import {toMoney} from '../../components/filter/moneyFilter.js';
    export default {
        props:['goodsImage','goodsName','goodsPrice','goodsId'],
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        created() {
            // console.log(123)
        },
        methods:{
            goGoodspage(){
                this.$router.push({name:'Goods',query:{goodsId:this.goodsId}})
            }
        }
    }
 
</script>

<style scoped>
 .goods-name{
        padding: 0 8px;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space:nowrap; 
    }
</style>