import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Blaze } from 'meteor/blaze';
import { $ } from 'meteor/jquery';

import { Donations } from '../api/donations.js';

import './home.html';

Template.App_home.onCreated(function() {
	Meteor.subscribe('donations');

	this.addDonation = new ReactiveVar(false);
});

Template.App_home.helpers({
	donationList: function() {
		return Donations.find();
	},
	addDonation: function() {
		return Template.instance().addDonation.get();
	}
});

Template.App_home.events({
	'click .new-donation': function(event, instance) {
		instance.addDonation.set(true);
	}
});

Template.Add_donation.helpers({
	donations: function() {
		return Donations;
	}
});

Template.Add_donation.events({
	'click .fa-close': function() {
		let parent = $('.container')[0];
		let parentInstance = Blaze.getView(parent).templateInstance();
		parentInstance.addDonation.set(false);
	}
});

Template.Donation.onCreated(function() {
	this.editDonation = new ReactiveVar(false);
});

Template.Donation.helpers({
	donations: function() {
		return Donations;
	},
	updateDonationId: function() {
		return this._id;
	},
	editDonation: function() {
		return Template.instance().editDonation.get();
	}
});

Template.Donation.events({
	'click .fa-trash': function() {
		Meteor.call('deleteDonation', this._id);
	},
	'click .fa-pencil': function(event, instance) {
		instance.editDonation.set(!instance.editDonation.get());
	}
});
