[![Node.js CI](https://github.com/digabi/rich-text-editor/actions/workflows/ci.yml/badge.svg)](https://github.com/digabi/rich-text-editor/actions/workflows/ci.yml)

[Abitti.fi](https://abitti.fi)

[Use of Abitti Trademark policy](https://abitti.net/abitti-trademark.html)

Rich text editor with math support for Finnish Matriculation Examination Board.
Live demo can be found at [https://math-demo.abitti.fi/](https://math-demo.abitti.fi/)

## Usage

### Notes

Since v4.0.0, only ES2017 code with ES modules is provided (in the dist directory). If you want to use this library, a bundler such as Webpack or Rollup is probably needed.

Since the release of v8.0.0 in 2024, this has been a React component. If you still need the old legacy version, you need to explicitly use the last stable v7 release (like this: http://unpkg.com/rich-text-editor@7.3.0/dist/rich-text-editor-bundle.js)

### Usage with NPM

Install the package with `npm install rich-text-editor`. 
Rich text editor can be either used as 
  - a React component `import RichTextEditor from 'rich-text-editor'`
  - or as a function in apps that are not using React `import { makeRichText } from 'rich-text-editor/dist/rich-text-editor'` 

Most properties passed to the component or initialization function are described below. More info can be found in the types and/or source code.

### Usage as CDN bundle

Add a script tag to your HTML page whose source is `https://unpkg.com/rich-text-editor/dist/rich-text-editor-bundle.js`, e.g. `<script type="module" src="https://unpkg.com/rich-text-editor/dist/rich-text-editor-bundle.js"></script>`. 

This will add `makeRichText` to window, which can be used to initialize the editor.

The function takes the following parameters as an object:

| Key              | Default                                          |
|------------------|--------------------------------------------------|
| container        | document.getElementById('rich-text-editor-root') |
| language         | 'FI'                                             |
| baseUrl          | ''                                               |
| allowedFileTypes | ['image/png', 'image/jpeg']                      |
| onValueChange    | () => {}                                         |
| textAreaProps    | {}                                               |

Example:
```
{
  container: document.getElementById('rich-text-editor-root')!,
  language: 'FI',
  baseUrl: '',
  allowedFileTypes: ['image/png', 'image/jpeg'],
  onValueChange: () => {},
  textAreaProps: {},
}
```

textAreaProps are passed to the underlying div element that is the visible editor element, here are ones that are relevant for configuration of CDN users:  

| Key            | type                | Purpose                                            |
|----------------|---------------------|----------------------------------------------------|
| ariaInvalid    | boolean             | Add aria-invalid                                   |
| ariaLabelledBy | string              | Add aria-labelledby                                |
| editorStyle    | React.CSSProperties | Direct CSS properties to the editor element        |
| className      | string              | Additional class name(s) to the editor element     |
| id             | string              | id-field to the editor element                     |
| lang           | string              | lang-field to the editor-element for accessibility |

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

## Development

### Getting started

1. Install [Node.js](https://nodejs.org/en/)
1. Run `npm install`.
1. Run `npm run watch` to run locally. This starts a simple frontend at http://127.0.0.1:1234/ and a backend for rendering equations at http://127.0.0.1:5111.

### Testing

There is an extensive component test collection via Playwright. Most of the tests are run with both Chromium and Firefox, some are run with only one of them because of limitations with performing some actions via JS.

```sh
# Runs type checks and the test suite
npm run test
 
# Runs just the test suite
npm run test:ct

# Use --ui to run and inspect the tests in Playwright's GUI
npm run test:ct -- --ui

# Run just a specific test with -g
npm run test:ct -- -g "can paste text from clipboard"
```

## Example of direct usage

Demo: http://digabi.github.io/rich-text-editor/

Source: https://github.com/digabi/rich-text-editor/blob/master/index.html

# License

https://opensource.org/licenses/MIT
