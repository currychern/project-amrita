import { AccountsTemplates } from 'meteor/useraccounts:core';
import { Roles } from 'meteor/alanning:roles';

AccountsTemplates.configure({
	postSignUpHook: function(userId) {
		Roles.addUsersToRoles(userId, ['user']);
	}
});
