/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Factory } from 'meteor/dburles:factory';
import { assert } from 'meteor/practicalmeteor:chai';

import { Donations } from './donations.js';
import { update, remove } from './methods.js';

if (Meteor.isServer) {

	describe('donations', function () {

		describe('methods', function () {
			let donationId;
			let donationArgs;
			let userId;

			beforeEach(function () {
				// Clear
				Donations.remove({});
				// Create a donation

				// Generate a 'user'
				userId = Random.id();

				// Create a new donation
				donationArgs = {
					nickname: 'nickname',
					donationType: 'produce',
					foods: [{name: 'Tuna', amount: '100lbs'}],
					createdBy: userId,
					createdAt: new Date()
				};

				donationId = Factory.create('donation', donationArgs)._id;
			});

			describe('update', () => {
				it('updates the donation, but not if you don\'t have permission', function () {

					// Set up method arguments and context
					const methodInvocation = { userId };
					const args = {
						_id: donationId,
						modifier: {
							$set: {
								nickname: 'new nickname',
								donationType: donationArgs.donationType,
								foods: donationArgs.foods
							},
							$unset:{
								updatedBy: null,
								updatedAt: new Date()
							}
						}
					};

					// A logged in user should be able to update
					update._execute(methodInvocation, args);

					assert.equal(Donations.findOne(donationId).nickname, 'new nickname');

					// Throws if another user, or logged out user, tries to change the name
					assert.throws(() => {
						update._execute({ userId: Random.id() }, args);
					}, Meteor.Error, /donations.update.accessDenied/);

					assert.throws(() => {
						update._execute({}, args);
					}, Meteor.Error, /donations.update.accessDenied/);

					// Confirm name didn't change
					assert.equal(Donations.findOne(donationId).nickname, 'new nickname');
				});
			});

			describe('remove', function () {
				it('deletes the donation, but not if you don\'t have permission', function () {

					// Throws if another user, or logged out user, tries to delete the list
					assert.throws(() => {
						remove._execute({ userId: Random.id() }, { donationId });
					}, Meteor.Error, /donations.remove.accessDenied/);

					assert.throws(() => {
						remove._execute({}, { donationId });
					}, Meteor.Error, /donations.remove.accessDenied/);

					// Works fine
					remove._execute({ userId }, { donationId });
				});
			});

		});
	});
}
