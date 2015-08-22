// Copyright 2014 Simon Lydell
// Copyright 2015 Charlie Rudolph
// X11 (“MIT”) Licensed. (See LICENSE.)

function asyncify(syncFn) {
  return function() {
    var args = Array.prototype.slice.call(arguments)
    var callback = args.pop()
    var result
    setImmediate(function() {
      try {
        result = syncFn.apply(this, args)
      } catch (error) {
        return callback(error)
      }
      callback(null, result)
    })
  }
}

module.exports = asyncify
