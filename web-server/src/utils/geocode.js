const request = require("request");
const geocoding = (address, callback) => {
    const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    const json = '.json';
    const access_token = '?access_token=pk.eyJ1IjoidGh1bmRlcnBob25nIiwiYSI6ImNrY3NnenR0MDBodTMycnA3dTY0NDJhZnoifQ.RDvVO_PgC88sElzSgsB5cQ&';
    let filter = {
        limit: 1,
        types: 'place'
    };
    let url = baseUrl + encodeURIComponent(address) + json + access_token;
    for (const key in filter) url = url + `${key}=${filter[key]}` + '&';
    // console.log(url);
    request({url, json: true}, (err, { body }) => {
        if (err) callback({ error: 'Unable to connect server!' }, undefined);
        else if (body.message) callback(body.message, undefined);
        else if (body.features.length === 0) callback({ error: 'Unable to find any related place' }, undefined);
        else callback(undefined, {
            longitude: body.features[0].center[0],
            latitude: body.features[0].center[1],
            location: body.features[0].place_name
        });
    })
}

module.exports = geocoding;