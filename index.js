var newChain  = require("new-chain"),
    attr      = require('./lib/attr'),
    classList = require('./lib/classlist'),
    effects   = require('./lib/effects'),
    events    = require('./lib/events'),
    html      = require('./lib/html'),
    style     = require('./lib/style'),
    text      = require('./lib/text'),
    val       = require('./lib/val');

module.exports = select;

function each(fn, elements){
  return function(){
    var i, len, ret, params, ret;

    len    = elements.length;
    i      = -1;
    params = [undefined].concat(Array.prototype.slice.call(arguments));

    while ( ++i < len ) {
      params[0] = elements[i];
      ret = fn.apply(undefined, params);
    }

    return ret;
  };
}

function select(query){
  var key, chain, methods, elements;

  if ( typeof query == 'string' ) {
    elements = Array.prototype.slice.call(document.querySelectorAll(query));
  } else {
    elements = Array.prototype.slice.call(arguments);
  }

  methods = {
    addClass    : each(classList.addClass, elements),
    hasClass    : each(classList.hasClass, elements),
    removeClass : each(classList.removeClass, elements),
    toggleClass : each(classList.toggleClass, elements),
    show        : each(effects.show, elements),
    hide        : each(effects.hide, elements),
    style       : each(style, elements)
  };

  for ( key in events ) {
    methods[ key ] = each(events[key], elements);
  }

  chain = newChain.from(elements)(methods);

  chain.attr = each(attr(chain), elements);
  chain.html = each(html(chain), elements);
  chain.text = each(text(chain), elements);
  chain.val  = each(val(chain), elements);

  return chain;
}
