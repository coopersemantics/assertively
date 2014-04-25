/**
 * Assert module
 * @public
 */

"use strict";

var util = require("./util");
var deepEqual = require("deep-equal");

util.extend(module.exports, {

	/**
	 * Asserts the results
	 * @param {Boolean} result
	 * @param {Object} options
	 * @param {Boolean}
	 * @returns {Void}
	 */

	_assert: function(result, options) {
		var instance = this;
		var res;

		options = (options || {});

		if (instance._calledEnd) {
			return;
		}

		if (options.operator === "end") {
			return instance.write(options);
		}

		if (result) {
			instance._ok++;
		}

		res = instance.extend({
			id: ++instance._assertCount,
			ok: Boolean(result),
			count: instance._planCount++
		}, options);

		res.message = (options.message || "unnamed assert");

		instance.write(res);
	},

	/**
	 * Determines if the given argument is "truthy"
	 * @param {*} value
	 * @param {String} message
	 * @returns {Void}
	 */

	ok: function(value, message) {
		this._assert(!!value, {
			message: message,
			operator: "ok",
			actual: value
		});
	},

	/**
	 * Determines if the given argument is "falsey"
	 * @param {*} value
	 * @param {String} message
	 * @returns {Void}
	 */

	notOk: function(value, message) {
		this._assert(!value, {
			message: message,
			operator: "ok",
			actual: value
		});
	},

	/**
	 * Determines if the given arguments are equal (===)
	 * @param {*} actual
	 * @param {*} expected
	 * @param {String} message
	 * @returns {Void}
	 */

	equal: function(actual, expected, message) {
		this._assert((actual === expected), {
			message: message,
			operator: "equal",
			actual: actual,
			expected: expected
		});
	},

	/**
	 * Determines if the given arguments are not equal (!==)
	 * @param {*} actual
	 * @param {*} expected
	 * @param {String} message
	 * @returns {Void}
	 */

	notEqual: function(actual, expected, message) {
		this._assert((actual !== expected), {
			message: message,
			operator: "notEqual",
			actual: actual,
			expected: expected
		});
	},

	/**
	 * Determines if the given arguments are equal (==)
	 * @param {*} actual
	 * @param {*} expected
	 * @param {String} message
	 * @returns {Void}
	 */

	looseEqual: function(actual, expected, message) {
		this._assert((actual == expected), {
			message: message,
			operator: "looseEqual",
			actual: actual,
			expected: expected
		});
	},

	/**
	 * Determines if the given arguments are not equal (!=)
	 * @param {*} actual
	 * @param {*} expected
	 * @param {String} message
	 * @returns {Void}
	 */

	notLooseEqual: function(actual, expected, message) {
		this._assert((actual != expected), {
			message: message,
			operator: "notLooseEqual",
			actual: actual,
			expected: expected
		});
	},

	/**
	 * Determines if the given arguments are equal (===),
	 * according to a recursive equality algorithm
	 * @param {*} actual
	 * @param {*} expected
	 * @param {String} message
	 * @returns {Void}
	 */

	deepEqual: function(actual, expected, message) {
		this._assert(deepEqual(actual, expected, { strict: true }), {
			message: message,
			operator: "deepEqual",
			actual: actual,
			expected: expected
		});
	},

	/**
	 * Determines if the given arguments are not equal (!==),
	 * according to a recursive equality algorithm
	 * @param {*} actual
	 * @param {*} expected
	 * @param {String} message
	 * @returns {Void}
	 */

	notDeepEqual: function(actual, expected, message) {
		this._assert(!deepEqual(actual, expected, { strict: true }), {
			message: message,
			operator: "deepEqual",
			actual: actual,
			expected: expected
		});
	},

	/**
	 * Determines if a given callback "throws" an error
	 * @param {Function} callback
	 * @param {Boolean} expected
	 * @returns {Void}
	 */

	throws: function(callback, expected, message) {
		var caught;

		try {
			callback();
		} catch (error) {
			caught = {
				error: error
			};
		}

		this._assert(!!caught, {
			message: message,
			operator: "throws",
			actual: !!caught,
			expected: expected,
			error: (caught && caught.error)
		});
	},

	/**
	 * Passed assert
	 * @param {String} message
	 * @returns {Void}
	 */

	pass: function(message) {
		this._assert(true, {
			message: message,
			operator: "pass"
		});
	},

	/**
	 * Failed assert
	 * @param {String} message
	 * @returns {Void}
	 */

	fail: function(message) {
		this._assert(false, {
			message: message,
			operator: "fail"
		});
	},

	/**
	 * Skipped assert
	 * @param {String} message
	 * @returns {Void}
	 */

	_skip: function(message) {
		this._assert(true, {
			message: message,
			operator: "skip",
			skip: true
		});
	},

	/**
	 * Error assert
	 * @param {String} message
	 * @returns {Void}
	 */

	_error: function(message) {
		var instance = this;

		instance._planCount--;
		
		instance._assert(false, {
			message: message,
			operator: "error"
		});
	},

	/**
	 * Determines if the expected number is equal to the actual number (tests)
	 * @param {Number} expected
	 * @returns {Void}
	 */

	plan: function(expected) {
		var instance = this;

		instance.on("done", function() {
			if (instance._planCount !== expected) {
				return instance.fail("plan !== expected");
			}

			instance.pass("plan === expected");
		});
	},

	/**
	 * Invokes at the end of all assertions (providing a full summary)
	 * @returns {Void}
	 */

	_end: function() {
		var instance = this;

		instance._assert(true, {
			operator: "end",
			count: instance._assertCount,
			skip: instance._skipCount,
			ok: instance._ok,
			notOk: (instance._assertCount - instance._ok)
		});
	}
});
