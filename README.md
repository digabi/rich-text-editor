# 🚨🚨 Upcoming breaking change warning 🚨🚨

On 18.10. we will release a new major version (v8) of the rich text editor, which is a re-write of the old codebase. This warning is not critical to users of NPM packages using versioning, but users of the unpkg bundle (http://unpkg.com/rich-text-editor/dist/rich-text-editor-bundle.js) will notice that the latest bundle of the code will not work as expected anymore. To avoid a breaking change in your system, you can set the version of the unpkg package explicitly to the last stable version of v7 as follows: http://unpkg.com/rich-text-editor@7.3.0/dist/rich-text-editor-bundle.js

This will give you time to develop your systems to accommodate to the new version once it is released.

[![Node.js CI](https://github.com/digabi/rich-text-editor/actions/workflows/ci.yml/badge.svg)](https://github.com/digabi/rich-text-editor/actions/workflows/ci.yml)

[![Abitti.dev](https://abitti.dev/images/abittidev_logo.svg)](https://abitti.dev/)

[Abitti.dev](https://abitti.dev)

[Use of Abitti Trademark policy](https://abitti.dev/abitti-trademark.html)

Rich text editor with math support for Finnish Matriculation Examination Board.
Live demo can be found at [https://math-demo.abitti.fi/](https://math-demo.abitti.fi/)

Since v4.0.0, only ES2017 code with ES modules is provided (in the `dist`
directory). If you want to use this library, a bundler such as Webpack or
Rollup is probably needed.

## Usage

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

## Getting started

1. Install [Node.js](https://nodejs.org/en/)
3. Run `npm install`.
4. Run `npm run dev`.
5. Browser tests: [http://localhost:5111/test/tests.html](http://localhost:5111/test/tests.html)
6. Manual testing: [http://localhost:5111/test/tests.html?grep=manual](http://localhost:5111/test/tests.html?grep=manual)

### Testing the bundle locally

1. Run `npm run build`
2. Run `npm run dev-server`
3. Run a simple http server in the project root, for example `python3 -m http.server 8080`
4. Edit `dev/index.html` script tag to point to the bundle: `<script type="module" src="/dist/rich-text-editor-bundle.js"></script>` (don't commit this).
5. Go to http://localhost:8080/dev/index.html

## Example of direct usage

Demo: http://digabi.github.io/rich-text-editor/

Source: https://github.com/digabi/rich-text-editor/blob/master/index.html

# License

https://opensource.org/licenses/MIT
