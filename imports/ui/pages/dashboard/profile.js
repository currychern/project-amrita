import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './profile.html';

Template.Dashboard_profile.helpers({
	userProfile: function() {
		if (Meteor.user()) {
			return Meteor.user().profile;
		}
	},
	userEmail: function() {
		return Meteor.user().emails[0].address;
	},
	userAge: function() {
		let birthday = new Date(Meteor.user().profile.birthday);
		let today = Date.now();
		return Math.floor((today-birthday)/31557600000);
	}
});
