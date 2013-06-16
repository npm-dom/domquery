## domquery

A minimalistic clone of jQuery for only basic DOM programming.

```js
query = require('domquery')

query('ul li.fruit')
  .style('background-color', 'red') // or { 'background-color': 'red' }
  .attr('data-foo', 'bar')
  .removeClass('hidden')
  .on('click', onFruitClick)
  .addClass('open')
  .show()
```

## Motivation

domquery aims to be easy to embed in libraries supposed to be lightweight and easily distributed.

## Install

```bash
$ npm install domquery
```

## Usage Examples

### Events

```
query('#foo').on('click', function(eventArgs, element){

  eventArgs.screenX
  // => 123

});
```

## API

Not documented yet. Available methods are:

* addClass
* attr
* hasClass
* off
* on
* removeClass
* show
* style
* toggleClass

![](https://dl.dropboxusercontent.com/s/4nnw71f7k726wf3/npmel_29.jpg)
