import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { ReactiveVar } from 'meteor/reactive-var';
import { $ } from 'meteor/jquery';
import { AutoForm } from 'meteor/aldeed:autoform';

import { Donations } from '../../api/donations/donations.js';

import '../helpers/donation-card.js';
import './donations.html';

Template.App_donations.onCreated(function() {
	Meteor.subscribe('donationByDonor');
	this.addDonation = new ReactiveVar(false);
});

Template.App_donations.helpers({
	myDonations: function() {
		return Meteor.subscriptions.donationByDonor(Meteor.userId());
	},
	addDonation: function() {
		return Template.instance().addDonation.get();
	}
});

Template.App_donations.events({
	'click .new-donation': function(event, instance) {
		instance.addDonation.set(true);
	}
});

Template.Add_donation.helpers({
	donations: function() {
		return Donations;
	},
	prepopulate: function() {
		let donor = Meteor.user().profile.donor;
		let address = donor.organization.address;
		return {
			'address.street1': address.street1,
			'address.street2': address.street2,
			'address.city': address.city,
			'address.state': address.state,
			'address.zip': address.zip
		};
	}
});

AutoForm.addHooks(['insertDonationForm'], {
	onSuccess: function() {
		let parent = $('.container')[0];
		let parentInstance = Blaze.getView(parent).templateInstance();
		parentInstance.addDonation.set(false);
	}
});

Template.Add_donation.onRendered( function () {
	$('select :first-child').prop('disabled', true);
});

Template.Add_donation.events({
	'click .close': function() {
		let parent = $('.container')[0];
		let parentInstance = Blaze.getView(parent).templateInstance();
		parentInstance.addDonation.set(false);
	}
});
