<template>
    <div>
        <Pwd></Pwd>
        <div class="pwd">
            <mt-field label="原密码*:" placeholder="请输入密码" type="password" v-model="pwd"></mt-field>
            <mt-field label="新密码*:" placeholder="请输入密码" type="password" v-model="new_pwd"></mt-field>
            <mt-field label="确认密码*:" placeholder="请输入密码" type="password" v-model="re_newpwd"></mt-field>
        </div>
       
        <div class="btn">
            <mt-button type="primary" size="large" @click.native="set">修改密码</mt-button>
        </div>
    </div>
</template>

<style scoped>
.pwd>.mint-field{border-top:1px solid #e3e3e3;margin-top: 10px;}
.pwd>.mint-field:last-child{border-bottom: 1px solid #e3e3e3;}
.btn{margin-top: 15px; padding: 0 15px;}
</style>

<script>
import Pwd from '../components/Pwd';
import qs from 'qs'
export default {
    data() {
        return {
            pwd:'',
            new_pwd:'',
            re_newpwd:'',
            flag_1:false,
            flag_2:false,
            flag_3:false
        }
    },
    methods: {
        set(){
            //1.当点击按钮的时候，首先验证格式，看看密码格式是否正确
            let pwdRegExp=/^[0-9a-zA-Z]{6,15}$/
            //如果原密码格式错误，就提示原密码错误
            if(!pwdRegExp.test(this.pwd)){alert("error:原密码错误");this.flag_1=false}else if(this.pwd===this.$store.state.password){this.flag_1=true}
            //如果新输入的密码格式错误，也提醒用户
            if(!pwdRegExp.test(this.new_pwd)){alert("error:新密码格式不正确");this.flag_2=false}else{this.flag_2=true}
            //如果确认密码与新输入的密码不一致，提醒用户
            if(this.new_pwd!==this.re_newpwd){alert("两次密码不一致");this.flag_3=false}else{this.flag_3=true}
            if(this.flag_1 && this.flag_2 && this.flag_3){
                this.axios.post('/user/setpwd',qs.stringify({
                    username:this.$store.state.uname,
                    password:this.$store.state.password,
                    newpwd:this.new_pwd
                }),{header:{"Content-type":"application/x-www-form-urlencoded"}}).then(res=>{
                    console.log(res.data)
                    //如果后台返回1，则说明修改成功，所以当出现时1的时候，我们就需要立刻让用户去登陆界面，再次登录，刷新我们的本地缓存的密码
                    if(res.data===1){
                        alert("修改成功")
                        this.$router.push('/login')
                    }
                })
            }else{
                alert("请再次检查您的密码")
                this.pwd='';this.re_newpwd='';this.new_pwd=''
            }
        }
    },
    components:{
        Pwd
    }
}
</script>