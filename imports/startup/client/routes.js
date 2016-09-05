import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/home.js';
import '../../ui/layouts/main.js';

FlowRouter.route('/', {
	name: 'App.home',
	action() {
		BlazeLayout.render('Main_layout', { main: 'App_home'});
	}
});
