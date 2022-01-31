'use strict'

const path = require('path')
const nunjucks = require('nunjucks')
const extend = require('extend-shallow')

function nunjucksEnv(options) {
  // Find the path for which the environment will be created.
  const envpath = options.root || options.path || (options.filename ? path.dirname(options.filename) : null)
  const {loaders} = options
  let env = null
  if (loaders !== undefined) {
    // Loaders are assumed to come configured with their own baseUrl set, so envpath is ignored here
    env = new nunjucks.Environment(loaders, options)
    if (options.express) {
      env.express(options.express)
    }
  } else if (envpath) {
    env = nunjucks.configure(envpath, options)
  } else {
    env = nunjucks.configure(options)
  }

  return env
}

const transformer = {
  name: 'nunjucks',
  inputFormats: ['njk', 'nunjucks'],
  outputFormat: 'html',
}

transformer.compile = function (source, options) {
  // Prepare the options.
  options = extend({watch: false}, options)

  const env = nunjucksEnv(options)

  // Add all the Filters.
  for (const name in options.filters || {}) {
    if (Object.prototype.hasOwnProperty.call(options.filters, name)) {
      let filter = null
      switch (typeof options.filters[name]) {
        case 'string':
          filter = require(options.filters[name])
          break
        case 'function':
        default:
          filter = options.filters[name]
          break
      }

      env.addFilter(name, filter)
    }
  }

  // Add all the Extensions.
  for (const name in options.extensions || {}) {
    if (Object.prototype.hasOwnProperty.call(options.extensions, name)) {
      let extension = null
      switch (typeof options.extensions[name]) {
        case 'string':
          extension = require(options.extensions[name])
          break
        case 'function':
        default:
          extension = options.extensions[name]
          break
      }

      env.addExtension(name, extension)
    }
  }

  // Add all the Globals.
  for (const name in options.globals || {}) {
    if (options.globals[name] !== null) {
      env.addGlobal(name, options.globals[name])
    }
  }

  // Compile the template.
  const template = nunjucks.compile(source, env, options.filename || null, true)

  // Bind the render function as the returning function.
  return template.render.bind(template)
}

module.exports = transformer
