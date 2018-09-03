var express = require('express')
var app = express();
var path = require('path');

app.set('view engine','jade');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req,res) {
    res.render('index',{pageTitle:'使用示例',layout:false});

});
app.listen(1337);