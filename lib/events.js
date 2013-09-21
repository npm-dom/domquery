var events = require("on-off");
var delegate = require("delegate-dom");
var bindKey = require("bind-key");
var trim = require("trim");

module.exports = {
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

function off(element, event, selector, callback){
  if (event.charAt(0) == '>') {
    return bindKey.off(element, trim(event.slice(1)), callback);
  }

  if (arguments.length == 4) {
    return delegate.off(element, selector, event, callback);
  }

  callback = selector;

  events.off(element, event, callback);
}

function on(element, event, selector, callback){
  if (event.charAt(0) == '>') {

    if (arguments.length == 3) {
      callback = selector;
    }

    return bindKey(element, trim(event.slice(1)), callback);
  }

  if (arguments.length == 4) {
    return delegate.on(element, selector, event, callback);
  }

  callback = selector;

  events.on(element, event, callback);
}
