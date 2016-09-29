import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '../../helpers/donation-card.html';
import './recent.html';

Template.Dashboard_recent.onCreated(function() {
	Meteor.subscribe('donationByDonor');
	Meteor.subscribe('donationByRecipient');
});

Template.Dashboard_recent.helpers({
	outgoingDonations: function() {
		return Meteor.helperFunctions.collectionToHandlebarIterable(
      Meteor.subscriptions.donationByDonor(Meteor.userId()).fetch(), 2
    );
	},
	incomingDonations: function() {
		return Meteor.helperFunctions.collectionToHandlebarIterable(
      Meteor.subscriptions.donationByRecipient(Meteor.userId()).fetch(), 2
    );
	}
});
