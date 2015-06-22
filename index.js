'use strict';

var nunjucks = require('nunjucks')
var Promise = require('promise')
var Environment = nunjucks.Environment
var Template = nunjucks.Template

function getEnvironment (options) {
  var loader = null;
  if (options.searchPath) {
    loader = new nunjucks.FileSystemLoader(options.searchPath, true)
    delete options.searchPath
  }
  var loaders = loader ? [loader] : null
  return new Environment(loaders, options)
}

exports.name = 'nunjucks';
exports.outputFormat = 'html';

exports.render = function (str, options, locals) {
  var env = getEnvironment(options)
  return env.renderString(str, locals)
}

exports.renderAsync = function (str, options, locals) {
  var env = getEnvironment(options)
  return new Promise(function (fulfill, reject) {
    env.renderString(str, locals, function (err, res) {
      if (err) {
        return reject(err)
      }
      fulfill(res)
    })
  })
}
