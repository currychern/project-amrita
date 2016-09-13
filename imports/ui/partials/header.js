import { AccountsTemplates } from 'meteor/useraccounts:core';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './header.html';

Template.Header.onRendered(function(){
	$('.modal-trigger').leanModal();
});

Template.Header.events({
	'click .signout': () => {
		AccountsTemplates.logout();
	}
});
