const express = require('express')
const router = express.Router();
const pool = require('../pool/pool.js');

//插入收货信息
router.post('/add', (req, res) => {
    let info = req.body;
    info.userId = parseInt(info.userId)
    // console.log(info)
    pool.query('INSERT INTO addr SET ?', [info], (err, s) => {
        if (err) throw err
        if (s.affectedRows > 0) {
            res.send("1")
        } else {
            res.send("0")
        }
    })
});
//获取当前用户输入过的地址信息
router.get('/watch', (req, res) => {
    let userId = req.query.userId;
    // console.log(userId)
    pool.query('select * from addr where userId =?', [userId], (err, s) => {
        res.send(s)
    })

})

module.exports = router;