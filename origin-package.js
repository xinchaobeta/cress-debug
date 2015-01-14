var config = require('./config')
, fs = require('fs')
;

function originPackage(path) {
  that = this;
  that.path = path
  fs.exists(path, function(exist) {
    if( that.isExist = exist ) {
      fs.readFile(path, function(err, buf) {
        that.buf = buf;
        that.isReady = true
        if(that.ready) that.ready(that);
      }); 
    } else {
      that.isReady = true
      if(that.ready) that.ready(that);
    }
  });
}

originPackage.prototype.onReady = function(next) {
  this.ready = next;
  if(this.isReady) this.ready(this);
}

originPackage.prototype.rollback = function(next) {
  if(this.isExist) 
    fs.writeFile(this.path, this.buf, next);
  else if(!!next)
    next()
}

module.exports = new originPackage(config['package-dist'])