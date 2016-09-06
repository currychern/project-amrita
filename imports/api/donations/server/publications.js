import { Meteor } from 'meteor/meteor';

import { Donations } from '../donations.js';

Meteor.publish('donations', function () {
	return Donations.find();
});
