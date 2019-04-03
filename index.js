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

  const env = nunjucksEnv(opts)

  // Add all the Filters.
  for (const name in opts.filters || {}) {
    if ({}.hasOwnProperty.call(opts.filters, name)) {
      let filter = null
      switch (typeof opts.filters[name]) {
        case 'string':
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

  // Add all the Extensions.
  for (const name in opts.extensions || {}) {
    if ({}.hasOwnProperty.call(opts.extensions, name)) {
      let extension = null
      switch (typeof opts.extensions[name]) {
        case 'string':
          extension = require(opts.extensions[name])
          break
        case 'function':
        default:
          extension = opts.extensions[name]
          break
      }

      env.addExtension(name, extension)
    }
  }

  // Add all the Globals.
  for (const name in opts.globals || {}) {
    if (opts.globals[name] !== null) {
      env.addGlobal(name, opts.globals[name])
    }
  }

  // Compile the template.
  const template = nunjucks.compile(str, env, opts.filename || null, true)

  // Bind the render function as the returning function.
  return template.render.bind(template)
}

function nunjucksEnv(opts) {
  // Find the path for which the environment will be created.
  const envpath = opts.root || opts.path || (opts.filename ? path.dirname(opts.filename) : null)
  const {loaders} = opts
  let env = null
  if (loaders !== undefined) {
    // Loaders are assumed to come configured with their own baseUrl set, so envpath is ignored here
    env = new nunjucks.Environment(loaders, opts)
    if (opts.express) {
      env.express(opts.express)
    }
  } else if (envpath) {
    env = nunjucks.configure(envpath, opts)
  } else {
    env = nunjucks.configure(opts)
  }

  return env
}
