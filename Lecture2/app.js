
var http = require("http");
var request = require("request");

http.createServer(function (req, res) {
    request({
        url: 'https://api.blockchain.info/stats',
        json: true
    }, function (error, response, body) {
        if(error)
        {
            console.log("error : " + error );
        }
        console.log(response);
        console.log(body.market_price_usd);
        btcPrice = body.market_price_usd;
        btcBlocks = body.blocks_size;
    });
    console.log("hi, I'm a new user");
    res.end("happy ned");
}).listen(80);