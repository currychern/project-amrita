import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Food = {};
Food.schema = new SimpleSchema({
	name: {
		type: String
	},
	amount: {
		type: String
	}
});
