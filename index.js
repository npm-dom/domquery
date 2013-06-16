var newChain  = require("new-chain"),
    attr      = require('./lib/attr'),
    classList = require('./lib/classlist'),
    effects   = require('./lib/effects'),
    events    = require('./lib/events'),
    style     = require('./lib/style');

module.exports = select;

function each(fn, elements){
  return function(){
    var i, len, ret, params;

    len    = elements.length;
    i      = -1;
    params = [undefined].concat(Array.prototype.slice.call(arguments));

    while ( ++i < len ) {
      params[0] = elements[i];
      fn.apply(undefined, params);
    }
  };
}


function select(query){
  var chain, elements;

  elements = Array.prototype.slice.call(document.querySelectorAll(query));

  chain = newChain.from(elements)({
    addClass    : each(classList.addClass, elements),
    hasClass    : each(classList.hasClass, elements),
    removeClass : each(classList.removeClass, elements),
    toggleClass : each(classList.toggleClass, elements),
    show        : each(effects.show, elements),
    hide        : each(effects.hide, elements),
    style       : each(style, elements)
  });

  chain.attr = function(name, value){

    if ( arguments.length == 1 ) {
      return attr(elements[0], name);
    }

    each(attr, elements)(name, value);

  };

  return chain;
}
