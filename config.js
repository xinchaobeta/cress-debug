var cwd = process.cwd()
;

module.exports = {
  "node-webkit-path": "/Applications/node-webkit.app/Contents/MacOS/node-webkit",
  "package-source": __dirname + '/sample/package.json',
  "index-source": __dirname + '/sample/debug.html', 
  "package-dist": cwd + '/package.json', 
  "index-dist": cwd + '/debug.html',
}