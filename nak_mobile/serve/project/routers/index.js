const express=require('express');
const router=express.Router();
const pool=require('../pool/pool.js');
const { error } = require('console');

router.get('/index',(req,res)=>{
	let page =parseInt(req.query.page);
	let pageSize = 5;
	let offset =(page-1)*pageSize
	pool.query('select count(id) as count from products',(err,result)=>{
		//? 获取总共有多少条数据
		let rowCount =result[0].count
	//! 通过计算获取一共需要返回多少页到前台做循环
	let pageCount =Math.ceil(rowCount/pageSize)
		pool.query(`select id,pname,purl,sellCount,pprice from products order by sellCount desc limit ${offset},${pageSize}`,(err,s)=>{
			// console.log(s)
			res.send({result:s,pageCount:pageCount})
		})
	})

})
// 获取指定id的商品信息
router.get('/details',(req,res)=>{
	let obj=req.query;
	let $pid=obj.id;
	// console.log(obj)
	pool.query('select * from products where id=?',[$pid],(err,s)=>{
		res.send(s)
	})
})

//导出路由
module.exports=router;