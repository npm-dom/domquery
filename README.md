## domquery

Minimalistic jQuery-like DOM programming library for compact library & component distributions.

```js
dom = require('domquery')

dom('ul li.fruit')
  .style('background-color', 'red') // or { 'background-color': 'red' }
  .attr('data-foo', 'bar')
  .click(onClickFruit) // or: on('click', onClickFruit)
  .addClass('open')
  .add('<span>hello!</span>')
  .on('click', function(){ alert('yo!'); })
  .show()
```

Keyboard events:

```js
dom('<input />')
  .on(':ctrl :alt :space', function(element, event){ alert('hello!'); })
  .insert('body');
```

See full API below and tests for more docs.

## Install

```bash
$ npm install domquery
```

Or:

```bash
$ wget https://raw.github.com/azer/domquery/master/dist/domquery.min.js
```

```html
<script src="domquery.min.js"></script>
<script>
  query('.fruit').style('color', 'red').show()
</script>
```

## API

* attr
* html
* text
* val

Element methods:

* add
* addBefore
* replace
* remove

Class methods:

* addClass
* hasClass
* removeClass
* toggleClass

CSS Methods

* show
* style
* hide

Event methods:

* off
* on
* change
* click
* keydown
* keyup
* keypress
* mousedown
* mouseover
* mouseup
* resize

## Testing

Run:

```bash
$ npm test
```

And visit localhost:7559.

![](https://dl.dropboxusercontent.com/s/ofqr0ha1all2nbl/npmel_30.jpg)
