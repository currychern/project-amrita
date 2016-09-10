import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import './signin.html';

Template.Accounts_signin.events({
	'click .close-login': () => {
		Session.set('modal-toggle', '');
	}
});
