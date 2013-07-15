var isHTML = require("./is-html"),
    parse = require('./parse');

module.exports = unselect;

function unselect(el){
  if ( Array.isArray(el) ) return el[0];
  if ( isHTML(el) ) return parse(el);
  return el;
}
