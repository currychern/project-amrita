import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Materialize } from 'meteor/poetic:materialize-scss';

import { Donor } from '../../api/schemas/_donor.js';

import './donor.html';

Template.Role_donor.helpers({
	donor: function() {
		return Donor.schema;
	},
	prepopulate: function() {
		if (Meteor.userId()) {
			if (Meteor.user().profile.recipient) {
				let recipient = Meteor.user().profile.recipient;
				let organization = recipient.organization;
				return {
					'organization.name': organization.name,
					'organization.phone': organization.phone,
					'organization.email': organization.email,
					'organization.address.street1': organization.address.street1,
					'organization.address.street2': organization.address.street2,
					'organization.address.city': organization.address.city,
					'organization.address.state': organization.address.state,
					'organization.address.zip': organization.address.zip
				};
			}
		}
	}
});

Template.Role_donor.onRendered(function () {
	// adds active class to labels as appropriate
	Materialize.updateTextFields();
	$('select :first-child').prop('disabled', true);
});
