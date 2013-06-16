## domquery

Minimalistic jQuery-like DOM programming library. Aims to be lightweight enough to libraries & components supposed to be distributed/shared.

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
