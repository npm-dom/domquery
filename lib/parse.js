var parser = new DOMParser;

module.exports = parse;

function parse(html){
  var dom = parser.parseFromString(html, "text/xml");
  return dom ? dom.firstChild : undefined;
}
