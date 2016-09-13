import { Session } from 'meteor/session';
import { AccountsTemplates } from 'meteor/useraccounts:core';
import { FlowRouter } from 'meteor/kadira:flow-router';

import '../helpers/birthday.js';

AccountsTemplates.configure({
	confirmPassword: false,
	termsUrl: 'terms-of-use',
	privacyUrl: 'privacy',
	texts: {
		signInLink_link: 'Sign In'
	},
	onLogoutHook: function() {
		//Session.set('signin-toggle', '');
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
		placeholder: 'First Name',
		required: true,
		re: /(?=.*[a-z])(?=.*[A-Z])/,
		errStr: '1 uppercase and 1 lowercase letter required'
	},
	{
		_id: 'lastName',
		type: 'text',
		displayName: 'Last Name',
		placeholder: 'Last Name',
		required: true,
		re: /(?=.*[a-z])(?=.*[A-Z])/,
		errStr: '1 uppercase and 1 lowercase letter required',
	},
	email,
	password,
	{
		_id: 'birthday',
		type: 'text',
		required: true,
		re: /(^(0[13578]|1[02])\/31\/(19|20)\d{2}$)|(^(0[1,3-9]|1[012])\/(29|30)\/(19|20)\d{2}$)|(^02\/29\/(19|20)([02468][048]|[13579][26])$)|(^(0[1-9]|1[012])\/(0[1-9]|1\d|2[0-8])\/(19|20)\d{2}$)/,
		template: 'Helper_birthday',
		errStr: 'Invalid date'
	}
]);
