const express=require('express');
const router=express.Router();
const pool=require('../pool/pool.js');
const { error } = require('console');

// 根据商品类型检索商品
router.get('/search',(req,res)=>{
	let $obj=req.query;
	// console.log(req.query)
	let $ptype=$obj.ptype;
		pool.query(`select * from products where ptype like '%${$ptype}%' or pname like '%${$ptype}%'`,(err,s)=>{
			if(err) throw err
			res.send({result:s})
		})
})
// 获取相关商品信息，只要用户一点击某个商品，就查找出与之相关的其他商品，显示到对应页面位置
router.get('/relative',(req,res)=>{
	let type=req.query.ptype;
	pool.query(`select * from products where ptype like '%${type}%'`,(err,result)=>{
		if(err) throw err;
		res.send(result)
	})
})
//获取不同的商品的类型
router.get('/diffrent',(req,res)=>{
	let sql ='select distinct ptype from products';
	pool.query(sql,(err,s)=>{
		if(err) throw err;
		res.send(s)
	})
})

//根据传入的方式进行排序然后分发给前端
router.get('/ascBy',(req,res)=>{
	let obj = req.query;
	let $ptype=obj.ptype;
	let $keyword=obj.kw;
	// console.log($keyword)
	switch($keyword){
		case '1':
		$keyword='pprice'
		break;
		case '2':
		$keyword='sellCount'
		break;
		default:
		$keyword = 'pname'
	}
	let sql =`select * from products where ptype='${$ptype}' order by ${$keyword} asc`;
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		// console.log(result)
		res.send(result)
	})

})
//导出路由
module.exports=router;