<template>
    <div class="shopcar">
        <MyHeader></MyHeader>
        <div v-if="this.$store.state.car.length>=1">
        <div class="head-box">
            <p>共{{this.$store.state.car.length}}种商品，总价(不含运费)<span style="color:orange;font-size:16px;font-weight:600">￥{{total.toFixed(2)}}元</span> </p>
        </div>
        <div class="shopList">
            <ul>
                <li v-for="(i,k) in this.$store.state.car" :key="k">
                    <div class="pro-main">
                        <div class="pro-image">
                            <img :src="i.purl" alt="">
                        </div>
                        <div class="pro-info">
                            <dd class="name">{{i.pname}}</dd>
                            <dd class="price">￥{{i.price.toFixed(2)}}元</dd>
                        </div>
                    </div>
                    <div class="add">
                        购买数量 <button @click="minus(i)">-</button><input :value="i.addCount"  readonly/><button @click="add(i)">+</button>
                        <div class="dele"><button @click="remove(i)">删除</button></div>
                    </div>
                </li>
            </ul>
            <div class="resolve">
                <mt-button  type="primary" size="large">立即结算</mt-button>
            </div>
        </div>
        </div>
        <div v-else>
            <div class="empty">
                <img src="../assets/icons/gwc.png" alt="">
            </div>
            <p style="text-align:center;font-size:25px;color:#555555;margin:10px 0">当前购物车为空</p>
            <div style="padding:0 15px"><mt-button type="primary" size="large" @click.native="toIndex">添加商品</mt-button></div>
        </div>
    </div>
</template>

<style scopred>
.empty img{width: 60%;margin: 0 auto;text-align: center;}
.resolve{padding:20px 15px;}
.empty{display: flex;justify-content: center;}
.pro-info>.price{font-size:14px;color:orange}
.pro-info>.name{color:#555555;margin-bottom: 30px;}
.add>.dele{float: right;}
.add>input{box-sizing: border-box;padding-left: 10px;width:35px;height: 28px;border: 1px solid #efefef;}
.add>.dele>button{border: 1px solid #e3e3e3;height: 32px;}
.add>button{width: 30px;height: 30px;border: 0;}
.add{margin: 10px;}
.pro-info{box-sizing: border-box;flex:75;height: 96px;}
.pro-image{box-sizing: border-box;padding:5px;flex:25;}
.pro-image>img{width: 100%;}
.pro-main{display: flex;box-sizing: border-box;padding: 5px;}
.shopcar{background-color:#f7f7f7;}
.shopList>ul>li{border:1px solid #e3e3e3;box-sizing: border-box;width: 100%;background-color: #fff;height: auto;}
.head-box{box-sizing: border-box;height: 30px;background-color: #f7f7f7;padding-left: 10px;color: #559;font-size: 14px;line-height: 30px;}
</style>
<script>
import MyHeader from '../components/my-header'
export default {
    data() {
        return {count:1, }
    },
    created() {     
    },
    methods: {
        toIndex(){
         this.$router.push('/')
        },
        remove(i){ 
        let removeStr ="您确定删除该商品吗？"
        if(confirm(removeStr)==true){
             this.$store.state.car= this.$store.state.car.filter((item)=>{
            return item !=i;
           })
            //获取到最新的一个对象
            localStorage.setItem('car',JSON.stringify(this.$store.state.car))
            //将移除之后的数据重新赋值给 store商店 里面的 car数组，以后取得时候，就会得到修改之后的car数组
            this.$store.state.car= this.$store.state.car
        }
        },
        minus(i){
            if(i.addCount>1){
                i.addCount--;
                console.log(i)
            }
        },
        add(i){
            i.addCount++;
        }
    },
    computed: {
        total(){
            let sum = 0;
            for(let i of this.$store.state.car){
                sum += i.price * i.addCount;
            }
            return sum;
        }
    },
    components:{
        MyHeader
    }
}
</script>