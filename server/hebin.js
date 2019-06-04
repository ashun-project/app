
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ashun666',
    database: 'xinba'
});
var arrb = ['wumavideo', 'zipaivideo', 'oumeivideo', 'lingleivideo', 'dongmanvideo', 'sanjivideo', 'youmavideo']
// for(var i = 0; i < arrb.length; i++) {
    var sql2 = "INSERT INTO list_data(create_time, url, title, img, type, video) VALUES ?";
    var sql = 'SELECT * FROM ' + arrb[6];
   
    pool.getConnection(function (err, conn) {
        if (err) console.log("POOL ==> " + err);
        conn.query(sql, function (err, result) {
            
            var values = [];
            for (var k = 0; k < result.length; k++) {
                values.push([result[k].create_time, result[k].url, result[k].title, result[k].img, result[k].type, result[k].video]);
            }
            conn.query(sql2, [values], function (err, rows, fields) {
                console.log(11, err)
                conn.release();
            });
        });
    })
// }