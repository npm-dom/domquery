var format = require('new-format'),
    isHTML = require("./is-html"),
    parse = require('./parse');

module.exports = unselect;

function unselect(el, vars){
  if ( Array.isArray(el) ) return el[0];
  if ( isHTML(el) ) return parse(typeof vars == 'object' ? format(el, vars) : el);
  return el;
}
