var express = require('express');
var app = express();
var http = require("http");
var request = require('request');


request({
    url: 'https://api.blockchain.info/stats',
    json: true
}, function (error, response, body) {
    console.log(body.market_price_usd);
    btcPrice = body.market_price_usd;
    btcBlocks = body.blocks_size;
});

app.get("/", function (req, res) {
    res.send("Bicoin to the moon:  " + btcPrice);

});
app.get("/block", function (req, res) {
    res.send("Current blocks:  " + btcBlocks);
});

app.listen(8080, function () {
    console.log("go");
});