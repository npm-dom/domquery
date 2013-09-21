var newChain = require("new-chain"),
    format = require('new-format'),
    classes = require('dom-classes'),
    children = require('dom-children'),
    newElement = require('new-element'),
    query = require('select-dom'),
    style = require('style-dom'),

    attr = require('./attr'),
    events = require('./events'),
    html = require('./html'),
    isHTML = require('./is-html'),
    text = require('./text'),
    val = require('./val');

module.exports = select;

function each(fn, elements){
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

  if (isHTML(query)) {
    elements = [newElement(query, arguments[1])];
  } else if (typeof query == 'string') {
    elements = Array.prototype.slice.call((arguments[1] || document).querySelectorAll(query));
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

  for (key in children) {
    methods[key] = each(children[key], elements);
  }

  chain = newChain.from(elements)(methods);

  chain.attr = each(attr(chain), elements);
  chain.classes = each(classes, elements);
  chain.hasClass = each(classes.has, elements),
  chain.html = each(html(chain), elements);
  chain.text = each(text(chain), elements);
  chain.val = each(val(chain), elements);

  chain.select = function(query){
    return select(query, elements[0]);
  };

  return chain;
}
