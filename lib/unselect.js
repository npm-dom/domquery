module.exports = unselect;

function unselect(el){
  if ( Array.isArray(el) ) return el[0];
  return el;
}
