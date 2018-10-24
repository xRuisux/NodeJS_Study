const request = require('request');


var geocodeAddress = (address, callback) =>{

    var encodedAddress = encodeURIComponent(address);

    request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
    }, (error, response, body) => {
        if (error) {
            callback('Algo deu errado');
           
        } else if (body.status === 'OVER_QUERY_LIMIT') {
            callback('Precisa atualizar as credenciais');
        } else{
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
};

module.exports.geocodeAddress = geocodeAddress;
