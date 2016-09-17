import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Donor } from './_donor.js';

Meteor.methods({
	'test.methods': function(doc) {
		check(doc, Donor.schema);

		let userId = Meteor.userId();

		Meteor.users.update(userId, {
			$set: {
				'profile.donor': doc
			}
		});
	}
});
