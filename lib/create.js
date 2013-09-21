var newElement = require("new-element");
var select = require("./select");

module.exports = create;

function create(html){
  if (html.charAt(0) == '<') {
    return select(newElement(html));
  }

  return select(document.createElement(html));
}
