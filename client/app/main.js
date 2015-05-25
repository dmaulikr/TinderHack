let _ = require('underscore');
let TinderService = require('./services/TinderService');

class main {

	constructor() {
		let tinder = new TinderService();
		tinder.getPeople().then(this.getPeopleSuccess.bind(this));
	}

	getPeopleSuccess(e) {
		_.each(e, (result, index) => {
			console.log('got: ', result);
			let img = new Image();
			let div = document.createElement('div');
			div.innerHTML = [
				result._id,
				result.bio,
				result.name
			].join('<br/>');
			div.setAttribute('class', 'info');
			img.src = result.photos[0].url;
			img.setAttribute('class', 'pic');

			let container = document.createElement('div');
			container.setAttribute('class', 'person');

			container.appendChild(img);
			container.appendChild(div);

			document.getElementById('people').appendChild(container);

		});
	}




}

new main();