import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';

import { Donations } from './donations.js';

const DONATION_ID_ONLY = new SimpleSchema({
	donationId: Donations.simpleSchema().schema('_id'),
}).validator({ clean: true, filter: false });

Meteor.methods({
	'donations.remove': function(id) {
		check(id, String);
		console.log(id);
			//Donations.remove(id);
	}
});

Meteor.call('donations.remove', '42');


/*export const remove = new ValidatedMethod({
	name: 'donations.remove',
	validate: DONATION_ID_ONLY,
	run({ donationId }) {
		/*const donation = Donations.find();

		console.log(donation);

		/*if (!donation.editableBy(this.userId)) {
			throw new Meteor.Error('donations.remove.accessDenied',
				'You don\'t have permission to remove this list.');
		}

		Donations.remove(donationId);
	},
});*/
