# Between #

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
  , Inject = require('inject-stream')
  , token = '{{welcome}}'

var inside_stream = fs.createReadStream('welcom-template.html')
  , outside_stream = fs.createReadStream('base-template.html')

var tokenizer = new Sentinal(new Buffer(token))
  , inject = new Inject(token, inside_stream)

outside_stream
    .pipe(tokenizer)
    .pipe(between)
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
