const rp = require('request');
const cheerio = require('cheerio');
const MongoClient = require('mongodb').MongoClient;
const urlMongo = "mongodb://localhost:27017/";

const Crawler = () => {

    const execute = async () => {
        // const options = {
        //     url: `http://www.ifpe.edu.br/noticias`
        // };

        // try {
        //     const body = await rp(options);

        //     const $ = cheerio.load(body); 
        //     let array = [];
        //     let news = [];

        //     $('#content-core').each((i, element) => {
        //         let newsElement = {}; 
        //         newsElement.titulo = $(element).text().trim();
        //         newsElement.id = i;            
        //         // console.log(newsElement.titulo);
        //         news.push(newsElement);
        //     });     

        //     let jsonObj = {};
        //     let test = [];

        //     for (var i = 0 ; i < array.length; i++) {
        //         jsonObj[(i)] = array[i];
        //         test.push(jsonObj);
        //         jsonObj = {};
        //     }

        //     console.log(news);

        //     MongoClient.connect(urlMongo, function (err, db) { 
        //         dbo.collection('noticias').insertMany(news, function (err, res) {
        //             // console.log("Numero de noticias inseridas: " + res.insertedCount);
        //             db.close();
        //         });       
        //     });

        // } catch (err) {
            
        rp(`https://www.kabum.com.br/perifericos/teclado-mouse/teclado-gamer`, function(err,response,body) {
    
            var $ = cheerio.load(body); 
            var array = [];
            var news = [];
            
            $('div.listagem-box').each((i, element) => {
                let newsElement = {}; 
                newsElement.titulo = $(element).find('span.H-titulo').text().replace(/[\n]/g, '').trim();
                newsElement.body = $(element).find('div.listagem-precoavista').text().trim();
                newsElement.logo = $($(element).find('listagem-marca_avaliacao-img'));
                                // newsElement.date = $($(element).find('.summary-view-icon')[0]).text().replace(/[\n]/g, '').trim();
                // newsElement.hour = $(element).find('.summary-view-icon')[1].text().replace(/[\n]/g, '').trim();
                // newsElement.type = $(element).find('.summary-view-icon')[2].text().replace(/[\n]/g, '').trim();

                newsElement.id = i;            

                console.log(newsElement);
                news.push(newsElement);
            });     
            
            // var jsonObj = {};
            // var test = [];
            // for (var i = 0 ; i < array.length; i++) {
            //     jsonObj[(i)] = array[i];
            //     test.push(jsonObj);
            //     jsonObj = {};
            // }
            //     // console.log(news);
            //     MongoClient.connect(urlMongo,function (err, db) { 
    
            //     var dbo = db.db('mydb');
            //     dbo.collection('produtos').insertMany(news, function (err, res) {
            //         // console.log("Numero de noticias inseridas: " + res.insertedCount);
            //         db.close();
            //     })       
            // })
    
        });
    };

    return execute();
}

Crawler().execute;

