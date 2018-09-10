var express = require('express')
var app = express();
var path = require('path');
// var mysql = require('mysql');
// var pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'ashun666',
//     database: 'vip'
// });
// router.post('/api/getAllList', function (req, res) {
//     var sql = 'SELECT * FROM ' + req.body.title + 'list';
//     pool.getConnection(function (err, conn) {
//         if (err) console.log("POOL ==> " + err);
//         conn.query(sql, function (err, result) {
//             if (err) {
//                 console.log('[SELECT ERROR] - ', err.message);
//                 res.send('error');
//             } else {
//                 res.json(result);
//             }
//             conn.release();
//         });
//     })
// })
// router.post('/api/getList', function (req, res) {
//     // console.log(html)
//     var currentIp = getIp(req)
//     console.log('getList----' + req.body.title + '=====', currentIp)
//     if (currentIp.indexOf('195.201.218.75') > -1) {
//         // console.log('getList----',currentIp)
//         // res.send('who are you');
//         // return;
//     }
//     var limit = ((req.body.current - 1) * 20) + ',' + 20;
//     var sql = 'SELECT * FROM ' + req.body.title + 'list order by createTime desc limit ' + limit;
//     var count = 'SELECT COUNT(*) FROM ' + req.body.title + 'list';
//     pool.getConnection(function (err, conn) {
//         if (err) console.log("POOL ==> " + err);
//         conn.query(sql, function (err, result) {
//             if (err) {
//                 console.log('[SELECT ERROR] - ', err.message);
//                 res.send('error');
//                 conn.release();
//             } else {
//                 // res.json({total:21, data:result});
//                 conn.query(count, function (err, num) {
//                     if (err) {
//                         res.send('error');
//                     } else {
//                         var arr = result.map(item => {
//                             return {
//                                 id: item.createTime,
//                                 title: item.title,
//                                 img: item.img
//                             }
//                         })
//                         res.json({
//                             total: num[0]['COUNT(*)'],
//                             list: arr
//                         });
//                     }
//                     conn.release();
//                 })
//             }
//         });
//     })
// })

app.set('view engine','jade');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req,res) {
    // var sql = 'SELECT * FROM sanjilist WHERE title like "%三%"';
    // pool.getConnection(function (err, conn) {
    //     if (err) console.log("POOL ==> " + err);
    //     conn.query(sql, function (err, result) {
    //         if (err) {
    //             console.log('[SELECT ERROR] - ', err.message);
    //             // res.send('error');
    //         } else {
    //             // res.json(result);
    //             console.log(result, '====')
    //         }
    //         conn.release();
    //     });
    // })
    res.render('index',{pageTitle:'使用示例',layout:false});
});
app.get('/login', function(req,res) {
    res.render('login',{pageTitle:'登入',layout:false});
});
app.get('/logined', function(req,res) {
    console.log(req.body,req.params, req.query, '==========')
    res.render('logined',{pageTitle:'登入',layout:false});
});
app.post('/register', function(req,res) {
    res.render('register',{pageTitle:'注册',layout:false});
});
app.get('/list/:page/',function(req,res){
    var pageInfo = {
        page:+req.params.page,
        total:20,
        lists:[
            {
                id:'1',
                imgUrl:'https://img.hostla.top/uploadfl/portal/20180116/af890c47d49f9c46fe1c11453be84a7d.jpg',
                title:' 【在线】18.1.13 蓝兔子 ',
                url:'https://51xiaoluoli.site/',
                time:'14小时前',
            },
            {
                id:'2',
                imgUrl:'https://img.hostla.top/uploadfl/portal/20180116/74bd0346673465cbbf1aee7c271d7883.jpg',
                title:'  [在线]极品大胸美模惜萍酒店私拍第2弹1080P高清无水印 ',
                url:'https://51xiaoluoli.site/',
                time:'14小时前'
            },
        ]
    };
    res.render('list',{pageTitle:'列表',pageInfo:pageInfo,layout:false});
})
app.get('/:id',function(req,res){
    var detailInfo ={
        title:'【在线】18.1.13 蓝兔子 ',
        category:'在线视频',
        time:'2018-9-7',
        src:'https://mp.xiaojiejie99.top/uploads/5dPrUy8B7mWJX3sSpivxCv29rULVBA/2018011622245274848950.mp4'
    };
    res.render('detail',{pageTitle:'详情',detailInfo:detailInfo,layout:false});
})
app.listen(1337);