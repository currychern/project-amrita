import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';

import { Donor } from './_donor.js';

Meteor.methods({
	'register.donor': function(doc) {
		check(doc, Donor.schema);
		let userId = Meteor.userId();

		Meteor.users.update(userId, {
			$set: {
				'profile.donor': doc
			}
		});

		Roles.addUsersToRoles(userId, 'donor');
	}
});
