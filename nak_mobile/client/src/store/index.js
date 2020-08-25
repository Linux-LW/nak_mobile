import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uname:localStorage.getItem("uname")||'',
    car:JSON.parse(localStorage.getItem('car')) || [],
    uid:localStorage.getItem("uid")||'',
    password:localStorage.getItem("upwd")||''
  },
  mutations: {
    setUname(state,uname){
      state.uname =uname
    },
   setUpwd(state,password){
    state.password=password
   },
    addToCart(state,goodInfo){
      let flag =false;
      state.car.forEach(item => {
        if(item.pid==goodInfo.pid){
          item.addCount += parseInt(goodInfo.addCount)
          flag=true;
          return true
        }
      });
      if(flag==false){
        state.car.push(goodInfo) 
       };
      localStorage.setItem("car",JSON.stringify(state.car))
    }
  },
  actions: {
    submit(context,user){
      Axios.post('/user/login',`username=${user.username}&password=${user.password}`).then(res=>{
        // console.log(res.data)
        // console.log(res.data.result.uphone)
        
     if(res.data!=0){
       //! 说明有数据返回，那么我就把这个用户的姓名保存在state里面
      context.commit('setUname',res.data.result.uname);
      context.commit('setUpwd',res.data.result.upwd);
      localStorage.setItem("uid",res.data.result.id)
      
       router.push('/');
     }else{
       alert("登陆失败，请检查用户名或密码")
     }
      })
    }
  },
  modules: {
  }
})
