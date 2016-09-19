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
