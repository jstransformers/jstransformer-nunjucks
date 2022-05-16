# jstransformer-nunjucks

[Nunjucks](http://mozilla.github.io/nunjucks/) support for [JSTransformers](http://github.com/jstransformers).

[![Build Status][ci-badge]][ci-url]
[![Coverage Status](https://img.shields.io/codecov/c/github/jstransformers/jstransformer-nunjucks/master.svg)](https://codecov.io/gh/jstransformers/jstransformer-nunjucks)
[![NPM version](https://img.shields.io/npm/v/jstransformer-nunjucks.svg)](https://www.npmjs.org/package/jstransformer-nunjucks)

## Installation

    npm install jstransformer-nunjucks

## API

```js
const jstransformer = require('jstransformer')
const nunjucks = jstransformer(require('jstransformer-nunjucks'))

nunjucks.render('Hello, {{ name }}!', {name: 'World'}).body
//=> 'Hello, World!'

const options = {
  filters: { repeat: (str, num) => str.repeat(n || 2) }
};

nunjucks.render(
  '{{ "Hello, " | repeat(echoes + 1) }}{{ name }}!',
  options,
  {name: 'World', echoes: 2}
).body

//=> 'Hello, Hello, Hello, World!'
```

See [the JSTransformers documentation](https://github.com/jstransformers/jstransformer) for other API methods.

By default, this transformer matches the *.njk* and *.nunjucks* input file extensions, and outputs *.html*.

## Available options

Many of the API methods accept an `options` dictionary object. The following option keys are supported:

- **`filename`**: The filename and path of the Nunjucks template being compiled.
  Default is null, which disables any imports or includes using relative path names.

- **`root`**: The base path used to [configure the Nunjucks environment](https://mozilla.github.io/nunjucks/api#configure).
  This defines the highest-level directory that can be searched for templates and macros.
  Any import or include references to files outside this root directory will fail.
  Default is to use the parent directory of the `filename` path, if it is specified,
  or `null` (which causes Nunjucks to default to the current working directory).

- **`path`**: Alternative name for `root`.

- **`filters`**: A set of [custom Nunjucks filters](https://mozilla.github.io/nunjucks/api#custom-filters) to add.
  The value of `filters` should be a dictionary object where the keys are the filter names to use in the templates.
  The dictionary values define the filter functions, either as JavaScript function objects,
  or as the name of a Node module (as a string).
  If you specify a module name, that module's default export will be used as the filter function.

- **`extensions`**: A set of Nunjucks extensions to add.
  The value of `extensions` should be a dictionary object where the keys are the extension names to use in the templates.
  The dictionary values define the extension functions, either as JavaScript function objects,
  or as the name of a Node module (as a string).

- **`globals`**: A set of [global variables](https://mozilla.github.io/nunjucks/api#addglobal) available to all templates.
  The value of `globals` is a dictionary object defining the keys and values of the global data properties.

 - Any other [options supported by Nunjuck's `configure` method](https://mozilla.github.io/nunjucks/api#configure).


## License

MIT

[ci-badge]: https://github.com/jstransformers/jstransformer-nunjucks/actions/workflows/test.yml/badge.svg
[ci-url]: https://github.com/jstransformers/jstransformer-nunjucks/actions/workflows/test.yml
