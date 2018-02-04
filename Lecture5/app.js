var express = require("express");
var app = express();
var http = require("http");
var request = require("request");

var bodyparser =require("body-parser");
var bitcore = require("bitcore-lib");

app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(bodyparser.json());



app.get("/", function(req, res){
    res.sendFile(__dirname +"/index.html");
});

app.post("/wallet", function(req,res){
    var brainsrc = req.body.brainsrc;
    var input = new Buffer(brainsrc);
    var hash = bitcore.crypto.Hash.sha256(input);
    var bn = bitcore.crypto.BN.fromBuffer(hash);
    var pk = new bitcore.PrivateKey(bn).toWIF();
    var addy = new bitcore.PrivateKey(bn).toAddress();
    console.log(brainsrc);
    res.send("The  Brain Wallet of "+ brainsrc +"<br> Addy : " +addy+"<br> Private Key : " +pk);
});


app.listen(3000, function(){
    console.log("work");
})