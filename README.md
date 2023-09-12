[![Node.js CI](https://github.com/digabi/rich-text-editor/actions/workflows/ci.yml/badge.svg)](https://github.com/digabi/rich-text-editor/actions/workflows/ci.yml)

[![Abitti.dev](https://abitti.dev/images/abittidev_logo.svg)](https://abitti.dev/)

[Abitti.dev](https://abitti.dev)

[Use of Abitti Trademark policy](https://abitti.dev/abitti-trademark.html)

Rich text editor with math support for Finnish Matriculation Examination Board.
Live demo can be found at [https://math-demo.abitti.fi/](https://math-demo.abitti.fi/)

Since v4.0.0, only ES2017 code with ES modules is provided (in the `dist`
directory). If you want to use this library, a bundler such as Webpack or
Rollup is probably needed.

## Goal (Read this before submitting)

Rich text editor has been developed to allow candidates of Finnish Matriculation
Examination to attach screenshots and write equations as part of their submissions.
Our aim is not to create a general-purpose drop-in replacement for textarea but
an editor which works in [Abitti](https://abitti.fi) and its embedded browser.

While we celebrate every bug report, feature request and pull request we kindly ask
you to remember following:
- Most of the issues related to entering formulae and rendering LaTeX are caused
  by [MathJax](https://www.mathjax.org/) and [MathQuill](http://mathquill.com/)
  libraries. We do not have resources to write pull requests based on issues
  submitted to us. For similar reasons we will not pass upstream issues reported
  to us.
- We are not paying attention to issues or pull requests which fall outside our
  mission - Abitti.

We hope you understand our desire to focus on our goal specified by law.

## Dependencies

- MathQuill (https://github.com/digabi/mathquill)
- MathJax-Node
- Jquery
- sanitize-html

## Getting started

1. Install [Node.js](https://nodejs.org/en/)
3. Run `npm install`.
4. Run `npm run dev`.
5. Browser tests: [http://localhost:5111/test/tests.html](http://localhost:5111/test/tests.html)
6. Manual testing: [http://localhost:5111/test/tests.html?grep=manual](http://localhost:5111/test/tests.html?grep=manual)

## Example of direct usage

Demo: http://digabi.github.io/rich-text-editor/

Source: https://github.com/digabi/rich-text-editor/blob/master/index.html

# License

https://opensource.org/licenses/MIT
