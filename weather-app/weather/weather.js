const request = require('request');



var currentWeatherPromise = function(lat, long) {
    return new Promise((resolve, reject) => {
        request({
            url:`https://api.darksky.net/forecast/aebb37c445917d684ab230d9a9259eba/${lat},${long}`,
            json:true,  
          }, (error, response, body) => {
              if(!error && response.statusCode === 200) {
                resolve({
                      temperature: body.currently.temperature,
                      apparentTemperature: body.currently.apparentTemperature 
                  })
              } else {
                reject('dark sky api is not working. Please try again')
              }
          
          })
        });
    }


var currentWeather = function(lat, long, callBackWeather)  {
    
    request({
  url:`https://api.darksky.net/forecast/aebb37c445917d684ab230d9a9259eba/${lat},${long}`,
  json:true,  
}, (error, response, body) => {
    if(!error && response.statusCode === 200) {
        callBackWeather(undefined, {
            temperature: body.currently.temperature,
            apparentTemperature: body.currently.apparentTemperature 
        })
    } else {
        callBackWeather('dark sky api is not working. Please try again', undefined)
    }

} )

}

module.exports = {
    currentWeather,
    currentWeatherPromise
}