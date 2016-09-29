import { Meteor } from 'meteor/meteor';

Meteor.publish('donationByDonor', function () {
	return Meteor.subscriptions.donationByDonor(this.userId);
});

Meteor.publish('donationByRecipient', function () {
	return Meteor.subscriptions.donationByRecipient(this.userId);
});
