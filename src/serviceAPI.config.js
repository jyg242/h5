const BASEURL = 'https://www.easy-mock.com/mock/5be0f1b11fcfde1854a917b6/'
const LOACLURL = 'http://loaclhost:3000/'
const URL = {
        getShopingMallinfo: BASEURL + 'h5',
        getGoodsInfo: BASEURL + 'getGoodsInfo',
        registerUser: LOACLURL + 'user/register',
        getDetailGoodsInfo: LOACLURL + 'goods/getDetailGoodsInfo' //获取商品详情
    }
    // module.exports = URL
export default URL