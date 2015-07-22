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

exports.compile = function (str, options) {
  var env = getEnvironment(options)
  var tmpl = new Template(str, env, true)
  return tmpl.render.bind(tmpl)
}

exports.compileAsync = function (str, options) {
  return new Promise(function (resolve, reject) {
    var env = getEnvironment(options)
    var tmpl = new Template(str, env, true)
    resolve(function (locals) {
      return new Promise(function (done, fail) {
        tmpl.render(locals, function (err, result) {
          if (err) {
            fail(err)
          } else {
            done(result)
          }
        })
      })
    })
  })
}
