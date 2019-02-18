

const request = require('request');


var geocodePromise = function (address) {

    return new Promise((resolve, reject) => {
        const encodedAddress = encodeURIComponent(address);
        const key = 'AIzaSyDNBvaHwfY4rTU4GDtB3eMRScZaSidSNkY';
        
        var url = `https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=${encodedAddress}`;
        
        request({
            url : url,
            json: true
           }, (error, response, body) => {
               if(error) {
                reject('not able to connect to google api');
               } else if (body.status === 'ZERO_RESULTS' || body.status === 'INVALID_REQUEST') {
                reject('Status is not correct')
               }else if(body.status === 'OK') {
                resolve({
                       address: body.results[0].formatted_address,
                       latitude: body.results[0].geometry.location.lat,
                       longitude: body.results[0].geometry.location.lng
                   })
                   }
       
       })
        

    });

}



var getGeoCodeAdress = function (address, callBack) {
    const encodedAddress = encodeURIComponent(address);
    const key = 'AIzaSyDNBvaHwfY4rTU4GDtB3eMRScZaSidSNkY';
    
    var url = `https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=${encodedAddress}`;
    
    console.log(url);
var res = request({
     url : url,
     json: true
    }, (error, response, body) => {
        if(error) {
            callBack('not able to connect to google api');
        } else if (body.status === 'ZERO_RESULTS') {
            callBack('Status is not correct')
        }else if(body.status === 'OK') {
            callBack(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            })
            }

})
}

module.exports = {
    getGeoCodeAdress,
    geocodePromise
}


