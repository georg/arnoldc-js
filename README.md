# ArnoldC.js

JavaScript version of [ArnoldC](https://github.com/lhartikk/ArnoldC).

## Examples

Check out the [examples](examples).

## Usage

### Transpile ArnoldC to JavaScript

```javascript
var arnoldC = require('arnoldc')
console.log(arnoldC.js("IT'S SHOWTIME\nTALK TO THE HAND \"hello world\"\nYOU HAVE BEEN TERMINATED"))
```

### Execute ArnoldC

```javascript
var arnoldC = require('arnoldc')
console.log(arnoldC.exec("IT'S SHOWTIME\nTALK TO THE HAND \"hello world\"\nYOU HAVE BEEN TERMINATED"))
```

### Automatically execute all arnoldC scripts

```html
<script type="text/arnoldc">
IT'S SHOWTIME
TALK TO THE HAND "hello world"
YOU HAVE BEEN TERMINATED
</script>

<!-- lodash library -->
<script src="lodash.js"></script>
<!-- arnoldC -->
<script src="arnoldc.browser.min.js"></script>
```

## Contributing

1. Fork it ( http://github.com/georgf/arnoldc-js/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
