var stylus = require('stylus')
  , nodes = stylus.nodes
  , path = __dirname + '/fun.styl'
  , str = require('fs').readFileSync(path, 'utf8');


stylus(str)
  .render(function(err, css){
    if (err) throw err;
    console.log(css);
  });