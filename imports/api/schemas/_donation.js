import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Address } from '../schemas/_address.js';
import { Food } from '../schemas/_food.js';

export const Donation = {};
Donation.schema = new SimpleSchema({
	nickname: {
		type: String
	},
	type: {
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
		type: [Food.schema]
	},
	address: {
		type: Address.schema
	},
	vehicle: {
		type: String,
		autoform: {
			options: {
				sedan: 'Sedan',
				suv: 'SUV/Minivan',
				van: 'Van/Truck'
			}
		}
	},
	pickupTime: {
		type: String
	},
	status: {
		type: String,
		optional: true,
		autoform: {
			type: 'hidden'
		}
	},

	// Force value to be current user id upon insert
	// and prevent updates thereafter.
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

	// Force value to be current user id upon update
	// and don't allow it to be set upon insert.
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
