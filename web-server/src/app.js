const exp = require('constants')
const express = require('express')
const geoLocation = require('./utills/geoLocation')
const forecast = require('./utills/forecast')
const path = require('path')
const { response } = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Spandan Mund'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: "You must provide a search term"
        })
    }

    geoLocation(req.query.address, (error, { Latitude, Longitude, Location } = {}) => {
        if(error){
            res.send({ error })
        }

            forecast(Latitude, Longitude, (error, forecastData) => {
                if(error){
                    res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    Location,
                    address: req.query.address
                })
            })
    })

    
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Spandan Mund'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Spandan Mund'
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Jack',
        errorMessage: 'Help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title:"404 ",
        name: 'Jack',
        errorMessage: 'Not found'
    })
})

app.listen(3000, () => {
    console.log("Server is up at 3000!")
})

