import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './profile.html';

Template.Dashboard_profile.helpers({
	userProfile: function() {
		return Meteor.user().profile;
	}
});
