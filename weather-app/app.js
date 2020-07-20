const geocoding = require('./utils/geocode');
const forecast = require('./utils/forecast');

geocoding('Shanghai', (err, {longitude, latitude, location}) => {
    if (err) { return console.error(err) };

    forecast(longitude, latitude, (error, forecastData) => {
        if (err) { return console.error(error) };
        console.log(location);
        console.log(forecastData);
    })
})
