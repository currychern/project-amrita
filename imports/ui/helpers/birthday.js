import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './birthday.html';

Template.Helper_birthday.onRendered(function(){
	$(document).ready(function() {
		$('select').material_select();
		$('.birthday-tooltip').attr('data-tooltip', 'To register, you must be 18 or older.');
		$('.tooltipped').tooltip({ delay: 50 });

		assignDate('#month');
		assignDate('#day');
		assignDate('#year');

		var $month, $day, $year;
		function assignDate(idStr) {
			$(idStr).on('change', function() {
				switch (idStr) {
				case '#month':
					$month = $(this).val();
					break;
				case '#day':
					$day = ('0' + $(this).val()).slice(-2);
					break;
				case '#year':
					$year = $(this).val();
					break;
				}
				$('#at-field-birthday').val($month + '/' + $day + '/' + $year);
			});
		}
    
	});
});
