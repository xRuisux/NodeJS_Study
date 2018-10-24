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
            
        rp(`http://www.ifpe.edu.br/noticias`, function(err,response,body) {
    
            var $ = cheerio.load(body); 
            var array = [];
            var news = [];
            
            $('div.tileItem').each((i, element) => {
                let newsElement = {}; 
                newsElement.titulo = $(element).find('h2.tileHeadline').text().replace(/[\n]/g, '').trim();
                newsElement.body = $(element).find('p').text().trim();
                newsElement.date = $($(element).find('.summary-view-icon')[0]).text().replace(/[\n]/g, '').trim();
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
            //     dbo.collection('noticias').insertMany(news, function (err, res) {
            //         // console.log("Numero de noticias inseridas: " + res.insertedCount);
            //         db.close();
            //     })       
            // })
    
        });
    };

    return execute();
}

Crawler().execute;

