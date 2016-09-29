import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './nav-item.html';

Template.Helper_nav_item.helpers({
	activeClass: function() {
		// Note: only getRouteName is reactive, so we have to call it
		let routeName = FlowRouter.getRouteName();

		let parentsToIgnore = ['/'];
		let current = FlowRouter.current().path;
		let parent = current.substring(0, current.lastIndexOf('/'));

		if (parentsToIgnore.indexOf(parent) > -1) {
			parent = '/invalid_page';
		}

		if (current === this.href || parent === this.href) {
			return 'active';
		}
		return '';
	}
});
