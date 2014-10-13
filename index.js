#!/usr/bin/env node

var fs = require('fs')
, extend = require('extend')
, packagejson = require('./sample/package.json')
, spawn = require('child_process').spawn
, config = require('./config')
, originpackage = null
, mode = null
, nw = null
;


function getReady(err, next) {
  fs.readFile('package.json', 'utf-8', function(err, content) {

    if(err) {
      mode = 'new'
      fs.link(config['package-source'], config['package-dist'], function(){
        fs.link(config['index-source'], config['index-dist'], next)
      });
    } else {
      mode = "modify"
      originpackage = JSON.parse(content)
      packagejson = extend(true, {}, originpackage, packagejson)
      fs.writeFile(config['package-dist'], JSON.stringify(packagejson)   , function(){
        fs.link(config['index-source'], config['index-dist'], next)
      });
    }
  })
}

function openNw(err, next) {
  nw = spawn(config['node-webkit-path'], ['.'], {cwd: process.cwd(), stdio: 'inherit'});
  nw.on('exit', function(){
    console.log('cress: child exit!!!');
    next(null)
  });

  nw.on('error', function(e){
    console.log('cress: ', e.type, e);
    next(null)
  });
}


function clear(err, next) {
  fs.unlink(config['index-dist'], function(err) {
    if(mode == 'new') {
      fs.unlink(config['package-dist'], next);
    } else {
      fs.writeFile(config['package-dist'], JSON.stringify(originpackage), next);
    }
  })
}

getReady(null, function(){
  openNw(null, clear)
});