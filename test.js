var concat = require('concat-stream')
  , Format = require('./')
  , from = require('from')

var source = from([
    'halo '
  , '{{name}}'
  , ', '
  , 'hertzlich '
  , 'wilkommen '
  , 'bei deutschland '
])

var name_stream = from([
    'herr '
  , 'doctor '
  , 'professor '
  , 'Albert '
  , 'Einstein '
  , 'from Ülm '
  , 'the kingdom of Wurtenburg'
])

var expected = 'halo herr doctor professor Albert Einstein from Ülm the ' +
  'kingdom of Wurtenburg, hertzlich wilkommen bei deutschland '

var name = new Format('{{name}}', name_stream)

var test = concat(function(data) {
  assert.equal(data, expected)
})

source
  .pipe(name)
  .pipe(test)
