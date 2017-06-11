'use strict'

const path = require('path')
const nunjucks = require('nunjucks')
const extend = require('extend-shallow')

exports.name = 'nunjucks'
exports.inputFormats = ['njk', 'nunjucks']
exports.outputFormat = 'html'

exports.compile = function (str, options) {
  // Prepare the options.
  const opts = extend({watch: false}, options)

  // Find the path for which the environment will be created.
  const envpath = opts.path || opts.filename ? path.dirname(opts.filename) : null
  let env = null
  if (envpath) {
    env = nunjucks.configure(envpath, opts)
  } else {
    env = nunjucks.configure(opts)
  }

  // Add all the Filters.
  for (const name in opts.filters || {}) {
    if ({}.hasOwnProperty.call(opts.filters, name)) {
      let filter = null
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
  const template = nunjucks.compile(str, env, opts.filename || null, true)

  // Bind the render function as the returning function.
  return template.render.bind(template)
}
