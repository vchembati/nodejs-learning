
const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

const argv = yargs
        .options({
            a: {
                demand: true,
                alias: 'address',
                describe: 'Address to fetch the weather app',
                string: true
            }
        })
        .help()
        .alias('help', 'h')
        .argv;


   geocode.geocodePromise(argv.address)
   .then((resolve) => {
        console.log(JSON.stringify(resolve, undefined, 2))
        weather.currentWeatherPromise(resolve.latitude, resolve.longitude)
        .then((resolve) => {
            console.log(JSON.stringify(resolve, undefined, 2))
        })
   })
   .catch((error) => {
       console.log("error" + error);
   })  

// geocode.getGeoCodeAdress(argv.address, (errorMessage, results) => {
//     if(errorMessage) {
//         console.log(errorMessage);
//     } else {
//       const lat = results.latitude;
//       const long = results.longitude;
//       console.log('latitude', lat);
//       console.log('longitude', long);  

//     weather.currentWeather(lat, long, (errorMessageWeather, resultsWeather) => {
//         if(errorMessageWeather) {
//             console.log(errorMessageWeather);
//         } else {
//             console.log(`current temperaturere ${resultsWeather.temperature} and feels like ${resultsWeather.apparentTemperature}`);
//         }

//     })
//     }
// });
