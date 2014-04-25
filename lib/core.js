/**
 * Core module
 * @public
 */

"use strict";

var util = require("./util");
var prop = require("./prop");

util.extend(module.exports, {

	/**
	 * Handles the stack execution
	 * @returns {Void}
	 */

	run: function() {
		var instance = this;
		var stack = instance.tests;
		var index = 0;

		return (function done() {
			var layer = stack[index++];
			var arity;
			var errorMessage;

			instance._emit("done");

			instance._planCount = 0;

			if (!layer) {
				if (instance._calledEnd) {
					return;
				}

				instance._end();

				instance._calledEnd = true;

				return;
			}

			instance.title(layer.title, {
				type: "testTitle"
			});

			try {
				arity = layer.callback.length;

				if (arity === 2) {
					instance._skipCount++;

					instance._skip(layer.title);

					return done();
				}

				if ((errorMessage = layer.error)) {
					instance._error(errorMessage);
				}

				layer.callback.call(instance, done);
			} catch (error) {
				instance._error(error.message);

				return done();
			}
		})();
	},

	/**
	 * Emits event
	 * @param {String} event
	 * @returns {Void}
	 */

	_emit: function(event) {
		var instance = this;
		var index = -1;
		var collection = (instance.events[event] || []);
		var length = event.length;
		var callback;

		while (++index < length) {
			if ((callback = collection.shift())) {
				callback();
			}
		}
	},

	/**
	 * Listens for explict events
	 * @param {String} event
	 * @param {Function} callback
	 * @returns {Void}
	 */

	on: function(event, callback) {
		var instance = this;

		if (typeof callback !== "function") {
			return;
		}

		instance.events[event].push(callback);
	},

	/**
	 * Accesses `callback` as string to get specific information
	 * @param {Function} callback
	 * @returns {Object}
	 */

	_decompilation: function(callback) {
		var serialized = callback.toString();
		var clean = serialized.replace(prop.STRIP_COMMENTS, "");
		var params = clean.match(prop.FN_ARGS)[1];
		var param = params.replace(prop.FN_ARG, function(match, p1, p2) {
			return p2;
		}).split(prop.FN_ARG_SPLIT).shift();
		var body = serialized.match(prop.FN_BODY)[1];
		var dupes = 0;

		serialized.replace(body, function(match) {
			var isMatch = match.match(new RegExp("\\b" + param + "(\\([^\\)]*)", "g"))

			if (isMatch && isMatch.length > 1) {
				dupes++;
			}
		});

		return {
			param: param,
			dupes: dupes
		};
	},

	/**
	 * Creates the "test" stack
	 * @param {String} title
	 * @param {Function} callback
	 * @returns {Object}
	 */

	test: function(title, callback) {
		var instance = this;
		var options = {};
		var callbackData = instance._decompilation(callback);

		if (arguments.length !== 2) {
			title = "untitled test";
			callback = (typeof arguments[0] === "function" && arguments[0] || Assertively.noop);
		}

		instance.extend(options, {
			title: title,
			callback: callback
		});

		if (callbackData.dupes) {
			options.error =  callbackData.param + " is called more than once.";
		}

		instance.tests.push(options);

		return instance;
	},

	/**
	 * Starts the invocation of the stack
	 * @returns {Void}
	 */

	start: function() {
		this.run();
	}
});
