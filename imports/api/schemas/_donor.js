import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Contact } from './_contact.js';

export const Donor = {};
Donor.schema = new SimpleSchema({
	organization : {
		type: Contact.schema.omit(['firstName', 'lastName'])
	}
});
