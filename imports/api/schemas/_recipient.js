import { _ } from 'meteor/underscore';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Contact } from './_contact.js';

export const Recipient = {};
Recipient.schema = new SimpleSchema({
	organization: {
		type: Contact.schema.omit(['firstName', 'lastName'])
	},
	ein: {
		type: String,
		label: 'EIN'
	},
	certified: {
		type: Boolean,
		label: 'I certify that the aforementioned organization is a non-profit and that any food received via this program will not be resold.',
		optional: true,
		custom: function() {
			if (!this.value) {
				return 'certifyToReceive';
			}
		}
	},
	acceptedItems: {
		type: [String],
		label: 'Accepted Items',
		allowedValues: ['Produce', 'Prepared', 'Packaged', 'Frozen', 'Canned', 'Mixed'],
		autoform: {
			afFieldInput: {
				options: function () {
					return _.map(['(Check all that apply)', 'Produce', 'Prepared', 'Packaged', 'Frozen', 'Canned', 'Mixed'], function (s) {
						return {label: s, value: s};
					});
				}
			}
		}
	}
});

SimpleSchema.messages({
	'certifyToReceive': 'You must certify to receive donations.'
});
