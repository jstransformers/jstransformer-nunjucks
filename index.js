'use strict';

var nunjucks = require('nunjucks');
var extend = require('extend-shallow');
var path = require('path');

exports.name = 'nunjucks';
exports.inputFormats = ['njk', 'nunjucks'];
exports.outputFormat = 'html';

exports.compile = function (str, options) {
  // Prepare the options.
  var opts = extend({watch: false}, options);

  // Find the path for which the environment will be created.
  var envpath = opts.path || opts.filename ? path.dirname(opts.filename) : null;
  var env = null;
  if (envpath) {
    env = nunjucks.configure(envpath, opts);
  }
  else {
    env = nunjucks.configure(opts);
  }

  // Add all the Filters.
  for (var name in opts.filters || {}) {
    var filter = null;
    switch (typeof opts.filters[name]) {
      case "string":
        filter = require(opts.filters[name]);
        break;
      case "function":
      default:
        filter = opts.filters[name];
        break;
    }
    env.addFilter(name, filter);
  }

  // Configure the root directory, if needed.
  if (options.root) {
    nunjucks.configure(options.root);
  }

  // Compile the template.
  var template = nunjucks.compile(str, env, opts.filename || null, true);

  // Bind the render function as the returning function.
  return template.render.bind(template)
};
