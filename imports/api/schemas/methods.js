import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';

import { Donor } from './_donor.js';
import { Recipient } from './_recipient.js';

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
	},
	'register.recipient': function(doc) {
		check(doc, Recipient.schema);
		let userId = Meteor.userId();

		Meteor.users.update(userId, {
			$set: {
				'profile.recipient': doc
			}
		});

		Roles.addUsersToRoles(userId, 'recipient');
	}
});
