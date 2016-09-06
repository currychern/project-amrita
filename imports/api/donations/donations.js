import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/dburles:factory';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Donations = new Mongo.Collection('donations');

const Foods = {};
Foods.schema = new SimpleSchema({
	name: {
		type: String
	},
	amount: {
		type: String
	}
});

Donations.allow({
	insert() { return true; },
	update() { return true; },
	remove() { return true; },
});

Donations.schema = new SimpleSchema({
	nickname: {
		type: String
	},
	donationType: {
		type: String,
		autoform: {
			options: {
				produce: 'Produce',
				frozen: 'Frozen',
				prepared: 'Prepared',
				packaged: 'Packaged',
				canned: 'Canned',
				mixed:'Mixed'
			}
		}
	},
	foods: {
		type: [Foods.schema]
	},

	createdBy: {
		type: String,
		autoValue: function() {
			if (this.isInsert) {
				return this.userId;
			} else if (this.isUpsert) {
				return {$setOnInsert: this.userId};
			} else {
				this.unset();	// Prevent user from supplying their own value
			}
		},
		denyInsert: false,
		denyUpdate: true,
		optional: true,
		autoform: {
			type: 'hidden'
		}
	},

	updatedBy: {
		type: String,
		autoValue: function() {
			if (this.isUpdate) {
				return this.userId;
			}
		},
		denyInsert: true,
		optional: true,
		autoform: {
			type: 'hidden'
		}
	},

	// Force value to be current date (on server) upon insert
	// and prevent updates thereafter.
	createdAt: {
		type: Date,
		autoValue: function() {
			if (this.isInsert) {
				return new Date;
			} else if (this.isUpsert) {
				return {$setOnInsert: new Date};
			} else {
				this.unset();	// Prevent user from supplying their own value
			}
		},
		denyInsert: false,
		denyUpdate: true,
		optional: true,
		autoform: {
			type: 'hidden'
		}
	},

	// Force value to be current date (on server) upon update
	// and don't allow it to be set upon insert.
	updatedAt: {
		type: Date,
		autoValue: function() {
			if (this.isUpdate) {
				return new Date();
			}
		},
		denyInsert: true,
		optional: true,
		autoform: {
			type: 'hidden'
		}
	}
});

Donations.attachSchema(Donations.schema);

Factory.define('donation', Donations, {});

Donations.helpers({
	updatableBy(userId) {
		return this.createdBy === userId;
	},
	removableBy(userId) {
		return this.createdBy === userId;
	}
});
