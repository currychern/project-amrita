import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Deliveries } from '../../api/deliveries/deliveries.js';
import { remove } from '../../api/deliveries/methods.js';

import './deliveries.html';

Template.App_deliveries.onCreated(function() {
	Meteor.subscribe('deliveries');
});

Template.App_deliveries.helpers({
	deliveryList: function() {
		return Deliveries.find();
	}
});

Template.Add_delivery.helpers({
	deliveries: function() {
		return Deliveries;
	}
});

Template.Delivery.onCreated(function() {
	this.editDelivery = new ReactiveVar(false);
});

Template.Delivery.helpers({
	deliveries: function() {
		return Deliveries;
	},
	updateDeliveryId: function() {
		return this._id;
	},
	editDelivery: function() {
		return Template.instance().editDelivery.get();
	}
});

Template.Delivery.events({
	'click .fa-trash': function() {
		remove.call({deliveryId: this._id});
	},
	'click .fa-pencil': function(event, instance) {
		instance.editDelivery.set(!instance.editDelivery.get());
	}
});
