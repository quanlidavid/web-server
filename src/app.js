const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'David'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'David'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		helpText: 'Help me',
		title: 'Help',
		name: 'David'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide a address to search'
		});
	}
	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}
		console.log({ latitude, longitude, location });
		forecast(latitude, longitude, (error, { cast, temperature, feel } = {}) => {
			if (error) {
				return res.send({ error });
			}
			console.log({ cast, temperature, feel });
			res.send(
				// cast + '. It is currently ' + temperature + ' degree out. It feels like ' + feel + ' degrees out.'
				{
					cast,
					temperature,
					feel
				}
			);
		});
	});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		});
	}
	console.log(req.query.search);
	res.send({
		products: []
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'David',
		errorMessage: 'Help article not found.'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'David',
		errorMessage: 'Page not found.'
	});
});

app.listen(port, () => {
	console.log('Server is up on port ' + port);
});
