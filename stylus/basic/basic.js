var css = require('stylus')
  , str = require('fs').readFileSync(__dirname + '/basic.styl', 'utf8');

css.render(str, { filename: 'basic.styl' }, function(err, css){
  if (err) throw err;
  console.log(css);
});