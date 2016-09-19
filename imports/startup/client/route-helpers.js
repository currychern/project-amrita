import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.registerHelper('routeToRegistration', () => {
	if (Meteor.user()) {
		FlowRouter.go(FlowRouter.current().path + '/register');
	}
	else {
		FlowRouter.go('/');
	}
});

Template.registerHelper('routeToParent', () => {
	if (Meteor.user()) {
		let current = FlowRouter.current().path;
		let parent = current.substring(0, current.lastIndexOf('/'));
		FlowRouter.go(parent);
	}
	else {
		FlowRouter.go('/');
	}
});
