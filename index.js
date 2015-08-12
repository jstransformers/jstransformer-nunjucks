'use strict';

var nunjucks = require('nunjucks');
var extend = require('extend-shallow');
var path = require('path');

exports.name = 'nunjucks';
exports.outputFormat = 'html';

var defaults = {
  watch: false
};

exports.compile = function (str, options) {
  // Prepare the options.
  var opts = extend({}, defaults, options);

  // Find the path for which the environment will be created.
  var envpath = options.path || options.filename ? path.dirname(options.filename) : null;
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

  // Compile the template.
  var template = nunjucks.compile(str, env, options.filename || null, true);
  return function (locals) {
    return template.render(locals);
  };
};
