var request = require('request');
var cheerio = require('cheerio');
// var mongo = require('mongodb').MongoClient;
var url = "http://www.ifpe.edu.br/noticias";
var $ = cheerio.load(html);


request(url, function(err, response, html){
    if (!err) {
        
        var allItens = $("#content-core").children();
        var noticias = [];
        allItens.each(function (index) {
            noticias.push($("#content-core").children().eq(index).children().eq(2).find("a.tileContent").text());

        });
        mongo.connect('mongodb://localhost:27017/',function (err, db) {  
            var dbo = db.db('mydb');
            dbo.collection('noticias').insertMany(noticias, function (err, res) {
                console.log('foi');
                db.close();
            })
            
        })
        console.log(noticias)
    }
});