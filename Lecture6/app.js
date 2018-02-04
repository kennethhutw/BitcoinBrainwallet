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

app.set("view engine","ejs");

var price=0;

request({
    url:"https://api.coinmarketcap.com/v1/ticker/bitcoin/",
    json:true
},function(err, res, body){
   price = body[0].price_usd;
   console.log(price);
});

app.get("/", function(req, res){
    console.log(price);
    res.render("index",{lastPrice: price});
});
app.get("/wallet", function(req, res){
    console.log("wallet");
    res.render("wallet",{lastPrice: price});
});
app.get("/converter", function(req, res){
    console.log("converter");
    res.render("converter",{lastPrice: price});
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