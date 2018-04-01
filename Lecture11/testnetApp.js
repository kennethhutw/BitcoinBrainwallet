var bitcore = require('bitcore-lib');
var Insight = require('bitcore-explorers').Insight;

var value = new Buffer("This is a way to generate an address from a sentence");
var hash = bitcore.crypto.Hash.sha256(value);
var bn = bitcore.crypto.BN.fromBuffer(hash);
var privateKey = new bitcore.PrivateKey(bn,"testnet");
var address = new bitcore.PrivateKey(bn,"testnet").toAddress();
console.log("address : " + address);

console.log("Address : " + address);

var value1 = new Buffer("This is a dangerous way to generate an address from a sentence");
var hash1 = bitcore.crypto.Hash.sha256(value1);
var bn1 = bitcore.crypto.BN.fromBuffer(hash1);
var address1 = new bitcore.PrivateKey(bn1,"testnet").toAddress();

console.log("Address1 : " + address1);

var insight = new Insight('testnet');

insight.getUnspentUtxos(address, function (err, utxos){
    if(err)
    {
        console.log("err : " + err);
    }else{
        console.log("utxos : " + utxos);
        var tx = bitcore.Transaction();
        tx.from(utxos);
        tx.to(address1,10000);
        tx.change(address);
        tx.fee(50000);
        tx.sign(privateKey);
        tx.serialize();

        insight.broadcast(tx.toString(), function (error, returnedTxId){

            if(error)
            {
                console.log("error : " + error);
            }else{
                console.log("returnedTxId : " + returnedTxId);
            }
        })
    }
})