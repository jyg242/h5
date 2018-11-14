<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar
                title="类别列表" 
                ></van-nav-bar>
        </div>
        <div>
            <van-row>
                <van-col :span="6">
                    <div id="leftNav">
                        <ul>
                            <li v-for='(item,index) in category' :key="index"
                            @click="clickCategory(index,item.ID)"
                            :class="{categoryActive:categoryIndex==index}">
                                {{item.MALL_CATEGORY_NAME}}
                            </li>
                        </ul>
                    </div>
                </van-col>
                <van-col :span="18">
                    <div class="tabCategorySub">
                        <van-tabs v-model="active" @click="onClickCategorySub">
                            <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">

                            </van-tab>
                        </van-tabs>
                    </div>
                    <div id="list-div">
                        <van-pull-refresh v-model="isReFresh" @refresh='onRefresh'>
                            <van-list v-model="loadding" :finished='finished' @load='onload'>
                                <div class="list-item" @click="goGoodInfo(item.ID)" v-for="(item,index) in goodList" :key="index">
                                    <div class="list-item-img">
                                        <img :src="item.IMAGE1" width="100%" alt=""
                                            :onerror='errorImg'>
                                    </div>
                                    <div class="list-item-text">
                                        <div>{{item.NAME}}</div>
                                        <div>¥{{item.ORI_PRICE | moneyFilter}}</div>
                                    </div>
                                </div>
                            </van-list>
                        </van-pull-refresh>
                    </div> 
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'vant';
import {toMoney} from '../filter/moneyFilter.js'
    export default {
        data() {
            return {
                category: [],
                categoryIndex:0,
                categorySub:[], //小类类别
                active:0, //默认激活标签的值
                loadding:false,
                finished:false,//上拉加载是否有数据
                list:[],//商品数据
                isReFresh:false,//下拉刷新
                page:1, //商品列表的页数
                goodList:[],//商品列表信息
                categorySubId:'',//商品子类id
                errorImg:'this.src="'+require('../../assets/images/errorimg.png')+'"'
            }
        },
        
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        mounted(){
            
            let winHeight=document.documentElement.clientHeight
            document.getElementById('leftNav').style.height=winHeight-46+'px'
            document.getElementById('list-div').style.height=winHeight-90-50+'px'
        },
      methods: {
          async getCategory() {
              let {status,data:{code,message}}=await axios.get('http://127.0.0.1:3000/goods/getCategoryList')
            //   console.log(status)
              if(code==200&&message){
                  this.category=message
                  this.getCategorySubByCateID(this.category[0].ID)
              }else{
                  Toast('服务器错误,数据获取失败')
              }
          },
          clickCategory(index,categoryId){
              this.categoryIndex=index
              this.page=1
              this.finished=false
              this.goodList=[]
              this.getCategorySubByCateID(categoryId)
            //   console.log(index)
          },
        //   根据大类ID读取小类类别列表
          async getCategorySubByCateID(categoryId){
              let {status,data:{code,message}}=await axios.post('http://127.0.0.1:3000/goods/getCategorySubList',{
                  categoryId:categoryId
              })
              
              if(status==200){
                if(code==200&&message){
                    this.categorySub=message
                    this.active=0
                    this.categorySubId=this.categorySub[0].ID
                    this.onload()
                    // console.log(message)
                }
              }else{
                  console.log(error)
              }
          },
        //   上拉加载
        onload(){
            setTimeout(()=>{
                this.categorySubId=this.categorySubId?this.categorySubId:this.categorySub[0].ID
                this.getGoodList()
             },1000)
        },
        // 下拉刷新
        onRefresh(){
            setTimeout(()=>{
                this.isReFresh=false
                this.finished=false
                this.goodList=[]
                this.page=1
                this.onload()
            },500)
        },
        async getGoodList(){
            // console.log('执行getGoodList')
            let {status,data:{code,message}}=await axios.post('http://127.0.0.1:3000/goods/getGoodsListByCategorySubID',{
                categorySubId:this.categorySubId,
                page:this.page
            })
            // console.log(status,message)
            if(status==200){
                if(code==200&&message.length>0){
                    // console.log(message)
                    this.page++
                    this.goodList=this.goodList.concat(message)
                }else{
                    this.finished=true
                }
                this.loadding=false
            }else{
                console.log(error)
            }
        },
         onClickCategorySub(index,title){
            this.categorySubId=this.categorySub[index].ID
            // console.log(`categorySubId:${this.categorySubId}`)
            this.goodList=[]
            this.finished=false
            this.page=1
            this.onload()
        },
        // 跳转到商品详情页
        goGoodInfo(id){
            this.$router.push({name:'Goods',params:{goodsId:id}})
        }
      },  
      created(){
          this.getCategory()
          
          this.categoryIndex=this.$route.query.id
        //   this.categoryIndex=this.$route.query.id
          
      }
    }
</script>

<style scoped>
#leftNav{
    background-color: aliceblue;
}
#leftNav ul li{
    line-height: 2rem;
    border-bottom: 1px solid #e4e7ed;
    padding: 3px;
    font-size: 0.8rem;
    text-align: center;
}
.categoryActive{
    background-color: #fff;
}
.list-item{
    display: flex;
        flex-direction: row;
        font-size:0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
}
#list-div{
    overflow: scroll;
}
.list-item-img{
    flex:8;
}
.list-item-text{
    flex:16;
    margin-top:10px;
    margin-left:10px;
}
</style>