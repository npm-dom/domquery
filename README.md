## DOMQUERY

DOM Programming Library

## INSTALL

##### From NPM:

```bash
$ npm install domquery
```

##### Without NPM?

```bash
$ wget https://raw.github.com/azer/domquery/master/dist/domquery.min.js
```

```html
<script src="domquery.min.js"></script>
<script>
  query('.fruit').style('color', 'red').show()
</script>
```

## MANUAL

### Selecting Elements

```js
dom = require('domquery')
dom('body .foo .bar')
```

Details: [select-dom](https://github.com/azer/select-dom)

###  Changing Style Of Elements

```js
dom = require('domquery')

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

Details: [style-dom](https://github.com/azer/style-dom)

### Creating, Adding, Inserting Elements

Creating and inserting:

```js
dom = require('domquery')

dom('<h1>{title}</h1><div>{content}', { title: 'Hello!', content: 'lorem ipsum sit dolar amet' })
  .insert('body')
```

Adding:

```js
dom('body > ul')
  .add('<h1>{title}</h1><div>{content}', { title: 'Hello!', content: 'lorem ipsum sit dolar amet' })
```

Other Available Methods:
* addBefore(child, reference)
* addAfter(child, reference)
* replace(target, replacement)
* remove(element)
* remove(parent, child)

Details:  [dom-children](https://github.com/azer/dom-children)

### Changing CSS Classes

```js
dom = require('domquery')

dom('body').addClass('foobar')
```

Other Available Methods:
* addClass
* hasClass
* removeClass
* toggleClass

Details: [dom-classes](https://github.com/azer/dom-classes)

### Events

##### Adding:

```js
dom = require('domquery')

dom('body').on('click', callback = function (event) {
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

##### Removing:

```js
dom('body').off('click', callback) 
```

##### Delegation:

```js
dom('body button').on('click', function (event) {
  console.log('clicked a button!')
})
```

##### Keyboard Events:

```js
dom('input').on('> alt a', function (event) {
  console.log('user pressed alt + a')
})
```

Details:
* [on-off](https://github.com/azer/on-off)
* [bind-key](https://github.com/azer/bind-key)

### Reading & Changing Attributes

```js
dom = require('domquery')

dom('a.my-link').attr('href')
// => http://foobar.com

dom('a').attr('href', 'http://foobar.com')
```

## Reading & Changing DOM Content

Reading:

```js
dom('.foo').html() // equivalent of `innerHTML`
dom('input.my-input').val() // equivalent of `value`
```

```js
dom('.foo').html('<div>new content</div>')
dom('input.my-input').val('new value')
```

## TESTING

Run:

```bash
$ npm test
```

And visit localhost:7559.

![](https://dl.dropboxusercontent.com/s/ofqr0ha1all2nbl/npmel_30.jpg)
