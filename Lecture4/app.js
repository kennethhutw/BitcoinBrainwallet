var express = require("express");
var app = express();
var http = require("http");
var request = require("request");

var bodyparser =require("body-parser");


app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(bodyparser.json());



app.get("/", function(req, res){
    res.sendFile(__dirname +"/index.html");
});

app.post("/wallet", function(req,res){
    var brainsrc = req.body.brainsrc;
    console.log(brainsrc);
    res.send("complete "+ brainsrc );
});


app.listen(3000, function(){
    console.log("work");
})