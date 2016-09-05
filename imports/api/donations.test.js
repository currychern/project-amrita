/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Donations } from './donations.js';

if (Meteor.isServer) {
	describe('Donations', () => {
		describe('methods', () => {
			const userId = Random.id();
			let donationId;

			beforeEach(() => {
				Donations.remove({});
				donationId = Donations.insert({
					name: 'Test Donation',
					donationType: 'Produce',
					donor: userId,
					foods:
						[{ name: 'Food', amount: 100 }],
					createdBy: userId,
					createdAt: new Date(),
					updatedBy: userId,
					updatedAt: new Date()
				});
			});

			it('can delete owned donation', () => {
        /*
        const deleteDonation = Meteor.server.method_handlers['donation.remove'];

				const invocation = { userId };

				deleteDonation.apply(invocation, [donationId]);

				assert.equal(Donations.find().count(), 0);
        */
			});
		});
	});
}
