<template>
    <div class="floor">
        <div class="floor-title">{{title}}</div>
        <div class="floor-anomal">
            <div class="floor-one" @click="recommend(floor1_0_0)">
                <img :src="floor1_0" width="100%" alt="">
            </div>
            <div class="floor-two">
                <div @click="recommend(floor1_0_1)">
                    <img :src="floor1_1" width="100%" alt="">
                </div>
                <div @click="recommend(floor1_0_2)">
                    <img :src="floor1_2" width="100%" alt="">
                </div>
            </div>
        </div>
        <div class="floor-rule">
            <div v-for="(item,index) in floorData.slice(3)" :key="index"
             @click="recommend(floorData[0].goodsId)">
                <img :src="item.image" alt="" width="100%">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                floor1_0: '',
                floor1_1: '',
                floor1_2: '',
                floor1_0_0:'',
                floor1_0_1:'',
                floor1_0_2:'',
                title:''
  
                
            }
        },
        props:['floorData','floorTitle'],
        watch:{
            floorData(){
                this.floor1_0=this.floorData[0].image
                this.floor1_0_0=this.floorData[0].goodsId
                this.floor1_0_1=this.floorData[1].goodsId
                this.floor1_0_2=this.floorData[2].goodsId
                this.floor1_1=this.floorData[1].image
                this.floor1_2=this.floorData[2].image
                this.title=this.floorTitle
                // console.log(this.floorData[0].goodsId)
            }
        },
        methods: {
            recommend(index){
                this.$router.push({name:'Goods',query:{goodsId:index}})
            }
        },
    }
</script>

<style scoped>
.floor-anomal{
        display: flex;
        flex-direction: row;
        background-color: #fff;
        border-bottom: 1px solid #ddd;
        /* align-items: center; */
    }
    .floor-anomal div{
        width: 12rem;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        
    }
    .floor-one{
        /* border-right: 1px solid #ddd; */
        margin-top:2rem;
       

    }
    
    .floor-two{
        border-left: 1px solid #ddd;
        /* border-left: 1px solid #ddd; */
        
    }
    .floor-two div:nth-child(1){
        border-bottom: 1px solid #ddd;
        /* border-left: 1px solid #ddd; */
        
    }
    .floor-rule{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        background-color: #fff;

    }
    .floor-rule div{
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 10rem;
        border-bottom: 1px solid #ddd;
    }
    .floor-rule div:nth-child(odd){
        border-right: 1px solid #ddd;
    }
    .floor-title{
        text-align: center;
        font-size: 14px;
        height: 1.8rem;
        line-height: 1.8rem;
        background-color: #ddd;
    }
</style>