import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Materialize } from 'meteor/poetic:materialize-scss';
import { $ } from 'meteor/jquery';

import { Donor } from '../../api/schemas/_donor.js';

import './donor.html';

Template.Role_donor.helpers({
	donor: function() {
		return Donor.schema;
	}
});

Template.Role_donor.onRendered(function () {
	// adds active class to labels as appropriate
	Materialize.updateTextFields();

	$('#address\\.state :first-child').prop('disabled', true);
});

Template.Role_donor.events({
	'click .click-this': function() {
		let userId = Meteor.userId();

		const newMailingAddress = {
			addressCountry: 'US',
			addressLocality: 'Seattle',
			addressRegion: 'WA',
			postalCode: '98052',
			streetAddress: '20341 Whitworth Institute 405 N. Whitworth'
		};

		Meteor.users.update(userId, {
			$set: {
				'profile.mailingAddress': newMailingAddress
			}
		});

	}
});
