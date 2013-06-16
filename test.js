var query = require("./");

function fruits(){
  return Array.prototype.slice.call(document.querySelectorAll('.fruits .fruit'));
}

before(function(done){
  document.body.innerHTML += '<ul data-foo="bar" class="fruits"><li class="fruit">apple</li><li class="fruit">orange</li></ul>';
  done();
});

it('returns an attr value', function(){
  expect(query('.fruits').attr('data-foo')).to.equal('bar');
});

it('sets an attr value', function(){

  query('.fruit').attr('data-foo', 'bar');

  fruits().forEach(function(el){
    expect(el.getAttribute('data-foo')).to.equal('bar');
  });

});


it('selects elements by css queries', function(){

  var els   = query('.fruits .fruit'),
      clone = document.querySelectorAll('.fruits .fruit');

  expect(els[0]).to.equal(clone[0]);
  expect(els[1]).to.equal(clone[1]);

});

it('hides els', function(){
  query('.fruit').hide();

  fruits().forEach(function(el){
    expect(el.style.display).to.equal('none');
  });
});

it('shows els', function(){

  fruits().forEach(function(el){
    el.style.display = 'none';
  });

  query('.fruit').show();

  fruits().forEach(function(el){
    expect(el.style.display).to.equal('');
  });

});

it('adds a class', function(){
  query('.fruit').addClass('foo');

  fruits().forEach(function(el){
    expect(el.classList.contains('foo')).to.be.true;
  });

});

it('removes a class', function(){
  query('.fruit').addClass('foo').addClass('bar').removeClass('foo');

  fruits().forEach(function(el){
    expect(el.classList.contains('bar')).to.be.true;
    expect(el.classList.contains('foo')).to.be.false;
  });

});

it('checks an element if it has a class', function(){
  query('.fruit').removeClass('foo').removeClass('bar');

  fruits().forEach(function(el){
    expect(el.classList.contains('foo')).to.be.false;
    expect(el.classList.contains('bar')).to.be.false;
    expect(el.classList.contains('fruit')).to.be.true;
  });
});

it('toggles a class', function(){

  query('.fruit').addClass('foo').removeClass('bar').toggleClass('foo').toggleClass('bar');

  fruits().forEach(function(el){
    expect(el.classList.contains('foo')).to.be.false;
    expect(el.classList.contains('bar')).to.be.true;
  });

});

it('styles an element', function(){
  query('.fruit').style({ color: 'red', 'background-color': 'yellow' }).style('border', '1px solid green');

  fruits().forEach(function(el){
    expect(el.style.color).to.equal('red');
    expect(el.style.backgroundColor).to.equal('yellow');
    expect(el.style.border).to.equal('1px solid green');
  });
});
