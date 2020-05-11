const path = require('path')
const express = require('express')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const geoLocation = require('./utils/geoLocation')
const weatherData = require('./utils/weatherData')

const app = express()
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'NodeJs Beginner'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'NodeJs Beginner'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'NodeJs Beginner'
    })
})

app.get('/weather', (req, res) => {
    geoLocation(req.query.address, (error, { latitude, longitude, location, name } = {}) => {
        if (error) {
                     return res.send({error})
        }
    
        weatherData(longitude, latitude, (error, forecastdata) => {
            if (error) {
                return res.send({error})
                
            }
            return res.send({
                forecast:forecastdata,
                location,
                Place:name,
                address:req.query.address
            })
        }
        );
    });

})

app.post('/get_weather', (req, res) => {
    //console.log(req.body)
    geoLocation(req.body.Location, (error, { latitude, longitude, location, name } = {}) => {
        if (error) {
                     return res.send({error})
        }
        console.log(longitude,latitude)
        weatherData(longitude, latitude, (error, forecastdata) => {
            if (error) {
                return res.send({error})
                
            }
            return res.send({
                forecast:forecastdata,
                location,
                Place:name,
                address:req.query.address
            })
        }
        );
    });

})

app.get('/help/*', (req, res) => {
  res.render('404', {
      title: '404',
        name: 'NodeJs Beginner',
      errorMessage: 'Help article not found.'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
      title: '404',
      name: 'NodeJs Beginner',
      errorMessage: 'Page not found.'
  })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})