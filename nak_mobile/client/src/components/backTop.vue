<template>
    <div class="toTop hide" :class="{active:distance}" @scroll="scrollEvent">
        <a href="#">
        </a>
    </div>
</template>
<style scoped>
.hide{
    display: none;
}
.active{
    display: block;
}
.toTop>a{
    display: block;
    width: 20px;height: 20px;
    background-image: url("../assets/totop.png");
    background-repeat: no-repeat;
    background-position:center;
}   
 .toTop{
     width: 20px;height: 20px;
     background-color:rgb(125,125,125,0.2);
     box-shadow: 0 0 10px gray;
    position: fixed;
     z-index: 1;
    bottom: 100px;right: 20px;
    }
</style>

<script>
export default {
    data() {
        return {
            distance:false
        }
    },
    mounted() {
        window.addEventListener('scroll',this.scrollEvent)
    },
    methods: {
    scrollEvent(e){
      var scrollTop = e.target.documentElement.scrollTop || e.target.body.scrollTop;
      if(scrollTop>20){
        this.distance=true
     }else{
       this.distance=false
     }
    }
    }
}
</script>