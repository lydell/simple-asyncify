Overview [![Build Status](https://travis-ci.org/lydell/simple-asyncify.svg?branch=master)](https://travis-ci.org/lydell/simple-asyncify)
========

Turns sync functions into Node.js-style async ones.

Inspired by [node-asyncify].

```js
var asyncify = require("simple-asyncify")

function addSync(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("add requires two numbers")
  }
  return a + b
}

var add = asyncify(addSync)

add(1, 2, function(error, sum) {
  console.log("The sum is: " + sum)
})

add(1, function(error, sum) {
  console.log(error.message)
})

console.log("Let’s do some math!")

// Let’s do some math!
// The sum is: 3
// add requires two numbers
```

[node-asyncify]: https://github.com/jden/nodeAsyncify


Installation
============

`npm install simple-asyncify`

```js
var asyncify = require("simple-asyncify")
```


Usage
=====

### `asyncify(syncFn)` ###

Returns an async function that accepts the same arguments as `syncFn` plus a
callback. It runs `syncFn` with the arguments. If `syncFn` throws an error, the
callback is invoked with that error. Otherwise the callback is invoked with
`null` and the return value of `syncFn`.

`setImmediate` is used to make the function async.


License
=======

[The X11 (“MIT”) License](LICENSE).
