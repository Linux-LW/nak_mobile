const express =require('express');
const indexRouter =require('./routers/index.js');
const productRouter=require('./routers/product.js');
const detailsRouter=require('./routers/details.js');
const userRouter=require('./routers/user.js')
const app =express();

const cors = require('cors');  //引入cors模块
const bodyParser =require('body-parser');

app.use(cors({
    origin:'*'  //设置所有的域名都可以访问
}))

app.listen(3001,err => {
    if(err) throw err
    console.log("启动成功")
})

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
	extended:false
}))
//加上首页的前缀
app.use('/index',indexRouter);
app.use('/pro',productRouter);
app.use('/de',detailsRouter);
app.use('/user',userRouter);
