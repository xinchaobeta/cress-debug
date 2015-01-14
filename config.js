var cwd = process.cwd()
, path = require('path')
, relative
;

function src(s) {
  return path.resolve(__dirname, s);
}

function dist(s) {
  return path.resolve(cwd, s)
}

module.exports = {
  "node-webkit-path": src("node_modules/nodewebkit/bin/nodewebkit"),
  "icns": src('sample/nw.icns'),
  "package-source": src('sample/_package.json'),
  "index-source": src('sample/_index.html'), 
  "package-dist": dist('package.json'), 
  "index-dist": dist(relative = Math.random() * 1e10 + '.index.html'),
  "index-dist-relative": relative,
}