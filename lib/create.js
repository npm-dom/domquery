var select = require("./select");

module.exports = create;

function create(tag){
  return select(document.createElement(tag));
}
