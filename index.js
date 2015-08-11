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
  var opts = extend({}, defaults, options);
  var optspath = options.path || options.filename ? path.dirname(options.filename) : null;
  var env = null;
  if (optspath) {
    env = nunjucks.configure(optspath, opts);
  }
  else {
    env = nunjucks.configure(opts);
  }
  var template = nunjucks.compile(str, env, options.filename || null, true);
  return function (locals) {
    return template.render(locals);
  };
};
