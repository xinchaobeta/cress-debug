var fs = require('fs')
, config = require('./config')
, spawn = require('child_process').spawn
, content = require(config['package-source'])
;

function devtool() {}

devtool.prototype.copy = function(next) {
  var count = 2;
  content.main = config['index-dist-relative'];
  fs.writeFile(config['package-dist'], JSON.stringify(content, null, 2), function() {
    if(--count <= 0 && next) next();
  });
  fs.createReadStream(config['index-source'])
    .pipe(fs.createWriteStream(config['index-dist']))
    .on('finish', function(){
      if(--count <= 0 && next) next();
    })
  ;
}

devtool.prototype.open = function(next) {
  that = this
  that.copy(function() {
    that.instance = spawn(config['node-webkit-path'], ['--mac_icon', config['icns']], {cwd: config.cwd, stdio: 'inherit'});
    that.instance.on('close', function(){ process.exit(); });
    setTimeout(function(){
      that.clear(next);
    }, 1000);
  })
}

devtool.prototype.clear = function(next) {
  var count = 2;
  fs.unlink(config['package-dist'], function(){
    if(--count <= 0 && next) next();
  });
  fs.unlink(config['index-dist'], function(){
    if(--count <= 0 && next) next();
  });
}

module.exports = new devtool()