var unselect = require("./unselect");

module.exports = {
  add          : add,
  addBefore    : addBefore,
  insert       : insert,
  replace      : replace,
  remove       : remove
};

function add(element, child){
  element.appendChild(unselect(child));
}

function addBefore(element, child, ref){
  element.insertBefore(unselect(child), pick(element, ref));
}

function insert(element, parent){
  add(pick(document, parent), element);
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
