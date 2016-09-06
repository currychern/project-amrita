import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Donations } from './donations.js';

const DONATION_ID_ONLY = new SimpleSchema({
	donationId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	}
}).validator({ clean: true, filter: false });

export const insert = new ValidatedMethod({
	name: 'donations.insert',
	validate(autoformArgs) {
		Donations.simpleSchema().validate(autoformArgs);
	},
	run( autoformArgs ) {

		if (!this.userId) {
			throw new Meteor.Error('donations.insert.notLoggedIn', 'Must be logged in.');
		}

		Donations.insert(autoformArgs);
	}
});

export const update = new ValidatedMethod({
	name: 'donations.update',
	validate(autoformArgs) {
		Donations.simpleSchema().validate(autoformArgs.modifier , { modifier: true });
	},
	run( autoformArgs ) {
		const donation = Donations.findOne(autoformArgs._id);
		if(!donation.updatableBy(this.userId)) {
			throw new Meteor.Error('donations.update.accessDenied',
				'You don\'t have permission to update this list.');
		}

		Donations.update(autoformArgs._id, autoformArgs.modifier);
	}
});

export const remove = new ValidatedMethod({
	name: 'donations.remove',
	validate: DONATION_ID_ONLY,
	run( {donationId} ) {
		const donation = Donations.findOne(donationId);

		if(!donation.removableBy(this.userId)) {
			throw new Meteor.Error('donations.remove.accessDenied',
				'You don\'t have permission to remove this list.');
		}

		Donations.remove(donationId);
	}
});
