const request = require("request");
const geocoding = require('./utils/geocode');

// // Api from openweathermap 
// const url = 'http://api.weatherstack.com/current?access_key=306b01f7b7fab786e414364c1a826a92&query=10.037,105.788';

// request({url: url, json: true}, (err, res) => {
//     if (err) console.error('Unable to connect server');
//     else if (res.body.error) console.error('Unable to resolve location')
//     else console.log(`It is currently ${res.body.current.temperature} degrees out. There is ${res.body.current.uv_index} of UV indexes `);
// })

// const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/los%20angeles.json?access_token=pk.eyJ1IjoidGh1bmRlcnBob25nIiwiYSI6ImNrY3NnenR0MDBodTMycnA3dTY0NDJhZnoifQ.RDvVO_PgC88sElzSgsB5cQ&limit=1';

// request({url: geocodeUrl, json: true}, (err, res) => {
//     if (err) console.error('Unable to connect server');
//     else if (res.body.message) console.error(res.body.message);
//     else if (res.body.features.length === 0) console.error('Unable to find any related place');
//     else console.log(res.body.features[0].center);
// })

geocoding('Boston', (err, data) => {
    console.error(err);
    console.log(data);    
})