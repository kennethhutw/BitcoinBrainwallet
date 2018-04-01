var  express = require("express");
var  app = express();
var  request = require("request");
var  bodyparser = require("body-parser");
var  bitcore = require("bitcore-lib");

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());

app.set("view engine", "ejs");


function brainWallet(uinput, callback){
    var input = new Buffer(uinput);
    var hash = bitcore.crypto.Hash.sha256(input);
    var bn = bitcore.crypto.BN.fromBuffer(hash);
    var pk = new bitcore.PrivateKey(bn).toWIF();
    var addy = new bitcore.PrivateKey(bn).toAddress();
    callback(pk, addy);
};

request({
    url:"https://api.blockchain.info/stats",
    json: true
}, function(error, response, body){
    console.log(body.market_price_usd);
    price = body.market_price_usd;
})

app.get("/", function (req, res){
  //  res.sendFile(__dirname + "/index.html");
  res.render("index",{lastPrice: price});
});

app.get("/brain", function (req, res){
    //  res.sendFile(__dirname + "/index.html");
    res.render("brain",{lastPrice: price});
  });

  app.get("/converter", function (req, res){
    //  res.sendFile(__dirname + "/index.html");
    res.render("converter",{lastPrice: price});
  });

  app.get("/walletInfo", function (req, res){
    //  res.sendFile(__dirname + "/index.html");
    res.render("walletInfo",{lastPrice: price, balance:0, totalReceived: 0 , totalSent:0});
  });
  app.post("/walletInfo", function (req, res){
    var account = req.body.account;
    request({
        url:"https://blockexplorer.com/api/addr/"+ account,
        json: true
    }, function(error, response, body){
        res.render("walletInfo",{lastPrice: price, balance: response.body.balance,
             totalReceived: response.body.totalReceived ,
             totalSent:response.body.totalSent
            });
    })
});
  
app.post("/wallet", function (req, res){
    var brainsrc = req.body.brainsrc;
    console.log("Complete " + brainsrc);
    brainWallet(brainsrc, function(private, address){
        res.send("The Brain wallet of " + brainsrc + "<br> addy : "+ address +"<br> PrivateKey : " + private);
    });
    
});



app.listen(8080 ,function(){
 console.log("go");
});