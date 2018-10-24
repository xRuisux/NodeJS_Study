var request = require('request');
var cheerio = require('cheerio');
var $ = cheerio.load(html);
var url = "http://www.ifpe.edu.br/noticias";

request(url, function(err, response, html){
    if (!err) {
        
        var allItens = $("#content-core").children();
        var noticias = [];
        allItens.each(function (index) {
            noticias.push($("#content-core").children().eq(index).children().eq(2).find("a.tileContent").text());

        });
        console.log(noticias)
    }
});