const express=require('express');
const router=express.Router();
const pool=require('../pool/pool.js');
const { error } = require('console');

// 根据商品id检索商品详细信息
router.get('/details',(req,res)=>{
	let $obj=req.query;
    let $id=$obj.id
	let sql="select id,pname,pnumber,pprice,purl,pdetails,ptype,pishas,smallPic,sellCount from products where id = ?";
	pool.query(sql,[$id],(err,s)=>{
	if(err)throw err;
	if(s.length>0){
		res.send(s);
	}else{
		res.send("0");
	}
	})
})
//导出路由
module.exports=router;