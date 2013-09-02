# Format-Stream #

A streaming simple formatter. 

## API ##

```javascript
var format = new Format(token, stream)
```

`format` is a transform stream that checks if each chunk of data matches the
token. If it does not, then the chunk is passed through. Otherwise, `format`
emits data from the second argument, `stream` until it is consumed.

## Example ##
Suppose you have a file called `base-template.html`:
```html 
<html>
    <head>
        <title>"Your app!"</title>
    </head>
    <body>
        {{welcome}}
    </body>
</html>
```

And one called `welcome-template.html`.
```
<p>"Hey you party people!"</p>
```

In index.js you write:
```javascript
var Sentinal = require('sentinal-stream')
  , Format = require('format-stream')
  , token = '{{welcome}}'

var inside_stream = fs.createReadStream('welcome-template.html')
  , outside_stream = fs.createReadStream('base-template.html')

// Make sure any instance of {{welcome}} is emitted in its
// own data event
var tokenizer = new Sentinal(new Buffer(token)) 
  , format = new Format(token, inside_stream)

outside_stream
    .pipe(tokenizer)
    .pipe(format)
    .pipe(process.stdout)
```

Then `node index.js` will print:

```
<html>
    <head>
        <title>"Your app!"</title>
    </head>
    <body>
        <p>"Hey you party people!"</p>
    </body>
</html>
```
