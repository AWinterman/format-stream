var stream = require('stream')
  , util = require('util')

module.exports = Format

util.inherits(Format, stream.Transform)

// Pass through until you come to the token, at
// which point you start reading from the first argument until it emits its
// end event.

function Format(context, match) {
  stream.Transform.call(this)
  this.stream = template_variable
  this.match = match || equal
  this.context = context
  this._cache = {}
}

Format.prototype._transform = function(chunk, encoding, done) {
  var flag = this.match(chunk, this.context)

  if(!flag) {
    this.push(chunk)

    return done()
  }

  if(this._cache[flag].length) {
    this.push(this._cache[flag].reduce(flatten, []))

    return done()
  }

  this.pause()
  this.stream.on('data', emit(this, flag))
  this.stream.on('end', resume(this))
  done()
}

function equal(lhs, rhs) {
  return lhs === rhs
}

function flatten(lhs, rhs) {
  return lhs.concat(rhs)
}

function emit(self, flag) {
  return function(data) {
    self.push(data)
    self._cache[flag].push(data)
  }
}

function resume(self) {
  return function() {
    self.resume()
  }
}
