/**
 * Assertively module
 * @public
 */

"use strict";

var util = require("./util");

/**
 * Creates a new instance of "Assertively.fn.init"
 * @constructor
 * @param {String} title
 * @param {Function} callback
 * @returns {Object}
 * @public
 */

var Assertively = exports = module.exports = function(title, callback) {
	return new Assertively.fn.init(title, callback);
};

Assertively.fn = Assertively.prototype;
Assertively.extend = Assertively.fn.extend = util.extend;

Assertively.fn.extend({
	init: function(title, callback) {
		this.tests = [];
		this._ok = 0;
		this._assertCount = 0;
		this._skipCount = 0;
		this._calledEnd = false;
		this.events = {
			done: []
		};

		this.title(title, {
			type: "suiteTitle"
		});

		callback(this);
	}
});

Assertively.fn.init.prototype = Assertively.fn;

Assertively.extend(util);

[
	require("./core"),
	require("./assert"),
	require("./result")
].forEach(function(mod) {
	Assertively.fn.extend(mod);
});

global.Assertively = Assertively;
