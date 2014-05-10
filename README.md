# assertively.js [![Build Status](https://secure.travis-ci.org/coopersemantics/assertively.png?branch=master)](https://travis-ci.org/coopersemantics/assertively)

## What's Required

assertively.js requires [git](http://git-scm.com/downloads) and [Node.js](http://nodejs.org/download/) before proceeding.

## Quick Start

assertively.js uses [Browserify](https://github.com/substack/node-browserify) for compiling client code.

```bash
# Clone the assertively.js git repo
$ git clone git@github.com:coopersemantics/assertively.git

# Navigate to the root /assertively directory
$ cd assertively

# Install necessary dependencies
$ {sudo} npm install -g browserify
$ npm install
```

## Compiling Client Code

```bash
# Standard option
$ browserify ./ -o assertively.js

# For a list of options
$ browserify
```

## API Documentation

assertively.js assertion methods inspired by [tape](https://github.com/substack/tape).

```
var assertively = require("assertively");
```

### assertively(title, callback)

Creates a new test suite with `title` and `callback`. `callback(assert)` is invoked
with the new test suite object `assert`.

Type: (`title {String}`, `callback {Function}`)

### assertively.extend([destination, ]source)

Copies all properties from `source` to an optional `destination` object. If `destination` is not provided, the default is `this`, which in context is `assertively`.

Type: ([`destination {Object}`, ]`source {Object}`)

### assertively.fn.extend([destination, ]source)

Copies all properties from `source` to an optional `destination` object. If `destination` is not provided, the default is `this`, which in context is `assertively.prototype`.

Type: ([`destination {Object}`, ]`source {Object}`)

### assert.test([title, ]callback)

Creates a new test with an optional `title` string and a `callback` function. `callback(done[, skip])` is invoked
with a `done` function and an optional `skip`.

Type: ([`title {String}`, ]`callback {Function}`)

### assert.start()

Starts invoking the tests serially.

### done()

Declares that a given test is done.

### .on(event, callback)

Invokes `callback` on done state.

Type: (`event {String}`, `callback {Function}`)

Note: Currently, `"done"` is the only supported event.

### .plan(expected)

Declares that `expected` assertions should be invoked per test. If `expected` doesn't match the actual count,
the test fails.

Type: (`expected {Number}`)

### .pass([message])

Generates a passed assertion with an optional `message`.

Type: ([`message {String}`])

### .fail([message])

Generates a failed assertion with an optional `message`.

Type: ([`message {String}`])

### .ok(value[, message])

Asserts that `value` is truthy with an optional `message`.

Type: (`value {*}`[, `message {String}`])

### .notOk(value[, message])

Asserts that `value` is falsey with an optional `message`.

Type: (`value {*}`[, `message {String}`])

### .equal(actual, expected[, message])

Asserts that `actual === expected` with an optional `message`.

Type: (`actual {*}`, `expected {*}`[, `message {String}`])

### .notEqual(actual, expected[, message])

Asserts that `actual !== expected` with an optional `message`.

Type: (`actual {*}`, `expected {*}`[, `message {String}`])

### .looseEqual(actual, expected[, message])

Asserts that `actual == expected` with an optional `message`.

Type: (`actual {*}`, `expected {*}`[, `message {String}`])

### .notLooseEqual(actual, expected[, message])

Asserts that `actual != expected` with an optional `message`.

Type: (`actual {*}`, `expected {*}`[, `message {String}`])

### .deepEqual(actual, expected[, message])

Asserts that `actual` and `expected` have the same structure and nested values (uses deep-equal)
with an optional `message`.

Type: (`actual {*}`, `expected {*}`[, `message {String}`])

### .notDeepEqual(actual, expected[, message])

Asserts that `actual` and `expected` do not have the same structure and nested values (uses deep-equal)
with an optional `message`.

Type: (`actual {*}`, `expected {*}`[, `message {String}`])

### .throws(callback, expected[, message])

Asserts that `callback()` throws an `expected` exception with an optional `message`.

Type: (`callback {Function}`, `expected {Boolean}`[, `message {String}`])

## Versioning

Releases will be numbered using the following format:

```
<major>.<minor>.<patch>
```

And constructed with the following guidelines:

- Breaking backward compatibility **bumps the major** while resetting minor and patch
- New additions without breaking backward compatibility **bumps the minor** while resetting the patch
- Bug fixes and misc. changes **bumps only the patch**

For more information on SemVer, please visit <http://semver.org/>.

## Author

coopersemantics

## Copyright and License

Copyright 2014 coopersemantics under the [MIT license](https://github.com/coopersemantics/assertively/blob/master/MIT-LICENSE.txt).
