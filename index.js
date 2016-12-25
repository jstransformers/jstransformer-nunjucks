'use strict'

var path = require('path')
var nunjucks = require('nunjucks')
var extend = require('extend-shallow')

exports.name = 'nunjucks'
exports.inputFormats = ['njk', 'nunjucks']
exports.outputFormat = 'html'

exports.compile = function (str, options) {
  // Prepare the options.
  var opts = extend({watch: false}, options)

  // Find the path for which the environment will be created.
  var envpath = opts.path || opts.filename ? path.dirname(opts.filename) : null
  var env = null
  if (envpath) {
    env = nunjucks.configure(envpath, opts)
  } else {
    env = nunjucks.configure(opts)
  }

  // Add all the Filters.
  for (var name in opts.filters || {}) {
    if ({}.hasOwnProperty.call(opts.filters, name)) {
      var filter = null
      switch (typeof opts.filters[name]) {
        case 'string':
          // eslint-disable-next-line import/no-dynamic-require
          filter = require(opts.filters[name])
          break
        case 'function':
        default:
          filter = opts.filters[name]
          break
      }
      env.addFilter(name, filter)
    }
  }

  // Compile the template.
  var template = nunjucks.compile(str, env, opts.filename || null, true)

  // Bind the render function as the returning function.
  return template.render.bind(template)
}
