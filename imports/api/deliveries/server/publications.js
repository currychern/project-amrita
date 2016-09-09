import { Meteor } from 'meteor/meteor';

import { Deliveries } from '../deliveries.js';

Meteor.publish('deliveries', function () {
	return Deliveries.find();
});
