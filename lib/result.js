/**
 * Result module
 * @public
 */

"use strict";

var util = require("./util");
var prop = require("./prop");

util.extend(module.exports, {

	/**
	 * Sets the title of an assertion
	 * @param {String} title
	 * @param {Object} options
	 * returns {Void}
	 */

	title: function(title, options) {
		var instance = this;

		instance.write(
			instance.extend({
				title: title
			}, (options || {}))
		);
	},

	/**
	 * Writes the encoded result
	 * @param {Object} result
	 * @returns {Void}
	 */

	write: function(result) {
		util.log(this.encode(result));
	},

	/**
	 * Encodes the result of a given test
	 * @param {Object} result
	 * @returns {String}
	 */

	encode: function(result) {
		var output = "";

		if (result.type === "suiteTitle") {
			output += "## " + result.title;

			return output;
		} else if (result.type === "testTitle") {
			output += "\n";
			output += "# " + result.title;

			return output;
		}

		if (result.operator === "end") {
			output += "\n";
			output += ("count - " + result.count + "\n");
			output += ("skip - " + result.skip + "\n");
			output += ("ok - " + result.ok + "\n");
			output += ("not ok - " + result.notOk + "\n");

			return output;
		}

		if (prop.hasOwnProperty.call(result, "skip")) {
			output += "# SKIP ";
		}

		if (result.operator === "error") {
			output += "# ERROR ";
		}

		output += (result.ok && "ok " || "not ok ");
		output += result.id + " - ";
		output += result.message;

		return output;
	}
});
