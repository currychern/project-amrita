import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Address } from './_address.js';

export const Contact = {};
Contact.schema = new SimpleSchema({
	name: {
		type: String,
		optional: true,
		custom: function () {
			if (!this.siblingField('firstName').isSet &&
					!this.siblingField('lastName').isSet && !this.value) {
				return 'required';
			}
		}
	},
	firstName: {
		type: String,
		label: 'First Name',
		optional: true
	},
	lastName: {
		type: String,
		label: 'Last Name',
		optional: true
	},
	phone: {
		type: String
	},
	email: {
		type: String,
		regEx: SimpleSchema.RegEx.Email
	},
	address: {
		type: Address.schema
	}
});
