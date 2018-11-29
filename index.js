var express = require('express');
var cors = require("cors");
var app = express();
app.use(cors());
app.options('*', cors());
app.use(express.static(__dirname + '/public')); //__dir and not _dir
var port = 8000; // you can use any port
app.listen(port);
console.log('server on' + port);