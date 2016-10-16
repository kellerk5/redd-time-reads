'use strict';

let request = require('request');
let cheerio = require('cheerio');

exports.grabRedditInfo = function() {

	//array of subreddits, sorted by top of day
	let pagesToVisit = ['https://www.reddit.com/r/getdisciplined/top/?sort=top&t=day', 'https://www.reddit.com/r/getmotivated/top/?sort=top&t=day'];

	pagesToVisit.forEach(function(page, index) {
		request(page, function(error, response, body) {
			//parse HTML body
			let $ = cheerio.load(body);
			//if not a media link, grab the internal link
			let checkInternalOrExternalLink = ($('.title.may-blank').attr('data-href-url') === undefined) ? $('.title.may-blank').attr('href') : $('.title.may-blank').attr('data-href-url');
			//send different text body based on subreddit
			let greetingMessage = (index === 0) ? 'Top post of da day from r/getDisciplined yo! ' : 'And the folks at r/getMotivated are saying... ';
			
			// Check status code 
			if (response.statusCode === 200) {
				console.log(greetingMessage + $('.title.may-blank').first().text());
				console.log("Testing the LINK attribute: " + checkInternalOrExternalLink + '\n'); 
			} else if (response.statusCode !== 200) {
				console.log('Invalid status code: ' + response.statusCode);
			} else {
				console.log('Doh! We errored out. ', error);
			}
		});
	});
};