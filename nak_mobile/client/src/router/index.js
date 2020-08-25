import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

  const routes = [
 {
   path:'/',
   name:'Index',
   component:()=>import('../views/index.vue')
 },
 {
   path:'/class',
   name:'Class',
   component:()=>import('../views/class.vue'),
 
 },
 {
   path:'/products/:ptype',
   name:'Products',
   component:()=>import('../views/products.vue'),
   props:true
 },
 {
   path:'/search',
   name:'Search',
   component:()=>import('../views/search.vue')
 },
 {
   path:'/details/:id',
   name:'Details',
   component:()=>import('../views/details.vue'),
   props:true
 },
 {
   path:'/login',
   name:'Login',
   component:()=>import('../views/login.vue')
 },{
   path:'/regist',
   name:'Regist',
   component:()=>import('../views/regist.vue')
 },
 {
   path:'/self',
   name:'Self',
   component:()=>import('../views/self.vue')
 },
 {
   path:'/cart',
   name:'Cart',
   component:()=>import('../views/cart.vue')
 },
 {
  path:'/setpwd',
  name:'SetPwd',
  component:()=>import('../views/setpwd.vue')
 },
 {
   path:'/position',
   name:'Position',
   component:()=>import('../views/position.vue')
 },
 {
   path:"/addAddress",
   component:()=>import('../views/addAddress.vue')
 }
]

const router = new VueRouter({
  routes
})

export default router
