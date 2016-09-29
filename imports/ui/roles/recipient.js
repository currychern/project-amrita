import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { Recipient } from '../../api/schemas/_recipient.js';

import './recipient.html';

Template.Role_recipient.helpers({
	recipient: function() {
		return Recipient.schema;
	},
	prepopulate: function() {
		if (Meteor.userId()) {
			if (Meteor.user().profile.donor) {
				let donor = Meteor.user().profile.donor;
				let organization = donor.organization;
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

Template.Role_recipient.onRendered(function () {
	$('select').material_select();
	$('select :first-child').prop('disabled', true);
});
