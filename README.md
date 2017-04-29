# jstransformer-nunjucks

[![Greenkeeper badge](https://badges.greenkeeper.io/jstransformers/jstransformer-nunjucks.svg)](https://greenkeeper.io/)

[Nunjucks](http://mozilla.github.io/nunjucks/) support for [JSTransformers](http://github.com/jstransformers).

[![Build Status](https://img.shields.io/travis/jstransformers/jstransformer-nunjucks/master.svg)](https://travis-ci.org/jstransformers/jstransformer-nunjucks)
[![Coverage Status](https://img.shields.io/codecov/c/github/jstransformers/jstransformer-nunjucks/master.svg)](https://codecov.io/gh/jstransformers/jstransformer-nunjucks)
[![Dependency Status](https://img.shields.io/david/jstransformers/jstransformer-nunjucks/master.svg)](http://david-dm.org/jstransformers/jstransformer-nunjucks)
[![NPM version](https://img.shields.io/npm/v/jstransformer-nunjucks.svg)](https://www.npmjs.org/package/jstransformer-nunjucks)

## Installation

    npm install jstransformer-nunjucks

## API

```js
var nunjucks = require('jstransformer')(require('jstransformer-nunjucks'))

nunjucks.render('Hello, {{ name }}!', {name: 'World'}).body
//=> 'Hello, World!'
```

## License

MIT
