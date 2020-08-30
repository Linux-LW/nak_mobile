<template>
    <div>
        <MyHeader :title="title" />
    </div>
</template>
<script>
import MyHeader from '../components/my-header'
export default {
    data() {
        return {
            title:'我的订单'
        }
    },
    components:{
        MyHeader
    }
}
</script>