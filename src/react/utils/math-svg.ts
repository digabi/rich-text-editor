// Sourced from:
// https://github.com/mathjax/MathJax/issues/2385#issuecomment-1253051223

import { mathjax } from 'mathjax-full/js/mathjax'
import { TeX } from 'mathjax-full/js/input/tex'
import { SVG } from 'mathjax-full/js/output/svg'
import { AllPackages } from 'mathjax-full/js/input/tex/AllPackages'
import { liteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor'
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html'
import { LiteElement } from 'mathjax-full/js/adaptors/lite/Element'

const adaptor = liteAdaptor()
RegisterHTMLHandler(adaptor)

const mathjaxDocument = mathjax.document('', {
  InputJax: new TeX({ packages: AllPackages }),
  OutputJax: new SVG({ fontCache: 'local' }),
})

const mathjaxOptions = {
  em: 16,
  ex: 8,
  containerWidth: 1280,
}

export function getMathSvg(math: string): string {
  const node = mathjaxDocument.convert(math, mathjaxOptions) as LiteElement
  return adaptor.innerHTML(node)
}
