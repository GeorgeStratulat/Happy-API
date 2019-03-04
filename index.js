var express = require('express');
var cors = require("cors");
const path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var request = require('request');
// var sesiune = "ceva";
var app = express();

app.use(session({secret:"uit2003rasamakalaka", resave:false, saveUninitialized:true}));
var sess;

const router = express.Router();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());



router.get('/',function(req,res){
    // res.status(401).send();
    app.use(express.static(__dirname + '/public')); 

    res.sendFile(path.join(__dirname+'/public/login.html'));
    // while(!(localStorage.getItem("venue_id"))){
    //     console.log("s-a logat");
    // }
    //__dirname : It will resolve to your project folder.
  });


router.post('/login', function(req,res){
    // res.redirect("/index");
    console.log(req.body.session);
    var formResponse = {session: req.body.session};
   

   
req.session.venue_id = req.body.session;
if(req.session.venue_id){
    console.log("sesiune este teoretic: " + req.session.venue_id);
    // session.save();
    sess = req.session.venue_id;
    console.log(JSON.stringify(req.session));
    res.redirect("/index");

}
// return res.status(200).json(formResponse);
});

router.get('/index', function(req,res){
    console.log("intra in get " + JSON.stringify(sess));
    
   if(sess){
       console.log("sesiune este: "+ sess);
       var objSend = {venue_id: sess};
    //   res.json({venue_id: sess});
    // res.send(objSend);
    //   res.render('index', { data: JSON.stringify(objSend) });
   res.sendFile(path.resolve(__dirname+'/public/index.html'));

   }else
    {return res.status(401).send();}
// console.log(__dirname+'/public/index.html');
// res.redirect("/redirect");
// res.json({venue_id: sess});
// res.sendFile(path.resolve(__dirname+'/public/index.html'));
});

router.get("/getVenueId", function(req, res){
    console.log(sess);
    var objSend = {venue_id: sess};
    res.send(objSend);
})

router.get("/redirect", function(req, res){
    console.log("a mers redirectu cred");
    res.sendFile(path.resolve(__dirname+'/public/index.html'));

})

// app.use(express.static(__dirname + '/public')); 
app.use('/', router);
app.listen(process.env.port || 8000);

console.log('server on launched');