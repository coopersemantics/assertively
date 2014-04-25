/**
 * Order
 */

"use strict";

var assertively = require("../");

assertively("Order", function(assert) {
	var count = 0;

	assert
		.test("Layer 0", function(done) {
			this.equal(count++, 0);
			done();
		})
		.test("Layer 1", function(done) {
			Assertively.delay(function() {
				this.equal(count++, 1);
				done();
			}.bind(this), 1000);
		})
		.test("Layer 2", function(done) {
			this.equal(count++, 2);
			done();
		})
		.start();
});
