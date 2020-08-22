set names utf8;

drop database if exists nak;

create database nak charset=utf8;

use nak;


create table users(
	
	id int primary key auto_increment,
	nid int unique,
	uname varchar(10) unique,
	upwd char(10),
	uphone char(11),
	uemail char(30),
	ustatus tinyint
);
insert into users values(null,1,"李四","123456",13609007045,"154861@qq.com",0);
insert into users values(null,2,"张三","123457",13608007045,"254861@qq.com",0);
insert into users values(null,3,"王五","123458",13607007045,"354861@qq.com",0);
insert into users values(null,4,"赵六","123459",13606007045,"454861@qq.com",0);

create table products(
	id int primary key auto_increment,
	pnumber char(10) unique,
	pname char(30),
	pprice decimal(5,2),
	purl char(255),
	pdetails char(255),
	ptype char(10),
	pishas tinyint,
	smallPic char(255),
	sellCount int
);
insert into products values(null,"DBS000005","邂逅—玫瑰曲奇","12.80","http://localhost:3001/img/cookie1.png","http://localhost:3001/img/c-details1.png","曲奇",1,'http://localhost:3001/img/c1-sm1.png|http://localhost:3001/img/c1-sm2.png|http://localhost:3001/img/c1-sm3.png',14),
(null,"DBS000004","邂逅-蓝越莓曲奇","22.80","http://localhost:3001/img/cookie2.png","http://localhost:3001/img/c-details2.png","曲奇",1,'http://localhost:3001/img/c2-sm1.png|http://localhost:3001/img/c2-sm2.png|http://localhost:3001/img/c2-sm3.png',15),
(null,"DBS000003","巧逢—巧克力杏仁曲奇","32.80","http://localhost:3001/img/cookie3.png","http://localhost:3001/img/c-details3.png","曲奇",1,'http://localhost:3001/img/c3-sm1.png|http://localhost:3001/img/c3-sm2.png',18),

(null,"DBS000002","有点黄—咸蛋曲奇","15.80","http://localhost:3001/img/cookie4.png","http://localhost:3001/img/c-details4.png","曲奇",1,'http://localhost:3001/img/c4-sm1.png|http://localhost:3001/img/c4-sm2.png|http://localhost:3001/img/c4-sm3.png',13),
(null,"DBS000010","椰蓉肉松餐包","18.80","http://localhost:3001/img/bread1.png","http://localhost:3001/img/b-details1.png","面包",1,'http://localhost:3001/img/b1-sm1.png|http://localhost:3001/img/b1-sm2.png|http://localhost:3001/img/b1-sm3.png',17),
(null,"DBS000009","提子豆沙切片面包","12.80","http://localhost:3001/img/bread2.png","http://localhost:3001/img/b-details2.png","面包",1,'http://localhost:3001/img/b2-sm1.png|http://localhost:3001/img/b2-sm2.png|http://localhost:3001/img/b2-sm3.png',16),
(null,"DBS000008","胡萝卜棒面包","12.80","http://localhost:3001/img/bread3.png","http://localhost:3001/img/b-details3.png","面包",1,'http://localhost:3001/img/b3-sm1.png|http://localhost:3001/img/b3-sm2.png',18),
(null,"DBS000007","长条餐包","12.80","http://localhost:3001/img/bread4.png","http://localhost:3001/img/b-details4.png","面包",1,'http://localhost:3001/img/b4-sm1.png|http://localhost:3001/img/b4-sm2.png',05),
(null,"DBS000011","巧克力提子卷","12.80","http://localhost:3001/img/cake.png","http://localhost:3001/img/cake_details.png","蛋糕",1,'http://localhost:3001/img/cake-sm1.png|http://localhost:3001/img/cake-sm2.png',03),
(null,"DBS000013","油沙沙咸鸭蛋礼盒","89.00","http://localhost:3001/img/gift1.png","http://localhost:3001/img/gift-details1.png","礼盒",1,'http://localhost:3001/img/g1-sm1.png|http://localhost:3001/img/g1-sm2.png',04),
(null,"DBS000012","经典黄油曲奇礼盒","19.80","http://localhost:3001/img/gift2.png","http://localhost:3001/img/gift-details2.png","礼盒",1,'http://localhost:3001/img/g2-sm1.png|http://localhost:3001/img/g2-sm2.png',11),
(null,"DBS000015","可口酥条","12.80","http://localhost:3001/img/flaky1.png","http://localhost:3001/img/f-details1.png","酥饼",1,'http://localhost:3001/img/f1-sm1.png|http://localhost:3001/img/f1-sm2.png',13),
(null,"DBS000014","缤纷水果酥","12.80","http://localhost:3001/img/flaky2.png","http://localhost:3001/img/f-details2.png","酥饼",1,'http://localhost:3001/img/f2-sm1.png|http://localhost:3001/img/f2-sm2.png',25),


(null,"DBS001005","邂逅—玫瑰曲奇","13.80","http://localhost:3001/img/cookie1.png","http://localhost:3001/img/c-details1.png","曲奇",1,'http://localhost:3001/img/c1-sm1.png|http://localhost:3001/img/c1-sm2.png|http://localhost:3001/img/c1-sm3.png',28),
(null,"DBS004004","邂逅-蓝越莓曲奇","18.80","http://localhost:3001/img/cookie2.png","http://localhost:3001/img/c-details2.png","曲奇",1,'http://localhost:3001/img/c2-sm1.png|http://localhost:3001/img/c2-sm2.png|http://localhost:3001/img/c2-sm3.png',17),
(null,"DBS000503","巧逢—巧克力杏仁曲奇","32.80","http://localhost:3001/img/cookie3.png","http://localhost:3001/img/c-details3.png","曲奇",1,'http://localhost:3001/img/c3-sm1.png|http://localhost:3001/img/c3-sm2.png',25),
(null,"DBS100005","邂逅—玫瑰曲奇","72.80","http://localhost:3001/img/cookie1.png","http://localhost:3001/img/c-details1.png","曲奇",1,'http://localhost:3001/img/c1-sm1.png|http://localhost:3001/img/c1-sm2.png|http://localhost:3001/img/c1-sm3.png',34),
(null,"DBS000024","邂逅-蓝越莓曲奇","52.80","http://localhost:3001/img/cookie2.png","http://localhost:3001/img/c-details2.png","曲奇",1,'http://localhost:3001/img/c2-sm1.png|http://localhost:3001/img/c2-sm2.png|http://localhost:3001/img/c2-sm3.png',84),
(null,"DBS000203","巧逢—巧克力杏仁曲奇","12.80","http://localhost:3001/img/cookie3.png","http://localhost:3001/img/c-details3.png","曲奇",1,'http://localhost:3001/img/c3-sm1.png|http://localhost:3001/img/c3-sm2.png',14),
(null,"DBS070005","邂逅—玫瑰曲奇","18.80","http://localhost:3001/img/cookie1.png","http://localhost:3001/img/c-details1.png","曲奇",1,'http://localhost:3001/img/c1-sm1.png|http://localhost:3001/img/c1-sm2.png|http://localhost:3001/img/c1-sm3.png',64),
(null,"DBS090004","邂逅-蓝越莓曲奇","32.80","http://localhost:3001/img/cookie2.png","http://localhost:3001/img/c-details2.png","曲奇",1,'http://localhost:3001/img/c2-sm1.png|http://localhost:3001/img/c2-sm2.png|http://localhost:3001/img/c2-sm3.png',74),
(null,"DBS080003","巧逢—巧克力杏仁曲奇","12.80","http://localhost:3001/img/cookie3.png","http://localhost:3001/img/c-details3.png","曲奇",1,'http://localhost:3001/img/c3-sm1.png|http://localhost:3001/img/c3-sm2.png',44);
