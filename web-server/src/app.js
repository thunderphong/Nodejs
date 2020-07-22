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

app.get('/Weather', (req, res) => {
    res.send([
        {
            location: 'Can Tho',
            forecast: '20 C degrees, no UV'
        }, 
        {
            location: 'Ha Noi',
            forecast: '30 C degrees, no UV'
        }
    ]);
})

app.get('/help/*', (req, res) => {
    res.render('404-helpPage', {
        title: '404 Help Page',
        message: 'Help article not found!',
        name: 'Phuong'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        message: 'Page not found!',
        name: 'Phuong'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})