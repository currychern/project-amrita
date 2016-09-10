import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { AccountsTemplates } from 'meteor/useraccounts:core';

import './main-nav.html';

Template.MainNav.events({
	'click .signin-toggle': () => {
		Session.set('modal-toggle', 'open');
	},
	'click .signout': () => {
		AccountsTemplates.logout();
	}
});
