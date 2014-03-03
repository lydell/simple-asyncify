// Copyright 2014 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

function asyncify(syncFn) {
  return function() {
    var args = Array.prototype.slice.call(arguments)
    var callback = args.pop()
    setImmediate(function() {
      try {
        callback(null, syncFn.apply(this, args))
      } catch (error) {
        callback(error)
      }
    })
  }
}

module.exports = asyncify
