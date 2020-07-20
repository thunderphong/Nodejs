const request = require("request");
const geocoding = (address, callback) => {
    const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    const json = '.json';
    const access_token = '?access_token=pk.eyJ1IjoidGh1bmRlcnBob25nIiwiYSI6ImNrY3NnenR0MDBodTMycnA3dTY0NDJhZnoifQ.RDvVO_PgC88sElzSgsB5cQ';
    let filter = {
        limit: 1
    };
    let url = baseUrl + encodeURIComponent(address) + json + access_token; 
    request({url: url, json: true}, (err, res) => {
        if (err) callback('Unable to connect server!',undefined);
        else if (res.body.message) callback(res.body.message, undefined);
        else if (res.body.features.length === 0) callback('Unable to find any related place', undefined);
        else callback(undefined, {
            longitude: res.body.features[0].center[0],
            latitude: res.body.features[0].center[1]
        });
    })
}

module.exports = geocoding;