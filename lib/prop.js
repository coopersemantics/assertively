/**
 * Prop module
 * @public
 */

"use strict";

module.exports = {
	slice: Array.prototype.slice,
	hasOwnProperty: Object.prototype.hasOwnProperty,
	FN_ARGS: /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
	FN_ARG: /^\s*(_?)(\S+?)\1\s*$/,
	FN_ARG_SPLIT: /,/,
	STRIP_COMMENTS: /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,
	FN_BODY: /^[^{]*{((.*\n*)*)}/m
};

