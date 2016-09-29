import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Donations } from '../../api/donations/donations.js';
import { remove } from '../../api/donations/methods.js';

Template.Helper_donation_card.onCreated(function() {
	this.editDonation = new ReactiveVar(false);
});

Template.Helper_donation_card.helpers({
	donations: function() {
		return Donations;
	},
	donationId: function() {
		return this._id;
	},
	edit: function() {
		return Template.instance().editDonation.get();
	},
});

Template.Helper_donation_card.events({
	'click .delete': function() {
		remove.call({donationId: this._id});
	},
	'click .edit': function(event, instance) {
		instance.editDonation.set(!instance.editDonation.get());
	},
	'click .close': function(event, instance) {
		instance.editDonation.set(!instance.editDonation.get());
	}
});
