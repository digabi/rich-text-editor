import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react'
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
import { Page } from '@playwright/test'

test.describe('Rich text editor', () => {
  let answer: Answer = { answerHtml: '', answerText: '', imageCount: 0 }
  let unmountComponent: () => Promise<void>

  const onAnswerChange = (newAnswer: Answer) => {
    answer = newAnswer
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
    const editor = getEditorLocator(page)
    await page.keyboard.type('Hello World!')

    assertAnswerContent(answer, { answerHtml: 'Hello World!', answerText: 'Hello World!' })
  })

  test('can erase', async ({ page }) => {
    await test.step('text', async () => {
      await page.keyboard.type('Hello World!')
      assertAnswerContent(answer, { answerHtml: 'Hello World!', answerText: 'Hello World!' })
      await repeat(7, async () => {
        await page.keyboard.press('Backspace')
      })
      assertAnswerContent(answer, { answerHtml: 'Hello', answerText: 'Hello' })
    })

    await test.step('equations', async () => {
      await page.keyboard.press('Control+E')
      await page.keyboard.type('x^2')
      await page.keyboard.press('Escape')
      assertAnswerContent(answer, {
        answerHtml: `Hello${getLatexImgTag('x^2')}`,
        answerText: 'Hello',
      })
      await page.keyboard.press('Backspace')
      assertAnswerContent(answer, {
        answerHtml: 'Hello',
        answerText: 'Hello',
      })
    })
  })

  test('can input special characters from toolbar', async ({ page }) => {
    await inputSpecialCharacterFromToolbar(page, specialCharacters.alpha[1])
    assertAnswerContent(answer, {
      answerText: specialCharacters.alpha[1],
    })

    await page.getByTestId('toggle-all-special-characters').click()

    await inputSpecialCharacterFromToolbar(page, specialCharacters.delta[1])
    assertAnswerContent(answer, {
      answerText: specialCharacters.alpha[1] + specialCharacters.delta[1],
    })
  })

  test('can paste text from clipboard', async ({ page }) => {
    await setClipboardText(page, 'Hello World!')
    await paste(page)
    assertAnswerContent(answer, {
      answerText: 'Hello World!',
    })
  })

  test('can paste HTML from clipboard', async ({ page }) => {
    await setClipboardHTML(page, '<p>Hello World!</p>')
    await paste(page)
    assertAnswerContent(answer, {
      answerText: 'Hello World!',
      answerHtml: 'Hello World!',
    })
  })

  test('can paste png <img> from clipboard', async ({ page }) => {
    const img = `<img src="data:image/png;base64,${samplePNG}" alt="Hello World!">`
    await setClipboardHTML(page, img)
    await paste(page)

    assertAnswerContent(answer, {
      answerHtml: img,
      imageCount: 1,
    })
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

  test('can paste equation SVG from clipboard', async ({ page }) => {
    const latex = '\\varepsilon=\\frac{Q_2}{Q_1-Q_2}=\\frac{1}{eta}-1'
    const url = new URL(
      `/math.svg?latex=${encodeURIComponent(latex)}`,
      'http://www.this.should.not.matter.com',
    ).toString()
    const img = `<img src="${url}" alt="${latex}">`

    await setClipboardHTML(page, img)
    await paste(page)
    const equation = page.getByAltText(latex)
    await expect(equation).toHaveCount(1)
    await equation.click()
    const equationEditor = page.getByTestId('equation-editor')
    await assertEquationEditorLatexContent(equationEditor, latex)
    await clickOutsideEditor(page)

    assertAnswerContent(answer, {
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

    assertAnswerContent(answer, { answerHtml: goodHtml, answerText: 'drop\nbar\nlink text', imageCount: 0 })
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
    assertAnswerContent(answer, {
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

    assertAnswerContent(answer, {
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

    assertAnswerContent(answer, {
      answerHtml: `${getLatexImgTag('Hello!')}`,
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

      await test.step('hides math commands when math editor closes', async () => {
        await inputLatexCommandFromToolbar(page, specialCharacters.sqrt[0])
        await page.keyboard.press('Escape')
        await expect(page.getByTestId('math-toolbar')).not.toBeVisible()
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
        assertAnswerContent(answer, { answerText: 'aa' })
        await writeAndWaitForTimeout(page, 'bb')
        assertAnswerContent(answer, { answerText: 'aabb' })
        await page.keyboard.press('Control+z')
        assertAnswerContent(answer, { answerText: 'aa' })
      })

      await test.step('undo at earlies change does nothing', async () => {
        await page.keyboard.press('Control+z')
        assertAnswerContent(answer, { answerText: '' })
        await page.keyboard.press('Control+z')
        assertAnswerContent(answer, { answerText: '' })
      })

      await test.step('Ctrl+Y redoes changes', async () => {
        await page.keyboard.press('Control+y')
        assertAnswerContent(answer, { answerText: 'aa' })
        await page.keyboard.press('Control+y')
        assertAnswerContent(answer, { answerText: 'aabb' })
      })

      await test.step('typing clears changes', async () => {
        await page.keyboard.press('Control+z')
        assertAnswerContent(answer, { answerText: 'aa' })
        await page.keyboard.press('Control+z')
        assertAnswerContent(answer, { answerText: '' })
        await writeAndWaitForTimeout(page, 'cc')
        assertAnswerContent(answer, { answerText: 'cc' })
      })

      await test.step('redo at latest change does nothing', async () => {
        await page.keyboard.press('Control+y')
        assertAnswerContent(answer, { answerText: 'cc' })
      })

      await test.step('equations can be undone', async () => {
        await page.keyboard.press('Control+e')
        await page.keyboard.type('xxx')
        //await page.keyboard.press('Escape')
        await getEditorLocator(page).click()
        assertAnswerContent(answer, { answerHtml: `cc${getLatexImgTag('xxx')}` })
        await page.waitForTimeout(historyTimeout)
        await page.keyboard.press('Control+z')
        assertAnswerContent(answer, { answerHtml: 'cc' })
      })

      await test.step('equations can be redone', async () => {
        await page.keyboard.press('Control+y')
        assertAnswerContent(answer, { answerHtml: `cc${getLatexImgTag('xxx')}` })
        await getEditorLocator(page).getByRole('img').click()
        await page.waitForTimeout(historyTimeout)
        await page.keyboard.type('yyy')
        await page.keyboard.press('Escape')
        assertAnswerContent(answer, { answerHtml: `cc${getLatexImgTag('xxxyyy')}` })
      })

      await test.step('pasting images can be undone', async () => {
        test.fixme(browserName === 'firefox', 'image paste not working on firefox')
        await getEditorLocator(page).click()
        await page.waitForTimeout(historyTimeout)
        await page.keyboard.press('Control+z')
        await page.keyboard.press('Control+z')
        assertAnswerContent(answer, { answerHtml: 'cc' })
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
      assertAnswerContent(answer, { answerHtml: 'Held!', answerText: 'Held!', imageCount: 0 })
    })

    test('can remove selected text and image', async ({ page }) => {
      const img = `<img src="data:image/png;base64,${samplePNG}" alt="Hello World!">`
      await page.keyboard.type('Hello')
      await pasteHtmlImage(page, img)
      await page.keyboard.type('World!')
      await selectEditorContent(getEditorLocator(page), 2, 9)
      await page.keyboard.press('Backspace')

      assertAnswerContent(answer, { answerHtml: 'Hed!', answerText: 'Hed!', imageCount: 0 })
    })

    test.describe('can replace selected text with ', () => {
      test.beforeEach(async ({ page }) => {
        await page.keyboard.type('Hello World!')
        await selectEditorContent(getEditorLocator(page), 1, 9)
      })

      test('with text', async ({ page }) => {
        await page.keyboard.press('o')

        await assertEditorTextContent(getEditorLocator(page), 'Hold!')
        assertAnswerContent(answer, { answerHtml: 'Hold!', answerText: 'Hold!', imageCount: 0 })
      })

      test('with a special character', async ({ page }) => {
        await inputSpecialCharacterFromToolbar(page, specialCharacters.alpha[1])
        await clickOutsideEditor(page)

        assertAnswerContent(answer, { answerText: `H${specialCharacters.alpha[1]}ld!` })
      })

      test('with an equation', async ({ page }) => {
        await page.keyboard.press('Control+e')
        await inputLatexCommandFromToolbar(page, specialCharacters.cos[0])
        await clickOutsideEditor(page)

        assertAnswerContent(answer, { answerText: 'Hld!' })
      })

      test('with a pasted image', async ({ page }) => {
        const editor = getEditorLocator(page)
        const img = `<img src="data:image/png;base64,${samplePNG}" alt="Hello World!">`
        await pasteHtmlImage(page, img)
        await assertEditorHTMLContent(editor, `H${img}ld!`)

        assertAnswerContent(answer, {
          answerHtml: `H${img}ld!`,
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

        assertAnswerContent(answer, { answerText: 'B' })
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

    test.describe('when multiple equation editors in answer', () => {
      test.beforeEach(async ({ page }) => {
        await page.keyboard.press('A')
        await clickOutsideEditor(page)
        await getEditorLocator(page).click()
        await page.getByRole('button', { name: 'Lisää kaava' }).click()
        await page.keyboard.press('B')
        await clickOutsideEditor(page)
        await expect(page.locator('.answer > img')).toHaveCount(2)
        assertAnswerContent(answer, {
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
        assertAnswerContent(answer, {
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

        assertAnswerContent(answer, {
          answerHtml: 'kaava: <img alt="\\sqrt{123}">XX ja tekstiä',
        })
      })

      test('before math editor with Shift+Tab', async ({ page }) => {
        await expect(page.getByRole('img').last()).toBeVisible()
        await page.getByRole('img').last().click()
        await page.keyboard.press('Shift+Tab')
        await page.keyboard.type('XX')

        assertAnswerContent(answer, {
          answerHtml: 'kaava: XX<img alt="\\sqrt{123}"> ja tekstiä',
        })
      })

      test('after editor with Tab in Latex field', async ({ page }) => {
        await expect(page.getByRole('img').last()).toBeVisible()
        await page.getByRole('img').last().click()
        // first TAb to focus latex-field
        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')
        await page.keyboard.type('XX')

        assertAnswerContent(answer, {
          answerHtml: 'kaava: <img alt="\\sqrt{123}">XX ja tekstiä',
        })
      })

      test('within text on mouse click', async ({ page }) => {
        await expect(page.getByRole('img').last()).toBeVisible()
        await page.getByRole('img').last().click()
        await page.mouse.click(33, 320)
        await page.keyboard.type('XX')

        assertAnswerContent(answer, {
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
kaava:\
  <img
    src="http://localhost:5111/math.svg?latex=%5Csqrt%7B123%7D"
    alt="\\sqrt{123}"
  />`
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

    test('is editable', async ({ page }) => {
      const equationEditor = getEditorLocator(page)
      await expect(page.getByRole('img').last()).toBeVisible()
      await page.getByRole('img').last().click()
      await assertEquationEditorLatexContent(equationEditor, '\\sqrt{123}')
      await clickOutsideEditor(page)
      assertAnswerContent(answer, { imageCount: 1 })
    })
  })
})
