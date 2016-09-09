import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Deliveries } from './deliveries.js';

const DELIVERY_ID_ONLY = new SimpleSchema({
	deliveryId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	}
}).validator({ clean: true, filter: false });

export const insert = new ValidatedMethod({
	name: 'deliveries.insert',
	validate(autoformArgs) {
		Deliveries.simpleSchema().validate(autoformArgs);
	},
	run( autoformArgs ) {

		if (!this.userId) {
			throw new Meteor.Error('deliveries.insert.notLoggedIn', 'Must be logged in.');
		}

		Deliveries.insert(autoformArgs);
	}
});

export const update = new ValidatedMethod({
	name: 'deliveries.update',
	validate(autoformArgs) {
		Deliveries.simpleSchema().validate(autoformArgs.modifier , { modifier: true });
	},
	run( autoformArgs ) {
		const delivery = Deliveries.findOne(autoformArgs._id);
		if(!delivery.updatableBy(this.userId)) {
			throw new Meteor.Error('deliveries.update.accessDenied',
				'You don\'t have permission to update this list.');
		}

		Deliveries.update(autoformArgs._id, autoformArgs.modifier);
	}
});

export const remove = new ValidatedMethod({
	name: 'deliveries.remove',
	validate: DELIVERY_ID_ONLY,
	run( {deliveryId} ) {
		const delivery = Deliveries.findOne(deliveryId);

		if(!delivery.removableBy(this.userId)) {
			throw new Meteor.Error('deliveries.remove.accessDenied',
				'You don\'t have permission to remove this list.');
		}

		Deliveries.remove(deliveryId);
	}
});
