## DomQuery

jQuery-like handy DOM manipulation library composed from all small modules in NPM.

Example:

```js
var dom = require('domquery')

dom('ul.songs:last-child')
  .add('<li><a href="/play/{id}">Play: {title}</a></li>', { id: 123, title: "foo" })
  .show()
```

## Install

```bash
$ npm install domquery
```

## Usage

### Selecting

```js
var dom = require('domquery')
dom('body .foo .bar')
// => [array, of, elements]
```

Details: [dom-select](https://github.com/npm-dom/dom-select)

### Changing Style

```js
var dom = require('domquery')

dom('body .foo .bar')
  .style('background-color', 'red')
  // OR
  .style({
    'padding': '10px',
    'margin': '10px'
  })
```

Other available Methods:
* show
* hide

Details: [dom-style](https://github.com/npm-dom/dom-style)

### Adding and Removing Elements

domquery embeds [dom-tree](http://github.com/npm-dom) to provide following methods;

#### `.insert(parent element)`

Insert an element to a parent element.

```js
var dom = require('domquery')

dom('<h1>{title}</h1><div>{content}', { title: 'Hello!', content: 'world' })
  .insert('body')
```

#### `.add(child)`

Add a new element to specified parent element.

```js
dom('body > ul')
  .add('<li>Hello</li>')
```

Or;

```js
var row = dom('<li>{0}: {1}</li>', 123, 'Hello World')
dom('body > ul').add(row)
```

* `child` can be an element, array, selector or HTML.

#### `.addBefore(child, reference)`

Adds `child` before `reference`

```js
dom('ul.songs')
  .addBefore('<li>third song</li>', 'ul.songs li:nth-child(3)')
```

* `child` can be an element, array, selector or HTML.
* `reference` can be an element, array or selector.

#### `.addAfter(child, reference)`

Adds `child` after `reference`

```js
dom('ul.songs')
  .addAfter('<li>third song</li>', 'ul.songs li:nth-child(2)')
```

* `child` can be an element, array, selector or HTML.
* `reference` can be an element, array or selector.

#### `.replace(target, replacement)`

Replaces `target` with `replacement`

```js
dom('ul.songs')
  .replace('li:first-child', document.createElement('textarea'))
```

or:

```js
dom('ul.songs')
  .replace('li:first-child', '<li>{0}: {name}</li>', 123, 'new song')
```

#### `.remove(element)`

```js
dom('ul .songs').remove('li:first-child')
```

### Inline CSS

Methods: addClass, hasClass, removeClass, toggleClass

Example:
```js
var dom = require('domquery')

dom('body').addClass('foobar')

dom('body').hasClass('foobar')
// => true

dom('body').removeClass('foobar')

dom('body').hasClass('foobar')
// => false

dom('body').toggleClass('foobar')

dom('body').hasClass('foobar')
// => true
```

Other Available Methods:
* addClass
* hasClass
* removeClass
* toggleClass

Details: [dom-classes](https://github.com/npm-dom/dom-classes)

### Events

domquery embeds [dom-event](http://github.com/npm-dom/dom-event), [key-event](http://github.com/npm-dom/key-event) and [delegate-dom](http://github.com/npm-dom/delegate-dom) modules to provide following methods;

#### `.on(event, callback)`

Add a new event

```js
var dom = require('domquery')

dom('body').on('click', function (event) {
  console.log('clicked body')
})
```

Shortcuts:

```js
dom('ul li').click(function (event) {
  console.log('clicked a "li"')
})
```

* change
* click
* keydown
* keyup
* keypress
* mousedown
* mouseover
* mouseup
* resize

##### `.off(event, callback)`

Remove the event listener;

```js
dom('body').off('click', fn)
```

#### `.on(event, selector, callback)`

[Delegate event](http://github.com/npm-dom/delegate-dom) handler function for `selector`:

```js
dom('body ul').on('click', 'li', function (event) {
  console.log('clicked a list item!')
})
```

#### `.on(> event, callback)`

Events started with `>` will be considered as a [keyboard event](http://github.com/npm-dom/key-event):

```js
dom('input').on('> alt a', function (event) {
  console.log('user pressed alt + a')
})
```

### Attributes

```js
var dom = require('domquery')

dom('a.my-link').attr('href')
// => http://foobar.com

dom('a').attr('href', 'http://foobar.com')
```

### Content

Reading:

```js
dom('.foo').html() // equivalent of `innerHTML`
dom('input.my-input').val() // equivalent of `value`
```

Setting:

```js
dom('.foo').html('<div>new content</div>')
dom('input.my-input').val('new value')
```

More info about it is at [dom-value](http://github.com/npm-dom/dom-value)

![](https://dl.dropboxusercontent.com/s/ofqr0ha1all2nbl/npmel_30.jpg)
