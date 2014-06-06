var events = require("dom-event");
var delegate = require("component-delegate");
var keyEvent = require("key-event");
var trim = require("trim");

module.exports = {
  change    : shortcut('change'),
  click     : shortcut('click'),
  keydown   : shortcut('keydown'),
  keyup     : shortcut('keyup'),
  keypress  : shortcut('keypress'),
  mousedown : shortcut('mousedown'),
  mouseover : shortcut('mouseover'),
  mouseup   : shortcut('mouseup'),
  resize    : shortcut('resize'),
  on        : on,
  off       : off
};

function shortcut (type){
  return function(element, callback){
    return on(element, type, callback);
  };
}

function off (element, event, selector, callback){
  if (event.charAt(0) == '>') {
    return keyEvent.off(element, trim(event.slice(1)), callback);
  }

  if (arguments.length == 4) {
    return delegate.unbind(element, selector, event, callback);
  }

  callback = selector;

  events.off(element, event, callback);
}

function on (element, event, selector, callback){
  if (arguments.length == 3) {
    callback = selector;
  }

  if (event.charAt(0) == '>') {
    return keyEvent(element, trim(event.slice(1)), callback);
  }

  if (arguments.length == 4) {
    return delegate.bind(element, selector, event, callback);
  }

  events.on(element, event, callback);
}
