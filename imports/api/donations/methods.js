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

		let donationId = Donations.insert(autoformArgs);
		match.call({donationId: donationId});
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

export const match = new ValidatedMethod({
	name: 'donations.match',
	validate: DONATION_ID_ONLY,
	run( {donationId} ) {
		const donation = Donations.findOne(donationId);
		if(!donation.updatableBy(this.userId)) {
			throw new Meteor.Error('donations.update.accessDenied',
				'You don\'t have permission to update this list.');
		}

		if(Meteor.isServer) {
			//Get users (not including the current user) who have a recipient role
			let users = Meteor.users.find(
				{'_id': {$ne : Meteor.userId()}, 'roles': {$in: ['recipient']}},
				{fields: {'_id': 1, 'profile.recipient.organization.name': 1}}
			).fetch();

			let user = users[Math.floor(Math.random() * users.length)];

			Donations.update(donationId, {
				$set: {
					status: 'Matched',
					recipientId: user._id,
					recipientName: user.profile.recipient.organization.name,
					updatedAt: new Date() },
			});
		}
	}
});
