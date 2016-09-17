import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { _ } from 'meteor/underscore';

export const Address = {};
Address.schema = new SimpleSchema({
	street1: {
		type: String,
		label: 'Street 1',
		max: 100
	},
	street2: {
		type: String,
		label: 'Street 2',
		max: 100,
		optional: true
	},
	city: {
		type: String,
		max: 50
	},
	state: {
		type: String,
		allowedValues: ['AL','AK','AZ','AR','AS','CA','CO','CT','DE','DC','FL','GA','GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','MP','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','PR','RI','SC','SD','TN','TX','UT','UM','VT','VA','VI','WA','WV','WI','WY'],
		autoform: {
			afFieldInput: {
				firstOption: '(State)',
				options: function () {
					return _.map(['AL','AK','AZ','AR','AS','CA','CO','CT','DE','DC','FL','GA','GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','MP','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','PR','RI','SC','SD','TN','TX','UT','UM','VT','VA','VI','WA','WV','WI','WY'], function (s) {
						return {label: s, value: s};
					});
				}
			}
		},
		regEx: /^A[LKZRS]|C[AOT]|D[EC]|FL|G[AU]|HI|I[DLNA]|K[SY]|LA|M[EDAINSOTP]|N[EVHJMYCD]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|U[TM]|V[TAI]|W[AVIY]$/
	},
	zip: {
		type: String,
		regEx: SimpleSchema.RegEx.ZipCode
	}
});
