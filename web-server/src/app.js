// Express
const express = require('express');
const app = express();

// Use static file
const path = require('path');
app.use(express.static(path.join(__dirname, '../public')));

// Set view engine
const hbs = require('hbs');
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname,'../templates/partials'));


// Route
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Phuong'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'A random messagess',
        name: 'Phuongss'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Phuong'
    });
})

// Handle weather request
const geocoding = require('./utils/geocode');
const forecast = require('./utils/forecast');

app.get('/Weather', (req, res) => {
    if (!req.query.address) return res.send({error: 'Address must be provided!'});

    geocoding(req.query.address, (err, { longitude, latitude, location } = {}) => {
        if (err) { return res.send(err) };
    
        forecast(longitude, latitude, (error, forecastData) => {
            if (err) { return res.send(error) };
            res.send({
                data: forecastData,
                location,
                address: req.query.address
            });
        })
    })  
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help Page',
        message: 'Help article not found!',
        name: 'Phuongssss'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        message: 'Page not found!',
        name: 'Phuonssssgs'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})