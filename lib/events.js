var keyboard = require("./keyboard");

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

function off(element, event, callback){
  element.removeEventListener(event, callback, false);
}

function on(element, event, callback){
  if(event.charAt(0) == ':') {
    return keyboard.on(element, event, callback);
  }

  element.addEventListener(event, callback, false);
}
