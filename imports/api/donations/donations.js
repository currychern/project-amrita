import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/dburles:factory';

import { Donation } from '../schemas/_donation.js';

export const Donations = new Mongo.Collection('donations');

Donations.deny({
	insert() { return true; },
	update() { return true; },
	remove() { return true; },
});

Donations.attachSchema(Donation.schema);

Factory.define('donation', Donations, {});

Donations.helpers({
	updatableBy(userId) {
		return this.createdBy === userId;
	},
	removableBy(userId) {
		return this.createdBy === userId;
	}
});
