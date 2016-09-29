import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';

Template.registerHelper('extendContext', function(key, value) {
	let result = _.clone(this);
	result[key] = value;
	return result;
});
