import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';

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
	_id: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		autoform: {
			type: 'hidden'
		}
	},
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
			return 'XXX-XXX'; //this.userId;
		},
		autoform: {
			type: 'hidden'
		}
	},
	createdAt: {
		type: Date,
		autoValue: function() {
			return new Date();
		},
		autoform: {
			type: 'hidden'
		}
	},
	updatedBy: {
		type: String,
		optional: true,
		autoform: {
			type: 'hidden'
		}
	},
	updatedAt: {
		type: Date,
		optional: true,
		autoform: {
			type: 'hidden'
		}
	}
});

Donations.attachSchema(Donations.schema);

Donations.helpers({
	editableBy(userId) {
		return this.createdBy === userId;
	}
});

Meteor.methods({
	deleteDonation: function(id) {
		check(id, String);
		Donations.remove(id);
	}
});

if (Meteor.isServer) {
	Meteor.publish('donations', function () {
		return Donations.find();
	});
}
