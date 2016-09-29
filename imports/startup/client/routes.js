//import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Roles } from 'meteor/alanning:roles';

import '../../ui/pages/home.js';
import '../../ui/pages/dashboard/recent.js';
import '../../ui/pages/dashboard/profile.js';
import '../../ui/pages/donations.js';
import '../../ui/roles/donor.js';
import '../../ui/roles/recipient.js';
import '../../ui/layouts/main.js';
import '../../ui/layouts/main-side-nav.js';

/*
Accounts.onLogin(function() {
	FlowRouter.go('/donate');
});

Accounts.onLogout(function() {
	FlowRouter.go('/');
});
*/

FlowRouter.triggers.enter([function() {
	if(!Meteor.userId()) {
		FlowRouter.go('/');
	}
}]);

FlowRouter.route('/', {
	name: 'App.home',
	action() {
		BlazeLayout.render('Main_layout', { main: 'App_home'});
	}
});

let donate = FlowRouter.group({
	name: 'donate',
	prefix: '/donate'
});

donate.route('/', {
	name: 'App.donations',
	action() {
		BlazeLayout.render('Main_layout', { main: 'App_donations'});
	}
});

donate.route('/register', {
	name: 'Role.donor',
	action() {
		BlazeLayout.render('Main_layout', { main: 'Role_donor'});
	}
});

let receive = FlowRouter.group({
	name: 'receive',
	prefix: '/receive'
});

receive.route('/', {
	name: 'App.receive',
	action() {
		if (Roles.userIsInRole(Meteor.userId(), 'recipient')) {
			FlowRouter.go('/dashboard/recent');
		}
		else {
			FlowRouter.go('/receive/register');
		}
	}
});

receive.route('/register', {
	name: 'Role.receipient',
	action() {
		BlazeLayout.render('Main_layout', { main: 'Role_recipient'});
	}
});

let dashboard = FlowRouter.group({
	name: 'dashboard',
	prefix: '/dashboard'
});

dashboard.route('/', {
	name: 'Dashboard.home',
	action() {
		FlowRouter.go('/dashboard/recent');
	}
});

dashboard.route('/recent', {
	name: 'Dashboard.recent',
	action() {
		BlazeLayout.render('Main_side_nav_layout', { main: 'Dashboard_recent'});
	}
});

dashboard.route('/profile', {
	name: 'Dashboard.profile',
	action() {
		BlazeLayout.render('Main_side_nav_layout', { main: 'Dashboard_profile'});
	}
});
