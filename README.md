## domquery

Minimalistic jQuery-like DOM programming library. Aims to be lightweight enough to be included by compact library & component distributions.

```js
query = require('domquery')

query('ul li.fruit')
  .style('background-color', 'red') // or { 'background-color': 'red' }
  .attr('data-foo', 'bar')
  .removeClass('hidden')
  .click(onClickFruit) // or: on('click', onClickFruit)
  .addClass('open')
  .show()
```

## Install

```bash
$ npm install domquery
```

## API

* attr
* html
* off
* on
* show
* style
* text
* val

Class methods:

* addClass
* hasClass
* removeClass
* toggleClass

Event methods:

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

![](https://dl.dropboxusercontent.com/s/4nnw71f7k726wf3/npmel_29.jpg)
