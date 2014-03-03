// Copyright 2014 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

var test     = require("tape")
var asyncify = require("../")

"use stict"

test("asyncify", function(t) {

  t.plan(5)

  t.equal(typeof asyncify, "function", "is a function")

  function addSync(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
      throw new TypeError("add requires two numbers")
    }
    return a + b
  }

  var add = asyncify(addSync)

  var next = false

  add(1, 2, function(error, sum) {
    t.equal(sum, 3, "accepts arguments, passes return value")
    t.ok(next, "is async")
  })

  add(1, function(error, sum) {
    t.equal(error.message, "add requires two numbers", "passes caught errors")
    t.ok(next, "is async")
  })

  next = true

})
