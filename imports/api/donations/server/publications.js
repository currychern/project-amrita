import { Meteor } from 'meteor/meteor';

Meteor.publish('donationByDonor', function () {
	return Meteor.subscriptions.donationByDonor(this.userId);
});

Meteor.publish('donationByRecipient', function () {
	return Meteor.subscriptions.donationByRecipient(this.userId);
});

Meteor.publish('donationByDriver', function () {
	return Meteor.subscriptions.donationByDriver(this.userId);
});

Meteor.publish('donationByStatusMatched', function () {
	return Meteor.subscriptions.donationByStatus('Matched', this.userId);
});
