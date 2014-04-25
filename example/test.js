/**
 * Test
 */

"use strict";

var assertively = require("../");
var timethat = require("timethat");

// Extending Assertively's __proto__

assertively.fn.extend({
	time: function() {
		var start = Date.now();

		this.on("done", function() {
			var end = Date.now();

			assertively.log(timethat.calc(start, end));
		});
	}
});

assertively("Truthy/Falsey module", function(assert) {
	assert
		.test("Truthy values", function(done) {
			this.plan(2);
			this.time();
			this.equal(+[], 0, "+[] === 0");
			this.ok(!0, "!!!0");
			done();
		})
		.test("Falsey values", function(done) {
			this.plan(2);
			this.time();
			this.notEqual(null, undefined, "null !== undefined");
			this.notOk(!0, "!!0 - should fail");
			done();
		})
		.start();
});
