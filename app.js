'use strict';

let credentials = require('./credentials.js'),
scraper = require('./scraper.js'),
twilio = require('twilio'),
client = new twilio.RestClient(credentials.accountId, credentials.authToken),
CronJob = require('cron').CronJob,
//live number
// twilioOutBoundNumber = '+12342001779';

// test number
twilioOutBoundNumber = '+15005550006';

let textJob = new CronJob({
    //10:00 PM = '00 00 22 * * 1-7'
    cronTime: '00 00 22 * * 1-7',
    onTick: function() {
        //scraping sub-Reddits
        scraper.grabRedditInfo();

        //message object sent to phone
        client.messages.create({
            body: 'Hello from Node',
            to: '+13306973345',  
            from: twilioOutBoundNumber 
        }, function(err, message) {
            if (err) {
                console.log('error yo! ', err);
            } else {
                console.log('testing yo!');
            }
        });
    },
    start: false,
    timeZone: 'America/Chicago'
});

// test log
// console.log('script started, waiting...');

textJob.start();