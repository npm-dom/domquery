module.exports = isHTML;

function isHTML(text){
  return typeof text == 'string' && text.charAt(0) == '<';
}
