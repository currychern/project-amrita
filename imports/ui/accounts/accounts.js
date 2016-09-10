import { Session } from 'meteor/session';
import { AccountsTemplates } from 'meteor/useraccounts:core';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './accounts.html';

AccountsTemplates.configure({
	confirmPassword: false,
	termsUrl: 'terms-of-use',
	privacyUrl: 'privacy',
	onLogoutHook: function() {
		Session.set('signin-toggle', '');
		FlowRouter.go('/');
	}
});

let password = AccountsTemplates.removeField('password');
let email = AccountsTemplates.removeField('email');

AccountsTemplates.addFields([
	{
		_id: 'firstName',
		type: 'text',
		displayName: 'First Name',
		required: true,
		re: /(?=.*[a-z])(?=.*[A-Z])/,
		errStr: '1 uppercase and 1 lowercase letter required',
	},
	{
		_id: 'lastName',
		type: 'text',
		displayName: 'Last Name',
		required: true,
		re: /(?=.*[a-z])(?=.*[A-Z])/,
		errStr: '1 uppercase and 1 lowercase letter required',
	},
	email,
	password,
	{
		_id: 'notifications',
		type: 'checkbox',
		displayName: 'I\'d like to receive surveys and updates from Project Amrita.'
	},
	{
		_id: 'birthday',
		type: 'text',
		template: 'Helper_date'
	}
]);
