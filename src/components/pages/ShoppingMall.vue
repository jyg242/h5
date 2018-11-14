<template>
    <div>
        <div class="search-bar">
            <van-row>
                <van-col :span="3"><img :src="locationIcon" width="40%" class="location-icon"></van-col>
                <van-col :span="16">
                    <input type="text" class="search-input">
                </van-col>
                <van-col :span="5">
                    <van-button size='mini' >查找</van-button>
                </van-col>
            </van-row>
        </div>
        <!-- 轮播图 -->
        <div class="swiper-area">
            <van-swipe :autoplay='1500'>
                <van-swipe-item v-for="(banner,indx) in slides" :key="indx">
                    <img v-lazy="banner.image"  width="100%" >
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- type bar -->
        <div class="type-bar">
            <div v-for="(cate,index) in category" :key="index" @click="jump(index)" >
                <img v-lazy='cate.image' alt="" width="90%">
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div> 
        <!-- adbanner area       -->
        <div>
            <img v-lazy='advertesPicture.PICTURE_ADDRESS' width="100%">
        </div>
        <!-- recommed goods area -->
        <div class="recommend-area">
            <div class="recommend-title">
                商品推荐
            </div>
            <div class="recommend-body">
                <swiper :options='swiperOption'>
                    <swiper-slide v-for="(item,index) in recommendGoods" :key="index" >
                        <div class="recommend-item" @click="recommend(index)">
                            <img :src="item.image" alt="" width="80%">
                            <div>{{item.goodsName}}</div>
                            <div>¥{{item.price | moneyFilter}}(¥{{item.mallPrice | moneyFilter}})</div>
                        </div>
                  </swiper-slide>  
                </swiper>
                <floorComponent :floorData='floor1' :floorTitle='floorName1'/>
                <floorComponent :floorData='floor2' :floorTitle='floorName2'/>
                <floorComponent :floorData='floor3' :floorTitle='floorName3'/>
            </div>
            <!-- hot area -->
            <div class="hot-area">
                <div class="hot-title">热卖商品</div>
                <div class="hot-goods">
                    <!-- list组件 -->
                    <van-list>
                        <!-- gutter-每一列的空隙 -->
                        <van-row gutter='20'>
                            <van-col :span='12' v-for="(item,index) in hotGoods" :key="index">
                                <goodsInfo 
                                :goodsImage="item.image"
                                :goodsName="item.name"
                                :goodsPrice="item.price"
                                :goodsId="item.goodsId"/>
                            </van-col>
                        </van-row>
                    </van-list>
                </div>
            </div>
        </div> 
    </div>
</template>
 
<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import {swiper,swiperSlide} from 'vue-awesome-swiper'
import floorComponent from '../commpent/floorComponent';
import {toMoney} from '../../components/filter/moneyFilter.js';
import goodsInfo from '../../components/commpent/goodsComponent'
import url from '../../serviceAPI.config.js'
export default {
        data() {
            return {
                swiperOption:{
                    // 页面显示几个swiper
                    slidesPerView:3
                },
                locationIcon:require('../../assets/images/location.png'),
                bannerPicArray:[],
                category:[],
                slides:[],
                advertesPicture:[],
                recommendGoods:[],
                floor1:[],
                floor2:[],
                floor3:[],
                floorName1:{},
                floorName2:{},
                floorName3:{},
                hotGoods:[] //热卖
            }
        },
        methods: {
            jump(index) {
                this.$router.push({name:'CategoryList',query:{id:index}})
                // console.log(index)
            },
            recommend(index){
                this.$router.push({name:'Goods',query:{goodsId:this.recommendGoods[index].goodsId}})
            }
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        components:{swiper,swiperSlide,floorComponent,goodsInfo},
        async mounted(){
            let {status,data:{data:{category,slides,advertesPicture,recommend,floor1,floor2,floor3,floorName,hotGoods}}}= await axios({
                url:url.getShopingMallinfo,
                method:'get'
            })
            // console.log(floor1[0].image)
            if(status==200){
                this.category=category;
                this.slides=slides;
                this.advertesPicture=advertesPicture;
                this.recommendGoods=recommend;
                this.floor1=floor1; 
                this.floor2=floor2;   
                this.floor3=floor3;     
                this.floorName1=floorName.floor1
                this.floorName2=floorName.floor2
                this.floorName3=floorName.floor3
                this.hotGoods=hotGoods
                // console.log(this.floor1)
                
            }else{
                console.log('出错')
            }
        }       
    }
</script>

<style scoped>
    .search-bar{
        height: 2.2rem;
        background-color: #e5017d;
        line-height: 2.2rem;
        overflow: hidden;
    }
    .search-input{
        width:100%;
        height: 1.3rem;
        border-top:0px;
        border-right: 0px;
        border-left: 0px;
        border-bottom: 1px solid #fff !important;
        background-color: #e5017d;
        color: #fff;
    } 
    .location-icon{
        padding-top:.2rem;
        padding-left: .3rem;

    }
    .swiper-area{
        clear: both;
        max-height: 9.5rem;
        overflow: hidden;
    }
    .type-bar{
        background-color: #fff;
        margin: 0rem .3rem .3rem .3rem;
        border-radius: .3rem;
        font-size: 14px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
       
    }
    .type-bar div{
        /* max-height: 15rem; */
        padding: .3rem;
        font-size: 12px;
        text-align: center;
        flex:1;
    }
    .recommend-area{
        background-color: #fff;
        margin-top: .3rem;

    }
    .recommend-title{
        border-bottom: 1px solid #eee;
        font-size: 14px;
        padding: .2rem;
        color: #e5017d;
    }
    .recommend-body{
        border-bottom: 1px solid #eee;
    }
    .recommend-item{
        width: 99%;
        border-right: 1px solid #eee;
        font-size: 12px;
        text-align: center;    
    }
    .hot-area{
        text-align: center;
        font-size: 14px;
        height: 1.8rem;
        line-height: 1.8rem;
    }
    .hot-title{
        background-color: #ddd;
    }
    .hot-goods{
        height: 140rem;
        overflow: hidden;
        border-color: #fff;
    }
    .van-button{
        margin-left: .6rem;
    }
    .location-icon{
        margin-top: .5rem;
    }
    
</style>
