var stream = require('stream')
  , util = require('util')

module.exports = Format

util.inherits(Format, stream.Transform)

// Pass through until you come to the token, at
// which point you start reading from the first argument until it emits its
// end event.

function Format(token, template_variable) {
  stream.Transform.call(this)
  this.stream = template_variable
  this.token = token
  this._cache = []
}

Format.prototype._transform = function(chunk, encoding, done) {
  if(chunk !== this.token) {
    return this.push(chunk)
  }

  if(this._cache.length) {
    this.push(this._cache.reduce(flatten, []))

    return done()
  }

  this.pause()
  this.stream.on('data', emit(this))
  this.stream.on('end', resume(this))
  done()
}

function flatten(lhs, rhs) {
  return lhs.concat(rhs)
}

function emit(self) {
  return function(data) {
    self.push(data)
    self._cache.push(data)
  }
}

function resume(self) {
  return function() {
    self.resume()
  }
}
