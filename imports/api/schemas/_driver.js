import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Driver = {};
Driver.schema = new SimpleSchema({
	ofAge: {
		type: Boolean,
		label: 'I certify that am at least 18 years of age.',
		optional: true,
		custom: function() {
			if (!this.value) {
				return 'certifyAge';
			}
		}
	},
	licensed: {
		type: Boolean,
		label: 'I certify that I have a valid driver\'s license.',
		optional: true,
		custom: function() {
			if (!this.value) {
				return 'certifyLicense';
			}
		}
	},
	vehicle: {
		type: String,
		autoform: {
			options: {
				Sedan: 'Sedan',
				Suv: 'SUV/Minivan',
				Van: 'Van/Truck'
			}
		}
	},
	readTutorial: {
		type: Boolean,
		label: 'I certify that I have read the food handling tutorial and passed the quiz.',
		optional: true,
		custom: function() {
			if (!this.value) {
				return 'certifyTutorial';
			}
		}
	},
});

SimpleSchema.messages({
	'certifyAge': 'You must certify that you are at least 18 year old.',
	'certifyLicense': 'You must certify that you have a valid driver\'s license.',
	'certifyTutorial': 'You must certify that you have read the food handling tutorial and passed the quiz.'
});
