## domquery

DOM Programming Library

```js
dom = require('domquery')

dom('ul li.fruit')
  .style('background-color', 'red') // or { 'background-color': 'red' }
  .attr('data-foo', 'bar')
  .click(onClickFruit) // or: on('click', onClickFruit)
  .addClass('open')
  .add('<h1>{title}</h1>{content}', { title: 'Hello', content: 'lorem ipsum' })
  .on('click', function () { alert('clicked <ul>'); })
  .on('click li', function () { alert('clicked <li>') })
  .show()
```

Keyboard events:

```js
dom('<input />')
  .on('> ctrl alt space', function(element, event){ alert('hello!'); })
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
* addAfter
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

## Manuals

domquery is based on following libraries. check out their manuals for detailed info:

* [bind-key](http://github.com/azer/bind-key)
* [on-off](http://github.com/azer/on-off)
* [dom-classes](http://github.com/azer/dom-classes)
* [dom-children](http://github.com/azer/dom-children)
* [new-element](http://github.com/azer/new-element)
* [select-dom](http://github.com/azer/select-dom)
* [style-dom](http://github.com/azer/style-dom)

## Testing

Run:

```bash
$ npm test
```

And visit localhost:7559.

![](https://dl.dropboxusercontent.com/s/ofqr0ha1all2nbl/npmel_30.jpg)
