let Q = require('q');
let qajax = require('qajax');
class TinderService {

	constructor() {
		this.url = '/tinder';
	}

	/**
	 * [getPeople description]
	 * @return {[type]} [description]
	 */
	getPeople() {
		return qajax({url: this.url, method: 'GET'})
      .then(qajax.filterSuccess)
      .then(qajax.toJSON);
	}

	/**
	 * [like description]
	 * @param  {[type]} id [description]
	 * @return {[type]}    [description]
	 */
	like(id) {

	}

	/**
	 * [unlike description]
	 * @param  {[type]} id [description]
	 * @return {[type]}    [description]
	 */
	unlike(id) {

	}

}

module.exports = TinderService;