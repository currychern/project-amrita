import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Blaze } from 'meteor/blaze';
import { $ } from 'meteor/jquery';
import { AutoForm } from 'meteor/aldeed:autoform';

import { Donations } from '../../api/donations/donations.js';
import { remove, match } from '../../api/donations/methods.js';

import './donations.html';

Template.App_donations.onCreated(function() {
	Meteor.subscribe('donations');
	Meteor.subscribe('allRecipients');
	this.addDonation = new ReactiveVar(false);
});

Template.App_donations.helpers({
	donationList: function() {
		return Donations.find();
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
	$('select[name$=type] :first-child').prop('disabled', true);
});

Template.Add_donation.events({
	'click .close-add-donation': function() {
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
		remove.call({donationId: this._id});
	},
	'click .fa-pencil': function(event, instance) {
		match.call({donationId: this._id});
		//instance.editDonation.set(!instance.editDonation.get());
	}
});
