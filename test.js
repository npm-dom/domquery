var test = require('prova');
var dom = require("./");
var randomColor = require('random-color');

var HTML = (function(){/*
  <textarea style="width:300px; height:200px"></textarea>
  <ul data-foo="bar" class="fruits">
  <li class="fruit">apple</li>
  <li class="fruit">orange</li>
  <li class="fruit">plum</li>
  </ul>
  */}).toString().slice(17, -4);

reset();

test('returns an attr value', function (t) {
  t.plan(1);
  t.equal(dom('.fruits').attr('data-foo'), 'bar');
});

test('sets an attr value', function (t) {
  t.plan(3);

  dom('.fruit').attr('data-foo', 'bar').style('background-color', randomColor());

  fruits().forEach(function(el){
    t.equal(el.getAttribute('data-foo'), 'bar');
  });
});

test('selects elements by css queries', function (t) {
  t.plan(2);

  var els   = dom('.fruits .fruit');
  var clone = document.querySelectorAll('.fruits .fruit');

  t.equal(els[0], clone[0]);
  t.equal(els[1], clone[1]);
});

test('hides els', function (t) {
  t.plan(3);

  dom('.fruit').hide();

  fruits().forEach(function(el){
    t.equal(el.style.display, 'none');
  });
});

test('shows els', function (t) {
  t.plan(3);

  fruits().forEach(function(el){
    el.style.display = 'none';
  });

  dom('.fruit').show();

  fruits().forEach(function(el){
    t.equal(el.style.display, '');
  });

});

test('adds a class', function (t) {
  t.plan(3);

  dom('.fruit').addClass('foo');

  fruits().forEach(function(el){
    t.ok(el.classList.contains('foo'));
  });
});

test('removes a class', function (t) {
  t.plan(6);
  dom('.fruit').addClass('foo').addClass('bar').removeClass('foo');

  fruits().forEach(function(el){
    t.ok(el.classList.contains('bar'));
    t.notOk(el.classList.contains('foo'));
  });
});

test('checks an element if it has a class', function (t) {
  t.plan(9);

  dom('.fruit').removeClass('foo').removeClass('bar');

  fruits().forEach(function(el){
    t.notOk(el.classList.contains('foo'));
    t.notOk(el.classList.contains('bar'));
    t.ok(el.classList.contains('fruit'));
  });
});

test('toggles a class', function (t) {
  t.plan(6);
  dom('.fruit').addClass('foo').removeClass('bar').toggleClass('foo').toggleClass('bar');

  fruits().forEach(function(el){
    t.notOk(el.classList.contains('foo'));
    t.ok(el.classList.contains('bar'));
  });

});

test('styles an element', function (t) {
  t.plan(9);

  dom('.fruit').style({ color: 'red', 'background-color': 'yellow' }).style('border', '1px solid green');

  fruits().forEach(function(el){
    t.equal(el.style.color, 'red');
    t.equal(el.style.backgroundColor, 'yellow');
    t.equal(el.style.border, '1px solid green');
  });
});

test('adds an event', function (t) {
  dom('.fruit').click(function(event){
    dom(event.target).style({ 'background-color': randomColor(), 'color': randomColor() });
  });

  dom('textarea').keydown(function(){
    dom('textarea').style('background-color', randomColor());
  });

  t.end();
});

test('returns the value of an element', function (t) {
  t.plan(1);
  dom('textarea')[0].value = 'hello';
  t.equal(dom('textarea').val(), 'hello');
});

test('sets the value of an element', function (t) {
  t.plan(1);
  dom('textarea').val('foobar').style('background-color', randomColor());
  t.equal(dom('textarea').val(), 'foobar');
});

test('returns the text content of an element', function (t) {
  t.plan(1);
  dom('.fruit:first-child')[0].innerText = 'grape';
  t.equal(dom('.fruit:first-child').text(), 'grape');
});

test('sets the text content of an element', function (t) {
  t.plan(2);
  dom('.fruit:first-child').text('a delicious {fruit}', { fruit: 'cherry' }).style('background-color', randomColor());
  t.equal(dom('.fruit:first-child').text(), 'a delicious cherry');

  dom('.fruit:first-child').text('tasty cherries').style('background-color', randomColor());
  t.equal(dom('.fruit:first-child').text(), 'tasty cherries');
});

test('returns the html content of an element', function (t) {
  t.plan(1);
  dom('.fruit:first-child')[0].innerHTML = 'kiwi';
  t.equal(dom('.fruit:first-child').html(), 'kiwi');
});

test('sets the html content of an element', function (t) {
  t.plan(2);
  dom('.fruit:first-child').html('a delicious {fruit}', { fruit: 'melon' }).style('background-color', randomColor());
  t.equal(dom('.fruit:first-child').html(), 'a delicious melon');
  dom('.fruit:first-child').html('a tasty melon').style('background-color', randomColor());
  t.equal(dom('.fruit:first-child').html(), 'a tasty melon');
});

test('creates a new element', function (t) {
  t.plan(2);
  var parent = dom.create('div').addClass('parent');
  var child1 = dom.create('<p>child 1</p>');
  var child2 = dom.create('span').html('child 2');
  var child3 = dom.create('<label>child 3</label>');
  var child4 = dom.create('strong').html('child 4');

  parent.add(child1).add(child2).replace(child1, child3).add(child4).remove('span');

  t.equal(parent.html(), '<label>child 3</label><strong>child 4</strong>');
  t.ok(parent.hasClass('parent'));
});

test('adds a child element', function (t) {
  t.plan(1);
  var child = dom(document.createElement('li')).addClass('fruit').addClass('new').html('yo');
  dom('.fruits').add(child);
  t.equal(dom('.fruit:last-child')[0], child[0]);
});

test('adds HTML', function (t) {
  t.plan(6);
  dom('.fruits').add('<li class="new fruit">a fresh {fruit}</li>', { fruit: 'watermelon' });
  t.ok(dom('.fruit:last-child').hasClass('new'));
  t.ok(dom('.fruit:last-child').hasClass('fruit'));
  t.equal(dom('.fruit:last-child').text(), 'a fresh watermelon');

  dom('.fruits').add('<li class="new fruit">a very fresh apple</li>');
  t.ok(dom('.fruit:last-child').hasClass('new'));
  t.ok(dom('.fruit:last-child').hasClass('fruit'));
  t.equal(dom('.fruit:last-child').text(), 'a very fresh apple');
});

test('creates and inserts HTML', function (t) {
  t.plan(4);
  dom('<li class="new very-new fruit">very fresh {fruit}</li>', { fruit: 'peach' }).insert('.fruits');
  t.ok(dom('.fruit:last-child').hasClass('new'));
  t.ok(dom('.fruit:last-child').hasClass('very-new'));
  t.ok(dom('.fruit:last-child').hasClass('fruit'));
  t.equal(dom('.fruit:last-child').text(), 'very fresh peach');
});

test('removes itself', function (t) {
  t.plan(2);
  var last = dom('.fruit:last-child').text();
  dom('<li class="fruit">to be removed</li>').insert('.fruits');
  t.equal(dom('.fruit:last-child').text(), 'to be removed');
  dom('.fruit:last-child').remove();
  t.equal(dom('.fruit:last-child').text(), last);
});

test('selects the children', function (t) {
  t.plan(1);
  var newf  = dom('.fruits').select('.new');
  var clone = dom('.fruits .new');
  t.equal(newf.length, clone.length);
});

test('selects children of multiple elements', function (t) {
  var all = dom('body > *');
  var children = all.select('*');
  t.plan(1);
  t.equal(children.length, dom('ul li').length);
});

test('initializes a chain with given elements', function (t) {
  t.plan(7);

  dom.apply(undefined, Array.prototype.slice.call(document.querySelectorAll('.fruit'))).removeClass('corge').addClass('corge');

  fruits().forEach(function(el){
    t.ok(el.classList.contains('corge'));
  });

});

test('event delegation', function (t) {
  t.plan(1);

  dom('.fruits').on('click', 'li', function () {
    t.ok(true);
  });

  dom('.fruits').add('<li id="delegation-test-el">yo</li>');
  dom('#delegation-test-el')[0].click();
});

test('finding parents', function (t) {
  t.plan(4);
  t.equal(dom('li').parent().length, 1);
  t.equal(dom('li').parent()[0], dom('ul.fruits')[0]);
  t.equal(dom('li').parent('body')[0], dom('body')[0]);
  t.equal(dom('li').parent('#foo').length, 0);
});

test('selecting siblings', function (t) {
  t.plan(3);

  dom('<li class="delicious fruit cherry">cherry</li>').insert('ul.fruits');
  dom('<li class="delicious fruit watermelon">watermelon</li>').insert('ul.fruits');
  dom('<li class="delicious fruit grapes">grapes!</li>').insert('ul.fruits');
  dom('<li class="also-delicious fruit">carrot</li>').insert('ul.fruits');

  var assert = ['cherry', 'watermelon', 'grapes!'];
  dom('.also-delicious').siblings('.delicious.fruit').forEach(function (el, ind) {
    t.equal(assert[ind], el.textContent);
  });
});

function fruits () {
  return Array.prototype.slice.call(document.querySelectorAll('.fruits .fruit'));
}

function reset (done){
  document.body.innerHTML = HTML;

  dom('textarea').onKey('alt space', function () {
    dom('textarea').val('');
  });
};
