import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { Donations } from '../donations/donations.js';

Meteor.helperFunctions = {
	// Takes a converted collection array (using fetch), and formats it for display
	// using handlebars
	//	i.e.	[a, b, c] --> [ [a,b], [c] ], itemsPerRow = 2
	//				[a, b, c, d] --> [ [a,b] , [c,d] ] itemsPerRow = 2
	'collectionToHandlebarIterable': function(collectionArr, itemsPerRow) {
		check(collectionArr, Match.Any);
		check(itemsPerRow, Number);

		let iterableArr = [];

		// Sets the basic iterable array structure i.e. [[],[]]
		for (let i=0; i<Math.ceil(collectionArr.length/itemsPerRow); i++) {
			iterableArr.push([]);
		}

		// Populates the iterable array with data
		let index = -1;
		for (let i=0; i<collectionArr.length; i++) {
			if (i % itemsPerRow == 0) {
				index++;
			}
			iterableArr[index].push(collectionArr[i]);
		}
		return iterableArr;
	}
};

Meteor.subscriptions = {
	'donationByDonor': function(userId) {
		return Donations.find({ createdBy: userId });
	},
	'donationByRecipient': function(userId) {
		return Donations.find({ recipientId: userId });
	}
};
