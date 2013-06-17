module.exports = html;

function html(chain){
  return function(element, newValue){
    if ( arguments.length > 1 ) {
      element.innerHTML = newValue;
    }

    return element.innerHTML;
  };
}
