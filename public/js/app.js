/* fetch('http://puzzle.mead.io/puzzle').then((response) => {
	response.json().then((data) => {
		console.log(data);
	});
});

fetch('http://localhost:3000/weather?address=changping').then((response) => {
	response.json().then((data) => {
		if (data.error) {
			return console.log(data.error);
		}
		console.log(
			data.cast +
				'. It is currently ' +
				data.temperature +
				' degree out. It feels like ' +
				data.feel +
				' degrees out.'
		);
	});
}); */

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1'); //# for id; . for class
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const location = search.value;
	console.log('input location:' + location);
	messageOne.textContent = 'Loading weather for ' + location;
	messageTwo.textContent = '';
	fetch('/weather?address=' + location).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageOne.textContent = data.error;
				return console.log(data.error);
			}
			messageOne.textContent = location;
			messageTwo.textContent =
				data.cast +
				'. It is currently ' +
				data.temperature +
				' degree out. It feels like ' +
				data.feel +
				' degrees out.';
			console.log(
				data.cast +
					'. It is currently ' +
					data.temperature +
					' degree out. It feels like ' +
					data.feel +
					' degrees out.'
			);
		});
	});
});
