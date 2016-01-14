# ktn-js
[![Build Status](https://travis-ci.org/kittttttan/ktn-js.png?branch=master)](https://travis-ci.org/kittttttan/ktn-js)
[![Coverage Status](https://coveralls.io/repos/kittttttan/ktn-js/badge.png)](https://coveralls.io/r/kittttttan/ktn-js)
[![Dependency Status](https://gemnasium.com/kittttttan/ktn-js.png)](https://gemnasium.com/kittttttan/ktn-js)

[ktn-js](https://github.com/kittttttan/ktn-js) is a library written in [TypeScript](http://www.typescriptlang.org/), [ES2015](https://babeljs.io/docs/learn-es2015/).


## Install

install node.js from [nodejs.org](http://nodejs.org/)

install [gulp](http://gulpjs.com/)

```bash
npm install -g gulp
```

install project dependencies

```bash
cd /path/to/ktn-js
npm install
```

## Build

convert TypeScript to es6.

```bash
gulp ts
```

[browserify](http://browserify.org/) and convert to es5.

```bash
gulp build
```

minify

```bash
gulp min
```

build examples

```bash
gulp example
```

more tasks

```bash
gulp --tasks-simple | sort
```
