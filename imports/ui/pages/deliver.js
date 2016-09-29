import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '../helpers/donation-card.js';
import './deliver.html';

Template.App_deliver.onCreated(function() {
	Meteor.subscribe('donationByStatusMatched');
	Meteor.subscribe('donationByDriver');
});

Template.App_deliver.helpers({
	awaitDriver: function() {
		return Meteor.subscriptions.donationByStatus('Matched', Meteor.userId());
	},
	myDeliveries: function() {
		return Meteor.subscriptions.donationByDriver(Meteor.userId());
	}
});
