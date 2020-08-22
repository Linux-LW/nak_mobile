const express=require('express');
const pool=require('../pool/pool.js');
const { route } = require('./details.js');
const router =express.Router();

const queryString= express('queryString')

//用户名查重验证
router.get('/check',(req,res)=>{
    let uname =req.query.uname;
    pool.query(`select uname from users where uname='${uname}'`,(err,s)=>{
        if(err) throw err;
        //如果查询到相同的用户名，那么
         if(s.length>0){
             //返回一个1.表示该用户名已经存在
             res.send('1')
         }else{//否则
            res.send('0') //返回0，表示没有
         } 
    })
});

//用户注册提交数据到数据库保存
router.post('/regist',(req,res)=>{
    let obj =req.body
    pool.query('insert into users set ?',[obj],(err,result)=>{
        if(err)throw err;
        if(result.affectedRows>0){
            res.send({code:'200',message:'success',result:result})
        }else{
            res.send({code:'401',message:'defail',result:'0'})
        }
    })
});

//用户登录接口
router.post('/login',(req,res)=>{
    let $name=req.body.username;
    let $pwd=req.body.password;
    // console.log(req.body);
    let sql ='select id,uname,upwd from users where uname=? and upwd=?';
    pool.query(sql,[$name,$pwd],(err,result)=>{
        if(result.length>0){
            // console.log(result)
            res.send({code:'200',message:'Ok',result:result[0]})
        }else{
            res.send('0')
        }
    })
});
// 修改用户密码接口
router.post('/setpwd',(req,res)=>{
    let obj =req.body;
    console.log(obj)
    pool.query('select * from users where uname=? and upwd=?',[obj.username,obj.password],(err,s)=>{
        if(s.length>0){
            pool.query('update users set upwd =? where uname=?',[obj.newpwd,obj.username],(err,result)=>{
                if(result.affectedRows>0){
                    res.send("1")
                }else{
                    res.send("0")
                }
            })
        }else{
            res.send({code:'400',message:'error',result:'修改失败'})
        }
    })
})
module.exports=router;