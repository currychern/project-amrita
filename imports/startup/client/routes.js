import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/pages/home.js';
import '../../ui/pages/donations.js';
import '../../ui/roles/donor.js';
import '../../ui/layouts/main.js';

/*
Accounts.onLogin(function() {
	FlowRouter.go('/donate');
});

Accounts.onLogout(function() {
	FlowRouter.go('/');
});

FlowRouter.triggers.enter([function() {
	if(!Meteor.userId()) {
		FlowRouter.go('/');
	}
}]);
*/

FlowRouter.route('/', {
	name: 'App.home',
	action() {
		BlazeLayout.render('Main_layout', { main: 'App_home'});
	}
});

FlowRouter.route('/donate', {
	name: 'Role.donor',
	action() {
		BlazeLayout.render('Main_layout', { main: 'Role_donor'});
	}
	/*name: 'App.donations',
	action() {
		BlazeLayout.render('Main_layout', { main: 'App_donations'});
	}*/
});
