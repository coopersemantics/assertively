/**
 * Util module
 * @public
 */

"use strict";

var prop = require("./prop");

/**
 * Copies all properties from "source" to "destination" object
 * @param {Object} destination
 * @param {Object} source
 * @returns {Object}
 */

var extend = exports.extend = function(destination, source) {
	var property;

	if (arguments.length !== 2) {
		source = arguments[0];
		destination = this;
	}

	for (property in source) {
		destination[property] = source[property];
	}

	return destination;
};

extend(exports, {

	/**
	 * No operation function
	 * @returns {Void}
	 */

	noop: function() {},

	/**
	 * Delays function execution for the given amount of ms
	 * @param {Function} callback
	 * @param {Number} wait
	 * @returns {Number}
	 */

	delay: function(callback, wait) {
		var args = prop.slice.call(arguments, 2);

		return global.setTimeout(function() {
			return callback.apply(null, args);
		}, (wait || 1));
	},

	/**
	 * Defers function execution, until the current
	 * callstack has cleared
	 * @param {Function} callback
	 * @returns {Number}
	 */

	defer: function(callback) {
		var instance = this;

		return instance.delay.apply(instance, [callback, 1].concat(prop.slice.call(arguments, 1)));
	},

	/**
	 * Logs the given arguments to the console
	 * @param(s) {*} Arguments
	 * @returns {Void}
	 */

	log: function() {
		console.log.apply(console, arguments);
	}
});
