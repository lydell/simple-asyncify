// Copyright 2014 Simon Lydell
// Copyright 2015 Charlie Rudolph
// X11 (“MIT”) Licensed. (See LICENSE.)

var test     = require("tape")
var asyncify = require("../")
var domain   = require("domain")

"use stict"

test("asyncify", function(t) {

  t.plan(7)

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

  var d = domain.create()

  d.on("error", function(error) {
    t.equal(error.message, "callback error", "does not catch errors thrown in callback")
  })

  d.run(function(){
    add(1, 2, function(error, sum) {
      t.equal(error, null)
      throw new Error("callback error")
    })
  })

  next = true

})
