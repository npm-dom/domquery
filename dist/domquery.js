;(function(process){  require.m = { 0:[function(require,module,exports){ window.query = window.domQuery = window.DOMQuery = require('./index');
 },{"./index":1}],1:[function(require,module,exports){ var select = require("./lib/select"),
    create = require('./lib/create');

module.exports = select;
module.exports.create = create;
 },{"./lib/select":2,"./lib/create":17}],2:[function(require,module,exports){ var newChain  = require("new-chain"),
    attr      = require('./attr'),
    children  = require('./children'),
    classList = require('./classlist'),
    effects   = require('./effects'),
    events    = require('./events'),
    html      = require('./html'),
    style     = require('./style'),
    text      = require('./text'),
    val       = require('./val');

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
  } else if ( query == document ) {
    elements = [document.documentElement];
  } else {
    elements = Array.prototype.slice.call(arguments);
  }

  methods = {
    addClass    : each(classList.addClass, elements),
    removeClass : each(classList.removeClass, elements),
    toggleClass : each(classList.toggleClass, elements),
    show        : each(effects.show, elements),
    hide        : each(effects.hide, elements),
    style       : each(style, elements)
  };

  for ( key in events ) {
    methods[ key ] = each(events[key], elements);
  }

  for ( key in children ) {
    methods[ key ] = each(children[key], elements);
  }

  chain = newChain.from(elements)(methods);

  chain.attr     = each(attr(chain), elements);
  chain.hasClass = each(classList.hasClass, elements),
  chain.html     = each(html(chain), elements);
  chain.text     = each(text(chain), elements);
  chain.val      = each(val(chain), elements);

  return chain;
}
 },{"./attr":3,"./children":4,"./classlist":8,"./effects":9,"./events":12,"./html":13,"./style":10,"./text":14,"./val":15,"new-chain":16}],17:[function(require,module,exports){ var select = require("./select");

module.exports = create;

function create(tag){
  return select(document.createElement(tag));
}
 },{"./select":2}],3:[function(require,module,exports){ module.exports = attr;

function attr(chain){

  return function attr(element, name, value){
    if ( arguments.length == 2 ) {
      return element.getAttribute(name);
    }

    element.setAttribute(name, value);

    return chain;
  };

}
 },{}],4:[function(require,module,exports){ var unselect = require("./unselect");

module.exports = {
  add       : add,
  addBefore : addBefore,
  replace   : replace,
  remove    : remove
};

function add(element, child){
  element.appendChild(unselect(child));
}

function addBefore(element, child, ref){
  element.insertBefore(unselect(child), pick(element, ref));
}

function pick(parent, child){
  if ( typeof child == 'string') {
     return parent.querySelector(child);
  }

  return unselect(child);
}

function replace(element, target, replacement){
  element.replaceChild(unselect(replacement), pick(element, target));
}

function remove(element, child){
  element.removeChild(pick(element, child));
}
 },{"./unselect":5}],8:[function(require,module,exports){ module.exports = {
  addClass    : addClass,
  hasClass    : hasClass,
  removeClass : removeClass,
  toggleClass : toggleClass
};

function addClass(element, name){
  element.classList.add(name);
}

function hasClass(element, name){
  return element.classList.contains(name);
}

function removeClass(element, name){
  element.classList.remove(name);
}

function toggleClass(element, name){
  element.classList.toggle(name);
}
 },{}],9:[function(require,module,exports){ var style = require("./style");

module.exports = {
  hide: hide,
  show: show
};

function hide(element){
  style(element, 'display', 'none');
}

function show(element){
  style(element, 'display', '');
}
 },{"./style":10}],12:[function(require,module,exports){ module.exports = {
  change    : event('change'),
  click     : event('click'),
  keydown   : event('keydown'),
  keyup     : event('keyup'),
  keypress  : event('keypress'),
  mousedown : event('mousedown'),
  mouseover : event('mouseover'),
  mouseup   : event('mouseup'),
  resize    : event('resize'),
  on        : on,
  off       : off
};

function event(type){
  return function(element, callback){
    return on(element, type, callback);
  };
}

function off(element, event, callback){
  element.removeEventListener(event, callback, false);
}

function on(element, event, callback){
  element.addEventListener(event, callback, false);
}
 },{}],13:[function(require,module,exports){ module.exports = html;

function html(chain){
  return function(element, newValue){
    if ( arguments.length > 1 ) {
      element.innerHTML = newValue;
      return chain;
    }

    return element.innerHTML;
  };
}
 },{}],10:[function(require,module,exports){ var toCamelCase = require("to-camel-case");

module.exports = style;

function all(element, css){
  var name;
  for ( name in css ) {
    one(element, name, css[name]);
  }
}

function one(element, name, value){
  element.style[toCamelCase(name)] = value;
}

function style(element){
  if ( arguments.length == 3 ) {
    return one(element, arguments[1], arguments[2]);
  }

  return all(element, arguments[1]);
}
 },{"to-camel-case":11}],14:[function(require,module,exports){ module.exports = text;

function text(chain){
  return function(element, newValue){
    if ( arguments.length > 1 ) {
      element.textContent = newValue;
      return chain;
    }

    return element.textContent;
  };
}
 },{}],15:[function(require,module,exports){ module.exports = val;

function val(chain){
  return function(element, newValue){
    if ( arguments.length > 1 ) {
      element.value = newValue;
      return chain;
    }

    return element.value;
  };
}
 },{}],5:[function(require,module,exports){ var isHTML = require("./is-html"),
    parse = require('./parse');

module.exports = unselect;

function unselect(el){
  if ( Array.isArray(el) ) return el[0];
  if ( isHTML(el) ) return parse(el);
  return el;
}
 },{"./is-html":6,"./parse":7}],6:[function(require,module,exports){ module.exports = isHTML;

function isHTML(text){
  return typeof text == 'string' && /<\w+\s/.test(text);
}
 },{}],7:[function(require,module,exports){ var parser = new DOMParser;

module.exports = parse;

function parse(html){
  var dom = parser.parseFromString(html, "text/xml");
  return dom ? dom.firstChild : undefined;
}
 },{}],16:[function(require,module,exports){ module.exports = newChain;
module.exports.from = from;

function from(chain){

  return function(){
    var m, i;

    m = methods.apply(undefined, arguments);
    i   = m.length;

    while ( i -- ) {
      chain[ m[i].name ] = m[i].fn;
    }

    m.forEach(function(method){
      chain[ method.name ] = function(){
        method.fn.apply(this, arguments);
        return chain;
      };
    });

    return chain;
  };

}

function methods(){
  var all, el, i, len, result, key;

  all    = Array.prototype.slice.call(arguments);
  result = [];
  i      = all.length;

  while ( i -- ) {
    el = all[i];

    if ( typeof el == 'function' ) {
      result.push({ name: el.name, fn: el });
      continue;
    }

    if ( typeof el != 'object' ) continue;

    for ( key in el ) {
      result.push({ name: key, fn: el[key] });
    }
  }

  return result;
}

function newChain(){
  return from({}).apply(undefined, arguments);
}
 },{}],11:[function(require,module,exports){ /**
 * Convert a string to camel case
 *
 * @param {String} str
 * @param {Boolean} first upper-case first too ? (PascalCase)
 */
module.exports = function (str, first) {
  str = str.replace(/[_-]([a-z])/g, function (l) {
  	return l[1].toUpperCase()
  })

  if (first)
    str = str.charAt(0).toUpperCase() + str.slice(1)

  return str
} },{}] }; function require(o){ if(o[2]) return o[2].exports; o[0](function(u){ if(!require.m[o[1][u]]) { throw new Error('Cannot find module "' + u + '"'); } return require(require.m[o[1][u]]); }, o[2] = { exports: {} }, o[2].exports); return o[2].exports; };  return require(require.m[0]); }({ env:{} }));