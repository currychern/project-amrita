import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { Driver } from '../../api/schemas/_driver.js';

import './driver.html';

Template.Role_driver.helpers({
	driver: function() {
		return Driver.schema;
	}
});

Template.Role_driver.onRendered(function () {
	$('select :first-child').prop('disabled', true);
});
