import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/dburles:factory';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Deliveries = new Mongo.Collection('deliveries');

Deliveries.deny({
	insert() { return true; },
	update() { return true; },
	remove() { return true; },
});

Deliveries.schema = new SimpleSchema({
	nickname: {
		type: String
	},
	donationId: {
		type: String,
		optional: true,
		autoform: {
			type: 'hidden'
		}
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

Deliveries.attachSchema(Deliveries.schema);

Factory.define('delivery', Deliveries, {});

Deliveries.helpers({
	updatableBy(userId) {
		return this.createdBy === userId;
	},
	removableBy(userId) {
		return this.createdBy === userId;
	}
});
