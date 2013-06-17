module.exports = attr;

function attr(chain){

  return function attr(element, name, value){
    if ( arguments.length == 2 ) {
      return element.getAttribute(name);
    }

    element.setAttribute(name, value);

    return chain;
  };

}
