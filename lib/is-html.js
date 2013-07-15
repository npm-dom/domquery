module.exports = isHTML;

function isHTML(text){
  return typeof text == 'string' && /<\w+\s/.test(text);
}
