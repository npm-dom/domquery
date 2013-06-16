var style = require("./style");

module.exports = {
  hide: hide,
  show: show
};

function hide(element){
  console.log('element>>>', element);
  style(element, 'display', 'none');
}

function show(element){
  style(element, 'display', '');
}
