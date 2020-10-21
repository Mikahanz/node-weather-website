const path = require('path');
const express = require('express');
const hbs = require('hbs');
const getForecast = require('./utils/forecast');

const app = express();

// Define path for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

//Root page
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Michael Hanzel',
  });
});

// Help Page
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Michael Hanzel',
  });
});

// About page
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Michael Hanzel',
  });
});

// Weather page
app.get('/weather', (req, res) => {
  let address = req.query.address;

  if (!address) {
    return res.send({
      error: 'You must provide an address!',
    });
  }

  // get forcast
  getForecast(address, (error, data, locationName) => {
    //console.log(data);
    if (typeof error === 'undefined') {
      const { temperature, feelslike, weather_descriptions } = data.current;
      return res.send({
        address: address,
        Location: locationName,
        Temperature: temperature,
        FeelsLike: feelslike,
        forecast: weather_descriptions,
      });
    } else {
      return res.send(error);
    }
  });
});

// Products Get Request
app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }

  console.log(req.query);
  res.send({
    products: [req.query],
  });
});

// Error 404 page
app.get('/help/*', (req, res) => {
  res.render('error_page', {
    title: '404',
    message: 'Help Article Not Found!',
    name: 'Michael hanzel',
  });
  res.status(404);
});

app.get('*', (req, res) => {
  res.render('error_page', {
    title: '404',
    message: 'Page not found!',
    name: 'Michael hanzel',
  });
  res.status(404);
});

/////////////////////////////////////

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
