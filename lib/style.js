var toCamelCase = require("to-camel-case");

module.exports = style;
module.exports.hide = effect('display', 'none');
module.exports.show = effect('display', '');

function all(element, css){
  var name;
  for ( name in css ) {
    one(element, name, css[name]);
  }
}

function effect (name, value) {
  return function (element) {
    style(element, name, value);
  };
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
