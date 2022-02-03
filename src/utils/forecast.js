const request = require('postman-request');
const forecast = (latitude, longitude, callback) => {
	const url =
		'http://api.weatherstack.com/current?units=m&access_key=25f925de5002522d2a6b6bd1810ddf6d&query=' +
		encodeURIComponent(latitude) +
		',' +
		encodeURIComponent(longitude);
	console.log(url);
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service', undefined);
		} else if (body.error) {
			callback('Unable to find location', undefined);
		} else {
			const data = {
				cast: body.current.weather_descriptions[0],
				temperature: body.current.temperature,
				feel: body.current.feelslike
			};
			callback(undefined, data);
		}
	});
};

module.exports = forecast;
