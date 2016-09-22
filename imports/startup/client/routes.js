//import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/pages/home.js';
import '../../ui/pages/donations.js';
import '../../ui/roles/donor.js';
import '../../ui/roles/recipient.js';
import '../../ui/layouts/main.js';

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
		BlazeLayout.render('Main_layout', { main: 'App_home'});
	}
});

receive.route('/register', {
	name: 'Role.receipient',
	action() {
		BlazeLayout.render('Main_layout', { main: 'Role_recipient'});
	}
});
