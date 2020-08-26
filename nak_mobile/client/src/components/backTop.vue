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
    width: 1.25rem;height: 1.25rem;
    background-image: url("../assets/totop.png");
    background-repeat: no-repeat;
    background-position:center;
}   
 .toTop{
     width: 1.25rem;height: 1.25rem;
     background-color:rgb(125,125,125,0.2);
     box-shadow: 0 0 0.625rem gray;
    position: fixed;
     z-index: 1;
    bottom: 6.25rem;right: 1.25rem;
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