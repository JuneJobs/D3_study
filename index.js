
var _webPort = 8080; 
var _path = __dirname + '/';
var express = require("express");
global.app = express();
global.router = express.Router(); //라우터 객체 생성

app.use("/", router);

var allowCORS = function (req, res, next) {
    res.header('Acess-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    (req.method === 'OPTIONS') ?
        res.send(200) :
        next();
};

app.listen(_webPort, function () {
    console.log("The server is running 8080");
   
});
app.use('/', express.static(__dirname + "/")); //뷰의 스크립트가 따로 동작 할 수 있도록 셋팅
app.use('/data', express.static(__dirname + "/")); //뷰의 스크립트가 따로 동작 할 수 있도록 셋팅

app.get("/", function (req, res) {
    res.sendFile("index.html", { 'root': _path });
});
app.get("/data/buildings.json", function (req, res) {
    res.sendFile("./js/data/buildings.json", { 'root': _path });
    console.log("file sent");
});