var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ashun666',
    database: 'xinba'
});

router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});

// 公告
var notice = ['下载地址:kp12306help@gmail.com', '广告合作:kp12306help@gmail.com', '邮箱反馈:kp12306help@gmail.com'];

// var menu = [
//     wumavideo,
//     sanjivideo
//     dongmanvideo
//     youmavideo
//     zipaivideo
//     oumeivideo
//     lingleivideo
// ]

function getClientIP(req) {
    return req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
        req.connection.remoteAddress || // 判断 connection 的远程 IP
        req.socket.remoteAddress || // 判断后端的 socket 的 IP
        req.connection.socket.remoteAddress;
};
// 公告接口
router.post('/app/notice', function (req, res) {
    res.json({code: 200, list: notice});
})
// banner接口
router.post('/app/banner', function (req, res) {
    var host = req.headers['host'];
    var banner = [
        {name: '', img: 'http://' + host + '/public/img/1.png', url: ''},
        {name: '', img: 'http://' + host + '/public/img/2.png', url: ''},
        {name: '', img: 'http://' + host + '/public/img/3.png', url: ''}
    ];
    res.json({code: 200, list: banner});
})
// 信息
router.post('/app/info', function (req, res) {
    res.json({code: 200, data: '弹窗显示信息'});
})
// 最新推荐
router.post('/app/news/list', function (req, res) {
    var sql = 'select * from list_data order by create_time desc limit 16';
    
    pool.getConnection(function (err, conn) {
        if (err) console.log("POOL ==> " + err);
        conn.query(sql, function (err, result) {
            res.json({code: 200, list: result || []});
            conn.release();
        })
    })
})
// 列表
router.post('/app/list', function (req, res) {
    var currentReq = Number(req.body.page) || 1;
    var limitBefore = ((currentReq - 1) * 10);
    var sql = 'SELECT * FROM list_data where type = "'+ req.body.type +'" order by create_time desc limit ' + (limitBefore + ',' + 10);
    pool.getConnection(function (err, conn) {
        if (err) console.log("POOL ==> " + err);
        conn.query(sql, function (err, result) {
            res.json({code: 200, list: result || []});
            conn.release();
        })
    })
})
// 详情
router.post('/app/detail', function (req, res) {
    var sql = 'SELECT * FROM list_data where create_time = ' + '"' + req.body.id +'"';
    pool.getConnection(function (err, conn) {
        if (err) console.log("POOL ==> " + err);
        conn.query(sql, function (err, result) {
            var obj = {};
            if (result && result[0]) {
                obj = result[0];
            }
            res.json({code: 200, data: obj});
            conn.release();
        })
    })
})
// 推荐
router.post('/app/recommond', function (req, res) {
    var countSql = 'SELECT COUNT(1) FROM list_data';
    var sql = '';
    var count = 6;
    var reNUm = 0;
    pool.getConnection(function (err, conn) {
        if (err) console.log("POOL ==> " + err);
        conn.query(countSql, function (err1, total) {
            count = (Number(total[0]['COUNT(1)']) || 6) - 6;
            reNUm = Math.floor(Math.random()*(1 - count) + count);//10000
            sql = 'SELECT * FROM list_data order by create_time desc limit ' + (reNUm + ',' + 6);
            conn.query(sql, function (err2, result) {
                res.json({code: 200, list: result || []});
                conn.release();
            })
        })
    })
})
// 搜索
router.post('/app/search', function (req, res) {
    var currentReq = Number(req.body.page) || 1;
    var limitBefore = ((currentReq - 1) * 10);
    var value = req.body.value;
    var sql = 'SELECT * FROM list_data where title like "' +'%'+ value +'%'+ '" order by create_time desc limit ' + (limitBefore + ',' + 10);
    var count = 'SELECT COUNT(1) FROM list_data where title like "' +'%'+ value +'%'+ '"';
    pool.getConnection(function (err, conn) {
        if (err) console.log("POOL ==> " + err);
        conn.query(sql, function (err, result) {
            conn.query(count, function (err, total) {
                res.json({code: 200, list: result || [], total: total[0]['COUNT(1)'] || 0});
                conn.release();
            })
        })
    })
})

// 更新
router.post('/app/update', function (req, res) {
    console.log(req.body)
    res.json({code: 200});
})

module.exports = router;