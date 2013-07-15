module.exports = text;

function text(chain){
  return function(element, newValue){
    if ( arguments.length > 1 ) {
      element.textContent = newValue;
      return chain;
    }

    return element.textContent;
  };
}
