module.exports = {
  on  : on,
  off : off
};

function off(element, event, callback){
  element.removeEventListener(event, callback, false);
}


function on(element, event, callback){
  element.removeEventListener(event, callback, false);
}
