import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react'
import { Page } from '@playwright/test'
import {
  getEditorLocator,
  assertEditorHTMLContent,
  assertEditorTextContent,
  repeat,
  inputSpecialCharacterFromToolbar,
  clickOutsideEditor,
  getUndoButton,
  getRedoButton,
  assertEquationEditorTextContent,
  assertEquationEditorLatexContent,
  setClipboardText,
  paste,
  setClipboardHTML,
  samplePNG,
  sampleGIF,
  assertAnswerContent,
  selectEditorContent,
  pasteHtmlImage,
  specialCharacters,
  inputLatexCommandFromToolbar,
  setClipboardImage,
  selectAll,
  getLatexImgTag,
} from './test-utils'
import RichTextEditor from '../src/app'
import { Answer } from '../src/app/utility'
import fi from '../src/FI'
import { BASIC, ALGEBRA, GEOMETRY, SET_THEORY } from '../src/app/components/toolbar/math-char-data'

const nbsp = '\u00A0'

test.describe('Rich text editor', () => {
  let answer: Answer = { answerHtml: '', answerText: '', imageCount: 0 }
  let unmountComponent: () => Promise<void>

  const onAnswerChange = (newAnswer: Answer) => {
    answer = newAnswer
  }

  const assertAnswer = async (expected: Partial<Answer>) => {
    await expect(() => assertAnswerContent(answer, expected)).toPass({ intervals: [500], timeout: 2000 })
  }

  test.beforeEach(async ({ page, mount }) => {
    const { unmount } = await mount(
      <RichTextEditor
        language="FI"
        baseUrl="http://localhost:5111"
        onValueChange={onAnswerChange}
        allowedFileTypes={['image/png', 'image/jpeg']}
        initialValue=""
        textAreaProps={{ editorStyle: { marginTop: '300px', minHeight: '200px' } }}
      />,
    )
    unmountComponent = unmount
    await page.addStyleTag({
      url: '//unpkg.com/@digabi/mathquill/build/mathquill.css',
    })
    const editor = getEditorLocator(page)
    await editor.click()
  })

  test('can type in the editor', async ({ page }) => {
    await page.keyboard.type('Hello World!')

    await assertAnswer({ answerHtml: 'Hello World!', answerText: 'Hello World!' })
  })

  test('can erase', async ({ page }) => {
    await test.step('text', async () => {
      await page.keyboard.type('Hello World!')
      await assertAnswer({ answerHtml: 'Hello World!', answerText: 'Hello World!' })
      await repeat(7, async () => {
        await page.keyboard.press('Backspace')
      })
      await assertAnswer({ answerHtml: 'Hello', answerText: 'Hello' })
    })

    await test.step('equations', async () => {
      await page.keyboard.press('Control+E')
      await page.keyboard.type('x^2')
      await page.keyboard.press('Escape')
      await assertAnswer({
        answerHtml: `Hello${getLatexImgTag('x^2')}`,
        answerText: 'Hello',
      })
      await page.keyboard.press('Backspace')
      await assertAnswer({
        answerHtml: 'Hello',
        answerText: 'Hello',
      })
    })
  })

  test('can input special characters from toolbar', async ({ page }) => {
    await inputSpecialCharacterFromToolbar(page, specialCharacters.alpha[1])
    await assertAnswer({
      answerText: specialCharacters.alpha[1],
    })

    await page.getByTestId('toggle-all-special-characters').click()

    await inputSpecialCharacterFromToolbar(page, specialCharacters.delta[1])
    await assertAnswer({
      answerText: specialCharacters.alpha[1] + specialCharacters.delta[1],
    })
  })

  test('can paste text from clipboard', async ({ page }) => {
    await setClipboardText(page, 'Hello World!')
    await paste(page)
    await assertAnswer({
      answerText: 'Hello World!',
    })
  })

  test('can paste HTML from clipboard', async ({ page }) => {
    await setClipboardHTML(page, '<p>Hello World!</p>')
    await paste(page)
    await assertAnswer({
      answerText: 'Hello World!',
      answerHtml: 'Hello World!',
    })
  })

  test('keeps line breaks in pre-formatted HTML content', async ({ page }) => {
    await setClipboardHTML(page, '<pre>Hello\nWorld!\n\nAll\ngood?</pre>')
    await paste(page)
    await assertAnswer({
      answerText: 'Hello\nWorld!\n\nAll\ngood?',
      answerHtml: 'Hello<br>World!<br><br>All<br>good?',
    })
  })

  test('can paste text with line breaks, and preserve line breaks', async ({ page }) => {
    await setClipboardText(page, 'Hello\nWorld!\n\nAll\ngood?')
    await paste(page)
    await assertAnswer({
      answerText: 'Hello\nWorld!\n\nAll\ngood?',
      answerHtml: 'Hello<br>World!<br><br>All<br>good?',
    })
  })

  // first line is often not inside a tag
  test('preserves line break after first line', async ({ page }) => {
    await setClipboardHTML(page, 'line1<div>line2</div><div>line3</div>')
    await paste(page)
    await assertAnswer({
      answerText: 'line1\nline2\nline3',
      answerHtml: 'line1<br>line2<br>line3',
    })
  })

  test('preserves tabs in pasted html', async ({ page }) => {
    const TAB = `${nbsp}${nbsp}${nbsp}${nbsp}`
    const htmlTab = '&nbsp;&nbsp;&nbsp;&nbsp;'
    await setClipboardHTML(page, 'Hello<br>\tWorld!<br><br>\t\tAll \tgood?')
    await paste(page)
    await assertAnswer({
      answerText: `Hello\n${TAB}World!\n\n${TAB}${TAB}All ${TAB}good?`,
      answerHtml: `Hello<br>${htmlTab}World!<br><br>${htmlTab}${htmlTab}All ${htmlTab}good?`,
    })
  })

  test('does not print double line breaks', async ({ page, browserName }) => {
    test.fixme(
      browserName === 'chromium',
      'This produces subtly different HTML in different browsers, only run this test in FF',
    )
    const textFromCollaboraWriter = `<body>\n<div>\n<p>line 1</p>\n<p>line 2</p>\n<p><br/></p>\n<p>line 3 after empty row</p>\n</div>\n</body>`
    await setClipboardHTML(page, textFromCollaboraWriter)
    await paste(page)
    await assertEditorHTMLContent(
      getEditorLocator(page),
      '\nline 1<br>\nline 2<br>\n<br>\nline 3 after empty row<br><br><br>',
    )
  })

  test('ignores carriage returns', async ({ page }) => {
    await setClipboardText(page, 'Hello\r\nWorld!')
    await paste(page)
    await assertAnswer({
      answerText: 'Hello\nWorld!',
      answerHtml: 'Hello<br>World!',
    })
  })

  test('can paste Python code from clipboard as HTML and retain line indentation', async ({ page, browserName }) => {
    // this is what copy pasting some code in Abicode produces:
    await setClipboardHTML(
      page,
      '<div><div><span>for</span><span> x </span><span>in</span><span> [</span><span>1</span><span>,</span><span>2</span><span>]:</span></div><div><span>    </span><span>for</span><span> y </span><span>in</span><span> [</span><span>3</span><span>,</span><span>4</span><span>]:</span></div><div><span>        </span><span>print</span><span>(x,y)</span></div></div>',
    )

    await paste(page)

    await assertAnswer({
      answerText: `for x in [1,2]:\n${nbsp}${nbsp}${nbsp}${nbsp}for y in [3,4]:\n${nbsp}${nbsp}${nbsp}${nbsp}${nbsp}${nbsp}${nbsp}${nbsp}print(x,y)`,
    })

    if (browserName === 'firefox') {
      await assertAnswer({
        answerHtml: `<span>for</span><span> x </span><span>in</span><span> [</span><span>1</span><span>,</span><span>2</span><span>]:</span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span>for</span><span> y </span><span>in</span><span> [</span><span>3</span><span>,</span><span>4</span><span>]:</span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span>print</span><span>(x,y)</span>`,
      })
    }

    if (browserName === 'chromium') {
      await assertAnswer({
        answerHtml: `for x in [1,2]:<br>&nbsp;&nbsp;&nbsp;&nbsp;for y in [3,4]:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(x,y)`,
      })
    }
  })

  test('can paste Python code from clipboard as text and retain line indentation', async ({ page }) => {
    // this is what clicking "copy code" in Abicode produces:
    await setClipboardText(page, 'for x in [1,2]:\n    print(x)')

    await paste(page)
    await assertAnswer({
      answerText: `for x in [1,2]:\n${nbsp}${nbsp}${nbsp}${nbsp}print(x)`,
      answerHtml: `for x in [1,2]:<br>&nbsp;&nbsp;&nbsp;&nbsp;print(x)`,
    })
  })

  test('escapes HTML content pasted as text', async ({ page }) => {
    await setClipboardText(page, `<script>This should be 'escaped' "properly"</script>`)
    await paste(page)
    await assertAnswer({
      answerText: `<script>This should be 'escaped' "properly"</script>`,
      answerHtml: `&lt;script&gt;This should be 'escaped' "properly"&lt;/script&gt;`,
    })
  })

  test('images with sources pointing outside are removed from pasted HTML', async ({ page }) => {
    await setClipboardHTML(page, `Hello <img src="www.test.com/test/pic.png" alt="test">World`)

    await paste(page)

    await assertAnswer({
      answerText: 'Hello World',
      answerHtml: 'Hello World',
    })
  })

  test('can paste png <img> from clipboard', async ({ page }) => {
    const img = `<img src="data:image/png;base64,${samplePNG}" alt="Hello World!">`
    await setClipboardHTML(page, img)
    await paste(page)

    await assertEditorHTMLContent(getEditorLocator(page), img)
  })

  test('can paste png file from clipboard', async ({ page, browserName }) => {
    test.fixme(browserName === 'firefox', 'image paste not working on firefox')
    const editor = getEditorLocator(page)
    await setClipboardImage(page, 'image/png', samplePNG)
    await paste(page)
    await expect(editor.locator('img')).toBeVisible()
  })

  // NOTE: This fails because `Type image/gif not supported on [clipboard] write`.
  // We need to come up with an altreantive way to test this if it's deemed important
  test.skip('can not paste a gif file from clipboard', async ({ page }) => {
    const editor = getEditorLocator(page)
    await setClipboardImage(page, 'image/gif', sampleGIF)
    await paste(page)
    await expect(editor.locator('img')).not.toBeVisible()
  })

  test('empty latex returns 200', async ({ page }) => {
    const response = await page.request.get('http://localhost:5111/math.svg?latex=')
    expect(response.status()).toBe(200)
  })

  test('missing latex returns 400', async ({ page }) => {
    const response = await page.request.get('http://localhost:5111/math.svg?%3Cspan%20class')
    expect(response.status()).toBe(400)
  })

  test('can paste equation SVG from clipboard', async ({ page }) => {
    const latex = '\\varepsilon=\\frac{Q_2}{Q_1-Q_2}=\\frac{1}{eta}-1'
    const url = `/math.svg?latex=${encodeURIComponent(latex)}`
    const img = `<img src="${url}" alt="${latex}">`

    await setClipboardHTML(page, img)
    await paste(page)
    const equation = page.getByAltText(latex)
    await expect(equation).toHaveCount(1)
    await equation.click()
    const equationEditor = page.getByTestId('equation-editor')
    await assertEquationEditorLatexContent(equationEditor, latex)
    await clickOutsideEditor(page)

    await assertAnswer({
      answerText: '',
      imageCount: 0,
    })

    const mathImage = getEditorLocator(page).getByRole('img')
    await expect(mathImage).toHaveAttribute('src', new RegExp(`/math.svg\\?latex=${encodeURIComponent(latex)}$`))
    await expect(mathImage).toHaveAttribute('alt', latex)
  })

  test('sanitizes pasted html', async ({ page }) => {
    const badHtml = '<div class="forbidden"><b>drop</b></div><div>bar</div><a href="/">link text</a> '
    const goodHtml = 'drop<br />bar<br />link text'

    const editor = getEditorLocator(page)
    await editor.click()

    await setClipboardHTML(page, badHtml)
    await paste(page)

    await assertAnswer({ answerHtml: goodHtml, answerText: 'drop\nbar\nlink text', imageCount: 0 })
  })

  test('deletes line breaks correctly', async ({ page }) => {
    const editor = getEditorLocator(page)
    await editor.click()
    await page.keyboard.press('Control+e')
    await repeat(3, async (i) => {
      await page.keyboard.type(`${i}`)
      await page.keyboard.press('Enter')
    })
    await editor.click()
    await expect(page.locator('.answer > img')).toHaveCount(3)
    await page.keyboard.press('ArrowLeft')
    await page.keyboard.press('ArrowUp')
    await page.keyboard.press('Backspace')
    await assertAnswer({
      answerHtml: `${getLatexImgTag('0')}${getLatexImgTag('1')}<br>${getLatexImgTag('2')}`,
    })
  })

  test('does not crash when multiple equations are deleted at the same time', async ({ page }) => {
    const editor = getEditorLocator(page)
    await editor.click()
    await page.keyboard.press('Control+e')
    await repeat(20, async (i) => {
      await page.keyboard.type(`${i}`)
      await page.keyboard.press('Enter')
    })
    await getEditorLocator(page).click()
    await selectAll(page)
    await page.keyboard.press('Backspace')
    await page.keyboard.press('Control+e')
    await page.keyboard.type('Hello!')
    await page.keyboard.press('Escape')

    await assertAnswer({
      answerHtml: `${getLatexImgTag('Hello!')}`,
    })
  })

  test('does not crash when multiple equations are pasted and then deleted at the same time', async ({ page }) => {
    const editor = getEditorLocator(page)
    await editor.click()
    await page.keyboard.press('Control+e')
    await page.keyboard.type('Hello!')
    await page.keyboard.press('Escape')
    await repeat(5, async () => {
      const html = await (await editor.elementHandle())?.asElement().innerHTML()
      if (html) {
        await setClipboardHTML(page, html)
        await paste(page)
      }
    })
    await selectAll(page)
    await page.keyboard.press('Backspace')
    await page.keyboard.press('Control+e')
    await page.keyboard.type('Hello!')
    await page.keyboard.press('Escape')

    await assertAnswer({
      answerHtml: `${getLatexImgTag('Hello!')}`,
    })
  })

  test('prevents dragging and dropping content', async ({ page }) => {
    const editor = getEditorLocator(page)

    await page.evaluate(() => {
      const source = document.createElement('div')
      source.id = 'drag-source'
      source.textContent = 'Drag me'
      source.draggable = true
      document.body.appendChild(source)
    })

    await test.step('prevents text drag and drop', async () => {
      await page.dragAndDrop('#drag-source', '[data-testid="rich-text-editor"]')
      await assertEditorHTMLContent(editor, '')
    })

    await test.step('prevents image drag and drop', async () => {
      await page.evaluate((imageData) => {
        const img = document.createElement('img')
        img.id = 'drag-image'
        img.src = `data:image/png;base64,${imageData}`
        img.draggable = true
        document.body.appendChild(img)
      }, samplePNG)

      await page.dragAndDrop('#drag-image', '[data-testid="rich-text-editor"]')
      await assertEditorHTMLContent(editor, '')
    })
  })

  test.describe('toolbar', () => {
    test('appears and closes according to editor and math editor focus', async ({ page }) => {
      await test.step('appears when editor is focused', async () => {
        await clickOutsideEditor(page)
        await expect(page.getByTestId('toolbar')).not.toBeVisible()
        await getEditorLocator(page).click()
        await expect(page.getByTestId('toolbar')).toBeVisible()
      })

      await test.step('renders math commands when a math editor is open', async () => {
        await page.keyboard.press('Control+e')
        await expect(page.getByTestId('math-toolbar')).toBeVisible()
      })

      await test.step('hides math commands when math editor closes via Esc press', async () => {
        await inputLatexCommandFromToolbar(page, specialCharacters.sqrt[0])
        await page.keyboard.press('Escape')
        await expect(page.getByTestId('math-toolbar')).not.toBeVisible()
      })
    })

    test('closes both bars when user clicks outside editor text area when equation editor is open', async ({
      page,
    }) => {
      await page.keyboard.press('Control+e')
      await page.keyboard.type('123')
      await clickOutsideEditor(page)
      await expect(page.getByTestId('toolbar')).not.toBeVisible()
      await expect(page.getByTestId('math-toolbar')).not.toBeVisible()
    })

    test('special character buttons output correct unicode in the main text area', async ({ page }) => {
      await getEditorLocator(page).click()
      await page.getByTestId('toggle-all-special-characters').click()
      const specialCharacters = await page.getByTestId('special-character').all()

      for (const char of specialCharacters) {
        await char.click()
      }

      await page.waitForTimeout(1000)

      await assertAnswer({
        answerText: [BASIC, ALGEBRA, GEOMETRY, SET_THEORY]
          .flat()
          .map((char) => char.label)
          .join(''),
      })
    })

    test('special character buttons output correct unicode in an equation', async ({ page }) => {
      await getEditorLocator(page).click()
      await page.keyboard.press('Control+e')
      await page.getByTestId('toggle-all-special-characters').click()
      const specialCharacters = await page.getByTestId('special-character').all()

      for (const char of specialCharacters) {
        await char.click()
      }

      await page.keyboard.press('Escape')

      await assertAnswer({
        answerHtml: `${getLatexImgTag('°\\cdot\\times\\pm\\infty^{23}\\frac{1}{2}\\frac{1}{3}\\pi‰\\alpha\\beta\\Gamma\\gamma\\Delta\\delta\\varepsilon\\zeta\\eta\\theta\\vartheta\\iota\\kappa\\Lambda\\lambda\\mu\\nu\\Xi\\xi\\Pi\\rho\\Sigma\\sigma\\tau\\Upsilon\\upsilon\\Phi\\phi\\chi\\Psi\\psi\\Omega\\omega\\partial\\varphi\\ne\\approx\\le\\ge<>\\sim\\equiv\\not\\equiv\\circ\\ldots\\propto\\sphericalangle\\mid\\parallel\\xrightleftharpoons[⇅\\angle\\uparrow\\nearrow\\searrow\\downarrow\\leftrightarrow\\perp\\rightarrow\\Rightarrow\\Leftrightarrow\\in\\mathbb{Z}\\mathbb{R}\\exists\\forall\\mathbb{N}\\mathbb{Q}\\cap\\cup\\setminus\\subset\\not\\subset\\notin\\varnothing\\wedge\\vee\\neg\\nabla]{}')}`,
      })
    })
  })

  test.describe('Editor history', () => {
    const historyTimeout = 550 // History updates have a 500ms debounce
    const writeAndWaitForTimeout = async (page: Page, text: string) => {
      await page.keyboard.type(text)
      await page.waitForTimeout(historyTimeout)
    }

    test.beforeEach(async ({ page }) => {
      const editor = getEditorLocator(page)
      await editor.click()
    })

    test('can undo and redo changes', async ({ page, browserName }) => {
      await test.step('Ctrl+Z undoes changes', async () => {
        await writeAndWaitForTimeout(page, 'aa')
        await assertAnswer({ answerText: 'aa' })
        await writeAndWaitForTimeout(page, 'bb')
        await assertAnswer({ answerText: 'aabb' })
        await page.keyboard.press('Control+z')
        await assertAnswer({ answerText: 'aa' })
      })

      await test.step('undo at earlies change does nothing', async () => {
        await page.keyboard.press('Control+z')
        await assertAnswer({ answerText: '' })
        await page.keyboard.press('Control+z')
        await assertAnswer({ answerText: '' })
      })

      await test.step('Ctrl+Y redoes changes', async () => {
        await page.keyboard.press('Control+y')
        await assertAnswer({ answerText: 'aa' })
        await page.keyboard.press('Control+y')
        await assertAnswer({ answerText: 'aabb' })
      })

      await test.step('typing clears changes', async () => {
        await page.keyboard.press('Control+z')
        await assertAnswer({ answerText: 'aa' })
        await page.keyboard.press('Control+z')
        await assertAnswer({ answerText: '' })
        await writeAndWaitForTimeout(page, 'cc')
        await assertAnswer({ answerText: 'cc' })
      })

      await test.step('redo at latest change does nothing', async () => {
        await page.keyboard.press('Control+y')
        await assertAnswer({ answerText: 'cc' })
      })

      await test.step('equations can be undone', async () => {
        await page.keyboard.press('Control+e')
        await page.keyboard.type('xxx')
        await getEditorLocator(page).click()
        await assertAnswer({ answerHtml: `cc${getLatexImgTag('xxx')}` })
        await page.waitForTimeout(historyTimeout)
        await page.keyboard.press('Control+z')
        await assertAnswer({ answerHtml: 'cc' })
      })

      await test.step('equations can be redone', async () => {
        await page.keyboard.press('Control+y')
        await assertAnswer({ answerHtml: `cc${getLatexImgTag('xxx')}` })
        await getEditorLocator(page).getByRole('img').click()
        await page.waitForTimeout(historyTimeout)
        await page.keyboard.type('yyy')
        await page.keyboard.press('Escape')
        await assertAnswer({ answerHtml: `cc${getLatexImgTag('xxxyyy')}` })
      })

      await test.step('pasting images can be undone', async () => {
        test.fixme(browserName === 'firefox', 'image paste not working on firefox')
        await getEditorLocator(page).click()
        await page.waitForTimeout(historyTimeout)
        await page.keyboard.press('Control+z')
        await page.keyboard.press('Control+z')
        await assertAnswer({ answerHtml: 'cc' })
        await setClipboardImage(page, 'image/png', samplePNG)
        await paste(page)
        await expect(getEditorLocator(page).getByRole('img')).toBeVisible()
        await page.waitForTimeout(historyTimeout)
        await page.keyboard.press('Control+z')
        await expect(getEditorLocator(page).getByRole('img')).not.toBeVisible()
      })

      await test.step('pasting images can be redone', async () => {
        test.fixme(browserName === 'firefox', 'image paste not working on firefox')
        await page.keyboard.press('Control+y')
        await expect(getEditorLocator(page).getByRole('img')).toBeVisible()
      })
    })

    test('cursor is returned to the correct position', async ({ page, browserName }) => {
      test.fixme(
        browserName === 'firefox',
        'There are some differences in how exactly this works across browsers, Chromium seems to be more consistent so focusing on that',
      )
      await test.step('on undo', async () => {
        await page.keyboard.type('This is a test')

        await page.waitForTimeout(historyTimeout)
        await repeat(4, async () => {
          await page.keyboard.press('ArrowLeft')
        })

        await page.keyboard.type('component ')
        await assertAnswer({ answerHtml: 'This is a component test' })

        await repeat(4, async () => {
          await page.keyboard.press('ArrowRight')
        })

        await page.waitForTimeout(historyTimeout)
        await page.keyboard.press('Control+z')
        await page.keyboard.type('(1) ')
        await assertAnswer({ answerHtml: 'This is a (1) test' })
      })

      await test.step('on redo', async () => {
        await page.waitForTimeout(historyTimeout)
        await page.keyboard.press('Control+z')
        await repeat(6, async () => {
          await page.keyboard.press('ArrowLeft')
        })

        await page.keyboard.press('Control+y')
        await page.keyboard.type('(2) ')
        await assertAnswer({ answerHtml: 'This is a (1) (2) test' })
      })

      await test.step('on undo across different lines', async () => {
        await page.waitForTimeout(historyTimeout)
        await repeat(4, async () => {
          await page.keyboard.press('ArrowRight')
        })

        await page.keyboard.press('Enter')
        const secondLine = 'This is a second line'
        await page.keyboard.type(secondLine)
        await page.waitForTimeout(historyTimeout)

        await repeat(secondLine.length, async () => {
          await page.keyboard.press('ArrowLeft')
        })
        await page.keyboard.press('ArrowUp')
        await repeat(4, async () => {
          await page.keyboard.press('ArrowRight')
        })

        await page.keyboard.type(' (3)')
        await page.waitForTimeout(historyTimeout)
        await assertAnswer({ answerText: 'This (3) is a (1) (2) test\nThis is a second line' })

        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('ArrowDown')
        await page.keyboard.type(' (4)')
        await assertAnswer({ answerText: 'This (3) is a (1) (2) test\nThis is a second line (4)' })
        await page.waitForTimeout(historyTimeout)
        await page.keyboard.press('Control+z')
        await page.keyboard.press('Control+z')
        await page.keyboard.type(' (5)')
        await assertAnswer({ answerText: 'This (5) is a (1) (2) test\nThis is a second line' })
      })
    })
  })

  test.describe('selecting text', () => {
    test.beforeEach(async ({ page }) => {
      const editor = getEditorLocator(page)
      await editor.click()
    })

    test('can remove selected text', async ({ page }) => {
      await page.keyboard.type('Hello World!')
      await selectEditorContent(getEditorLocator(page), 2, 9)
      await page.keyboard.press('Backspace')

      await assertEditorTextContent(getEditorLocator(page), 'Held!')
      await assertAnswer({ answerHtml: 'Held!', answerText: 'Held!', imageCount: 0 })
    })

    test('can remove selected text and image', async ({ page }) => {
      const img = `<img src="data:image/png;base64,${samplePNG}" alt="Hello World!">`
      await page.keyboard.type('Hello')
      await pasteHtmlImage(page, img)
      await page.keyboard.type('World!')
      await selectEditorContent(getEditorLocator(page), 2, 9)
      await page.keyboard.press('Backspace')

      await assertAnswer({ answerHtml: 'Hed!', answerText: 'Hed!', imageCount: 0 })
    })

    test.describe('can replace selected text with ', () => {
      test.beforeEach(async ({ page }) => {
        await page.keyboard.type('Hello World!')
        await selectEditorContent(getEditorLocator(page), 1, 9)
      })

      test('with text', async ({ page }) => {
        await page.keyboard.press('o')

        await assertEditorTextContent(getEditorLocator(page), 'Hold!')
        await assertAnswer({ answerHtml: 'Hold!', answerText: 'Hold!', imageCount: 0 })
      })

      test('with a special character', async ({ page }) => {
        await inputSpecialCharacterFromToolbar(page, specialCharacters.alpha[1])
        await clickOutsideEditor(page)

        await assertAnswer({ answerText: `H${specialCharacters.alpha[1]}ld!` })
      })

      test('with an equation', async ({ page }) => {
        await page.keyboard.press('Control+e')
        await inputLatexCommandFromToolbar(page, specialCharacters.cos[0])
        await clickOutsideEditor(page)

        await assertAnswer({ answerText: 'Hld!' })
      })

      test('with a pasted image', async ({ page }) => {
        const editor = getEditorLocator(page)
        const img = `<img src="data:image/png;base64,${samplePNG}" alt="Hello World!">`
        await pasteHtmlImage(page, img)

        expect(await editor.innerHTML()).toContain(`H${img}ld!`)
        await assertAnswer({
          answerText: 'Hld!',
          imageCount: 1,
        })
      })
    })
  })

  test.describe('Equation editor', () => {
    test.beforeEach(async ({ page }) => {
      const editor = getEditorLocator(page)
      await editor.click()
      await page.getByRole('button', { name: 'Lisää kaava' }).click()
      await expect(page.getByTestId('equation-editor')).toHaveCount(1)
    })

    test.describe('can undo and redo changes with ', () => {
      test.beforeEach(async ({ page }) => {
        await inputLatexCommandFromToolbar(page, specialCharacters.sqrt[0])
        await page.keyboard.press('1')
        await expect(getUndoButton(page)).toBeEnabled()
        await expect(getRedoButton(page)).toBeDisabled()
      })

      test('toolbar buttons', async ({ page }) => {
        await getUndoButton(page).click()
        await expect(getRedoButton(page)).toBeEnabled()
        await page.keyboard.press('ArrowLeft')
        await page.keyboard.press('2')
        await expect(getRedoButton(page)).toBeDisabled()
        await getUndoButton(page).click()
        await assertEquationEditorLatexContent(page.getByTestId('equation-editor'), '\\sqrt{ }')
        await getRedoButton(page).click()
        await assertEquationEditorLatexContent(page.getByTestId('equation-editor'), '\\sqrt{2}')
      })

      test('hotkeys', async ({ page }) => {
        await page.keyboard.press('Control+z')
        await expect(getRedoButton(page)).toBeEnabled()
        await page.keyboard.press('ArrowLeft')
        await page.keyboard.press('2')
        await expect(getRedoButton(page)).toBeDisabled()
        await page.keyboard.press('Control+z')
        await expect(getRedoButton(page)).toBeEnabled()
        await assertEquationEditorLatexContent(page.getByTestId('equation-editor'), '\\sqrt{ }')
        await page.keyboard.press('Control+y')
        await assertEquationEditorLatexContent(page.getByTestId('equation-editor'), '\\sqrt{2}')
      })
    })

    test('redo when on latest change does nothing', async ({ page }) => {
      await page.keyboard.press('1')
      await page.keyboard.press('2')
      await assertEquationEditorLatexContent(page.getByTestId('equation-editor'), '12')
      await page.keyboard.press('Control+z')
      await assertEquationEditorLatexContent(page.getByTestId('equation-editor'), '1')
      await page.keyboard.press('Control+y')
      await page.keyboard.press('Control+y')
      await assertEquationEditorLatexContent(page.getByTestId('equation-editor'), '12')
    })

    test('math editor gets focus when opened with Ctrl+e', async ({ page, browserName }) => {
      test.fixme(browserName === 'chromium', 'focus events do not work correctly in Chromium tests as of writing this')
      await page.keyboard.press('Escape')
      await expect(page.getByTestId('equation-editor')).not.toBeVisible()
      await page.keyboard.press('Control+e')
      await expect(page.locator('.math-editor-equation-field')).toBeVisible()
    })

    test('math editor gets focus when opened with Ctrl+E (case insensitive keyboard event handling)', async ({
      page,
      browserName,
    }) => {
      test.fixme(browserName === 'chromium', 'focus events do not work correctly in Chromium tests as of writing this')
      await page.keyboard.press('Escape')
      await expect(page.getByTestId('equation-editor')).not.toBeVisible()
      await page.keyboard.press('Control+E')
      await expect(page.locator('.math-editor-equation-field')).toBeVisible()
    })

    test('can insert LaTeX commands', async ({ page }) => {
      const equationEditor = page.getByTestId('equation-editor')
      await inputLatexCommandFromToolbar(page, specialCharacters.sqrt[0])
      await assertEquationEditorTextContent(equationEditor, '√​')
      await assertEquationEditorLatexContent(equationEditor, '\\sqrt{ }')
      await page.keyboard.press('1')
      await assertEquationEditorTextContent(equationEditor, '√1​')
      await assertEquationEditorLatexContent(equationEditor, '\\sqrt{1}')
    })

    test('closes on focus loss and reopens on click', async ({ page }) => {
      const equationEditor = page.getByTestId('equation-editor')
      await inputLatexCommandFromToolbar(page, specialCharacters.sqrt[0])
      await assertEquationEditorTextContent(equationEditor, '√​')
      await clickOutsideEditor(page)
      await expect(getEditorLocator(page).locator('img')).toBeVisible()
      await getEditorLocator(page).locator('img').click()
    })

    test('closes on Esc press', async ({ page, browserName }) => {
      test.fixme(browserName === 'chromium', 'blur on Esc not working on Chromium in test, works in real browser')
      await page.keyboard.press('A')
      await page.keyboard.press('Escape')
      await expect(page.getByTestId('equation-editor')).not.toBeVisible()

      await test.step(' and places cursor after equation image', async () => {
        await page.keyboard.press('B')

        await assertAnswer({ answerText: 'B' })
      })
    })

    test('is removed if closed with empty LaTeX', async ({ page }) => {
      await clickOutsideEditor(page)
      await assertEditorHTMLContent(getEditorLocator(page), '')
    })

    test('opens with hot key', async ({ page }) => {
      await repeat(2, async () => await page.keyboard.press('Backspace'))
      await expect(page.getByTestId('equation-editor')).toHaveCount(1)
      await clickOutsideEditor(page)
      await expect(page.getByTestId('equation-editor')).toHaveCount(0)
      await getEditorLocator(page).click()
      await page.keyboard.press('Control+e')
      await expect(page.getByTestId('equation-editor')).toHaveCount(1)
    })

    test('editing LaTeX updates the MathQuill field', async ({ page }) => {
      const equationEditor = page.getByTestId('equation-editor')
      await page.keyboard.press('Tab')
      await page.keyboard.type('\\sqrt{1}')
      await assertEquationEditorTextContent(equationEditor, '√1')
    })

    test('editing the Mathquill field updates the LaTeX', async ({ page }) => {
      const equationEditor = page.getByTestId('equation-editor')
      await inputLatexCommandFromToolbar(page, specialCharacters.sqrt[0])
      await page.keyboard.press('1')
      await page.keyboard.press('ArrowRight')
      await page.keyboard.press('2')
      await assertEquationEditorLatexContent(equationEditor, '\\sqrt{1}2')
    })

    test('writing invalid LaTeX shows error message', async ({ page }) => {
      await page.keyboard.press('Tab')
      await page.keyboard.type('\\sqt{1}')
      await expect(page.getByText(fi.editor.render_error)).toBeVisible()
    })

    test('opens a new editor on the next line when Enter is pressed', async ({ page }) => {
      await page.keyboard.press('1')
      await page.keyboard.press('Enter')
      await page.keyboard.press('2')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')

      await expect(page.locator('.answer > img')).toHaveCount(2)

      await test.step('opens a new editor after the active equation', async () => {
        const editor = getEditorLocator(page)
        await expect(editor.getByRole('img').first()).toBeVisible()
        await editor.getByRole('img').first().click()
        await page.keyboard.press('Enter')
        await page.keyboard.press('3')
        await page.keyboard.press('Escape')

        await expect(editor.getByRole('img')).toHaveCount(3)
        await expect(editor.getByRole('img').nth(0)).toHaveAttribute('alt', '1')
        await expect(editor.getByRole('img').nth(1)).toHaveAttribute('alt', '3')
        await expect(editor.getByRole('img').nth(2)).toHaveAttribute('alt', '2')
      })
    })

    test('updates the answer when equation is changed', async ({ page }) => {
      await page.keyboard.press('1')
      await assertAnswer({ answerHtml: getLatexImgTag('1') })
      await page.keyboard.press('2')
      await assertAnswer({ answerHtml: getLatexImgTag('12') })

      await test.step('updates on undo', async () => {
        await page.keyboard.press('Control+z')
        await assertAnswer({ answerHtml: getLatexImgTag('1') })
      })

      await test.step('updates with long text', async () => {
        await page.keyboard.type('testing that this works when there is a lot of text as well')
        await assertAnswer({
          answerHtml: getLatexImgTag(
            '1testing\\ that\\ this\\ works\\ when\\ there\\ is\\ a\\ lot\\ of\\ text\\ as\\ well',
          ),
        })
        await selectAll(page)
        await page.keyboard.press('Backspace')
        await assertAnswer({ answerHtml: getLatexImgTag('') })
      })

      await test.step('updates when latex command is inserted', async () => {
        await inputLatexCommandFromToolbar(page, specialCharacters.sqrt[0])
        await assertAnswer({ answerHtml: getLatexImgTag('\\sqrt{ }') })
        await page.keyboard.type('123')
        await assertAnswer({ answerHtml: getLatexImgTag('\\sqrt{123}') })
      })

      await test.step('updates when re-opnening an equation', async () => {
        await page.keyboard.press('Escape')
        await assertAnswer({ answerHtml: getLatexImgTag('\\sqrt{123}') })
        await getEditorLocator(page).getByRole('img').first().click()
        await page.keyboard.type('abc')
        await assertAnswer({ answerHtml: getLatexImgTag('\\sqrt{123}abc') })
      })
    })

    test.describe('when multiple equation editors in answer', () => {
      test.beforeEach(async ({ page }) => {
        await page.keyboard.press('A')
        await clickOutsideEditor(page)
        await getEditorLocator(page).click()
        await page.getByRole('button', { name: 'Lisää kaava' }).click()
        await page.keyboard.press('B')
        await clickOutsideEditor(page)
        await expect(page.locator('.answer > img')).toHaveCount(2)
        await assertAnswer({
          answerHtml: `${getLatexImgTag('A')}${getLatexImgTag('B')}`,
        })
      })

      test('can edit both equations separately', async ({ page }) => {
        const editor = getEditorLocator(page)
        await editor.getByRole('img').first().click()
        await page.keyboard.press('2')
        await page.keyboard.press('Escape')
        await expect(page.locator('.answer > img')).toHaveCount(2)
        await editor.getByRole('img').last().click()
        await page.keyboard.press('2')
        await page.keyboard.press('Escape')
        await assertAnswer({
          answerHtml: `${getLatexImgTag('A2')}${getLatexImgTag('B2')}`,
        })
      })
    })

    // These are not important right now, skipping
    // TODO: Make these blur events place the cursor in the correct position
    test.describe.skip('blur event sets cursor', () => {
      test.beforeEach(async ({ page, mount }) => {
        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')
        await setClipboardHTML(
          page,
          `kaava: <img src="http://localhost:5111/math.svg?latex=%5Csqrt%7B123%7D" alt="\\sqrt{123}"/> ja tekstiä`,
        )
        await paste(page)
      })

      test('after math editor with Esc', async ({ page }) => {
        await expect(page.getByRole('img').last()).toBeVisible()
        await page.getByRole('img').last().click()
        await page.keyboard.press('Escape')
        await page.keyboard.type('XX')

        await assertAnswer({
          answerHtml: 'kaava: <img alt="\\sqrt{123}">XX ja tekstiä',
        })
      })

      test('before math editor with Shift+Tab', async ({ page }) => {
        await expect(page.getByRole('img').last()).toBeVisible()
        await page.getByRole('img').last().click()
        await page.keyboard.press('Shift+Tab')
        await page.keyboard.type('XX')

        await assertAnswer({
          answerHtml: 'kaava: XX<img alt="\\sqrt{123}"> ja tekstiä',
        })
      })

      test('after editor with Tab in Latex field', async ({ page }) => {
        await expect(page.getByRole('img').last()).toBeVisible()
        await page.getByRole('img').last().click()
        // first Tab to focus latex-field
        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')
        await page.keyboard.type('XX')

        await assertAnswer({
          answerHtml: 'kaava: <img alt="\\sqrt{123}">XX ja tekstiä',
        })
      })

      test('within text on mouse click', async ({ page }) => {
        await expect(page.getByRole('img').last()).toBeVisible()
        await page.getByRole('img').last().click()
        await page.mouse.click(33, 320)
        await page.keyboard.type('XX')

        await assertAnswer({
          answerText: 'kaXXava:  ja tekstiä',
        })
      })
    })
  })

  test.describe('initial value', () => {
    test.beforeEach(async ({ mount }) => {
      const initialContent = `
testi.
kuva: <img src="data:image/png;base64,${samplePNG}" alt="Hello World!">
kaava 1: <img
  src="http://localhost:5111/math.svg?latex=%5Csqrt%7B123%7D"
  alt="\\sqrt{123}"
/>
kaava 2: <img
  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzLjA2MWV4IiBoZWlnaHQ9IjIuMzk4ZXgiIHJvbGU9ImltZyIgZm9jdXNhYmxlPSJmYWxzZSIgdmlld0JveD0iMCAtMTAwOC4zIDEzNTMgMTA2MCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGFyaWEtaGlkZGVuPSJ0cnVlIiBzdHlsZT0idmVydGljYWwtYWxpZ246IC0wLjExN2V4OyI+PGRlZnM+PHBhdGggaWQ9Ik1KWC0yLVRFWC1OLTIyMUEiIGQ9Ik05NSAxNzhRODkgMTc4IDgxIDE4NlQ3MiAyMDBUMTAzIDIzMFQxNjkgMjgwVDIwNyAzMDlRMjA5IDMxMSAyMTIgMzExSDIxM1EyMTkgMzExIDIyNyAyOTRUMjgxIDE3N1EzMDAgMTM0IDMxMiAxMDhMMzk3IC03N1EzOTggLTc3IDUwMSAxMzZUNzA3IDU2NVQ4MTQgNzg2UTgyMCA4MDAgODM0IDgwMFE4NDEgODAwIDg0NiA3OTRUODUzIDc4MlY3NzZMNjIwIDI5M0wzODUgLTE5M1EzODEgLTIwMCAzNjYgLTIwMFEzNTcgLTIwMCAzNTQgLTE5N1EzNTIgLTE5NSAyNTYgMTVMMTYwIDIyNUwxNDQgMjE0UTEyOSAyMDIgMTEzIDE5MFQ5NSAxNzhaIj48L3BhdGg+PHBhdGggaWQ9Ik1KWC0yLVRFWC1OLTMxIiBkPSJNMjEzIDU3OEwyMDAgNTczUTE4NiA1NjggMTYwIDU2M1QxMDIgNTU2SDgzVjYwMkgxMDJRMTQ5IDYwNCAxODkgNjE3VDI0NSA2NDFUMjczIDY2M1EyNzUgNjY2IDI4NSA2NjZRMjk0IDY2NiAzMDIgNjYwVjM2MUwzMDMgNjFRMzEwIDU0IDMxNSA1MlQzMzkgNDhUNDAxIDQ2SDQyN1YwSDQxNlEzOTUgMyAyNTcgM1ExMjEgMyAxMDAgMEg4OFY0NkgxMTRRMTM2IDQ2IDE1MiA0NlQxNzcgNDdUMTkzIDUwVDIwMSA1MlQyMDcgNTdUMjEzIDYxVjU3OFoiPjwvcGF0aD48L2RlZnM+PGcgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIGZpbGw9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIwIiB0cmFuc2Zvcm09InNjYWxlKDEsLTEpIj48ZyBkYXRhLW1tbC1ub2RlPSJtYXRoIj48ZyBkYXRhLW1tbC1ub2RlPSJtc3FydCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoODUzLDApIj48ZyBkYXRhLW1tbC1ub2RlPSJtbiI+PHVzZSBkYXRhLWM9IjMxIiB4bGluazpocmVmPSIjTUpYLTItVEVYLU4tMzEiPjwvdXNlPjwvZz48L2c+PGcgZGF0YS1tbWwtbm9kZT0ibW8iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsMTQ4LjMpIj48dXNlIGRhdGEtYz0iMjIxQSIgeGxpbms6aHJlZj0iI01KWC0yLVRFWC1OLTIyMUEiPjwvdXNlPjwvZz48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjYwIiB4PSI4NTMiIHk9Ijg4OC4zIj48L3JlY3Q+PC9nPjwvZz48L2c+PC9zdmc+"
  alt="\\sqrt{1}"
/>
kaava 3: <img
  src="/custom?l=\\sqrt{2}"
  alt="square root of 2"
  data-math-image=""
  data-latex="\\sqrt{2}"
/>
`

      await unmountComponent()
      await mount(
        <RichTextEditor
          language="FI"
          baseUrl="http://localhost:5111"
          onValueChange={onAnswerChange}
          allowedFileTypes={['image/png', 'image/jpeg']}
          initialValue={initialContent}
          textAreaProps={{ editorStyle: { marginTop: '300px' } }}
        />,
      )
    })

    test('is editable when img src is math.svg path', async ({ page }) => {
      const equationEditor = getEditorLocator(page)
      const image = page.getByRole('img').nth(1)
      await expect(image).toBeVisible()
      await image.click()
      await assertEquationEditorLatexContent(equationEditor, '\\sqrt{123}')
      await clickOutsideEditor(page)
      await assertAnswer({ imageCount: 3 })
    })

    test('is editable when img src is a data url', async ({ page }) => {
      const equationEditor = getEditorLocator(page)
      const image = page.getByRole('img').nth(2)
      await expect(image).toBeVisible()
      await image.click()
      await assertEquationEditorLatexContent(equationEditor, '\\sqrt{1}')
      await clickOutsideEditor(page)
      await assertAnswer({ imageCount: 3 })
    })

    test('is editable when img src and alt are custom values', async ({ page }) => {
      const equationEditor = getEditorLocator(page)
      const image = page.getByRole('img').nth(3)
      await expect(image).toBeVisible()
      await image.click()
      await assertEquationEditorLatexContent(equationEditor, '\\sqrt{2}')
      await clickOutsideEditor(page)
      await assertAnswer({ imageCount: 3 })
    })
  })
})
