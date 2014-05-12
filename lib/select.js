var newChain = require("new-chain");
var format = require('format-text');
var classes = require('dom-classes');
var tree = require('dom-tree');
var newElement = require('new-element');
var selectDOM = require('dom-select').all;
var style = require('dom-style');

var attr = require('./attr');
var events = require('./events');
var html = require('./html');
var text = require('./text');
var value = require('./value');

module.exports = select;

function each(fn, elements){
  if (!fn) throw new Error('Undefined function.');

  return function(){
    var i, len, ret, params, ret;

    len = elements.length;
    i = -1;
    params = [undefined].concat(Array.prototype.slice.call(arguments));

    while (++i < len) {
      params[0] = elements[i];
      ret = fn.apply(undefined, params);
    }

    return ret;
  };
}

function select(query){
  var key, chain, methods, elements;
  var task;

  if (typeof query == 'string' && query.charAt(0) == '<') {
    // Create new element from `query`
    elements = [newElement(query, arguments[1])];
  } else if (typeof query == 'string') {
    // Select given CSS query
    elements = Array.prototype.slice.call(selectDOM(query, arguments[1]));
  } else if (query == document) {
    elements = [document.documentElement];
  } else {
    elements = Array.prototype.slice.call(arguments);
  }

  methods = {
    addClass: each(classes.add, elements),
    removeClass: each(classes.remove, elements),
    toggleClass: each(classes.toggle, elements),
    show: each(style.show, elements),
    hide: each(style.hide, elements),
    style: each(style, elements)
  };

  for (key in events) {
    methods[key] = each(events[key], elements);
  }

  for (key in tree) {
    methods[key] = each(tree[key], elements);
  }

  chain = newChain.from(elements)(methods);

  chain.attr = each(attr(chain), elements);
  chain.classes = each(classes, elements);
  chain.hasClass = each(classes.has, elements),
  chain.html = each(html(chain), elements);
  chain.text = each(text(chain), elements);
  chain.val = each(value(chain), elements);
  chain.value = each(value(chain), elements);

  chain.select = function(query){
    return select(query, elements[0]);
  };

  return chain;
}
