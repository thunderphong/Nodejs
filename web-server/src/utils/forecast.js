const request = require("request");

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=306b01f7b7fab786e414364c1a826a92&query=' + latitude + ',' + longitude;
    request({url, json: true}, (err, { body }) => {
        if (err) callback({ error: 'Unable to connect server' }, undefined);
        else if (body.error) callback({ error: 'Unable to resolve location' }, undefined);
        else callback(undefined, `It is currently ${body.current.temperature} degrees out. There is ${body.current.uv_index} of UV indexes `)
    })
}

module.exports = forecast;