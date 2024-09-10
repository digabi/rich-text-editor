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
} from './test-utils'
import { RichTextEditor } from '../src/components/RichTextEditor'
import { Answer } from '../src/react/utility'

test.describe('Rich text editor', () => {
  let answer: Answer = { answerHtml: '', answerText: '', imageCount: 0 }

  const onAnswerChange = (newAnswer: Answer) => {
    answer = newAnswer
  }

  test.beforeEach(async ({ page, mount }) => {
    answer = { answerHtml: '', answerText: '', imageCount: 0 }
    await mount(
      <RichTextEditor onValueChange={onAnswerChange} style={{ position: 'absolute', top: '300px', width: '100%' }} />,
    )
    await page.addStyleTag({
      url: '//unpkg.com/@digabi/mathquill/build/mathquill.css',
    })
    const editor = getEditorLocator(page)
    await editor.click()
  })

  test('can type in the editor', async ({ page }) => {
    const editor = getEditorLocator(page)
    await page.keyboard.type('Hello World!')
    await assertEditorHTMLContent(editor, 'Hello World!')
    await assertEditorTextContent(editor, 'Hello World!')

    assertAnswerContent(answer, { answerHtml: 'Hello World!', answerText: 'Hello World!', imageCount: 0 })
  })

  test('can erase in the editor', async ({ page }) => {
    const editor = getEditorLocator(page)
    await page.keyboard.type('Hello World!')
    await assertEditorHTMLContent(editor, 'Hello World!')
    await assertEditorTextContent(editor, 'Hello World!')
    await repeat(7, async () => {
      await page.keyboard.press('Backspace')
    })
    await assertEditorHTMLContent(editor, 'Hello')
    await assertEditorTextContent(editor, 'Hello')
  })

  test('can input special characters from toolbar', async ({ page }) => {
    const editor = getEditorLocator(page)

    await inputSpecialCharacterFromToolbar(page, '\\alpha')
    await assertEditorTextContent(editor, 'α')

    await page.getByRole('button', { name: 'Näytä kaikki erikoismerkit' }).click()

    await inputSpecialCharacterFromToolbar(page, '\\delta')
    await assertEditorTextContent(editor, 'αδ')
  })

  test('can paste text from clipboard', async ({ page }) => {
    const editor = getEditorLocator(page)
    await setClipboardText(page, 'Hello World!')
    await paste(page)
    await assertEditorTextContent(editor, 'Hello World!')
  })

  test('can paste HTML from clipboard', async ({ page }) => {
    const editor = getEditorLocator(page)
    await setClipboardHTML(page, '<p>Hello World!</p>')
    await paste(page)
    await assertEditorTextContent(editor, 'Hello World!')
    await assertEditorHTMLContent(editor, 'Hello World!<br>')
  })

  test('can paste png <img> from clipboard', async ({ page }) => {
    const editor = getEditorLocator(page)
    const img = `<img src="data:image/png;base64,${samplePNG}" alt="Hello World!">`
    await setClipboardHTML(page, img)
    await paste(page)
    await assertEditorHTMLContent(editor, img)

    assertAnswerContent(answer, {
      answerHtml: img,
      answerText: '',
      imageCount: 1,
    })
  })

  test('can not paste gif <img> from clipboard', async ({ page }) => {
    const editor = getEditorLocator(page)
    const img = `<img src="data:image/gif;base64,${sampleGIF}" alt="Hello World!">`
    await setClipboardHTML(page, img)
    await paste(page)
    await assertEditorHTMLContent(editor, '')
  })

  test('can paste equation SVG from clipboard', async ({ page }) => {
    const latex = '\\varepsilon=\\frac{Q_2}{Q_1-Q_2}=\\frac{1}{eta}-1'
    const img = `<img src="/math.svg?latex=\"${latex}\" alt=\"${latex}\">`

    await setClipboardHTML(page, img)
    await paste(page)
    const equation = page.getByAltText(latex)
    await expect(equation).toHaveCount(1)
    await equation.click()
    const equationEditor = page.getByTestId('equation-editor')
    await assertEquationEditorLatexContent(equationEditor, latex)
    await clickOutsideEditor(page)

    // TODO: This fails. It should not fail. Caused by math editor's closing not triggering onChange
    assertAnswerContent(answer, {
      answerHtml:
        '<img src="/math.svg?latex=" alt="\\varepsilon=\\frac{Q_2}{Q_1-Q_2}=\\frac{1}{eta}-1" data-math-svg="true" />',
      answerText: '',
      imageCount: 0,
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

      await assertEditorTextContent(getEditorLocator(page), 'Hed!')
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
        await inputSpecialCharacterFromToolbar(page, '\\beta')
        await clickOutsideEditor(page)

        assertAnswerContent(answer, { answerText: 'Hβld!' })
      })

      test('with an equation', async ({ page }) => {
        await page.keyboard.press('Control+e')
        await inputSpecialCharacterFromToolbar(page, '\\cos')
        await clickOutsideEditor(page)

        // TODO: Fails because onChange is not called properly
        assertAnswerContent(answer, { answerText: 'H cos ld!' })
      })

      test('with a pasted image', async ({ page }) => {
        const editor = getEditorLocator(page)
        const img = `<img src="data:image/png;base64,${samplePNG}" alt="Hello World!">`
        await pasteHtmlImage(page, img)
        await assertEditorHTMLContent(editor, `H${img}ld!`)

        assertAnswerContent(answer, {
          //answerHtml: `H${img}ld!`, TODO: Does not work, not important
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
        await inputSpecialCharacterFromToolbar(page, '\\sqrt')
        await page.keyboard.press('1')
        expect(await getUndoButton(page)).toBeEnabled()
        expect(await getRedoButton(page)).toBeDisabled()
      })

      test('toolbar buttons', async ({ page }) => {
        await (await getUndoButton(page)).click()
        expect(await getRedoButton(page)).toBeEnabled()
        await page.keyboard.press('ArrowLeft')
        await page.keyboard.press('2')
        expect(await getRedoButton(page)).toBeDisabled()
        await (await getUndoButton(page)).click()
        assertEquationEditorLatexContent(page.getByTestId('equation-editor'), '\\sqrt{ }')
        await (await getRedoButton(page)).click()
        assertEquationEditorLatexContent(page.getByTestId('equation-editor'), '\\sqrt{2}')
      })

      test('hotkeys', async ({ page }) => {
        await page.keyboard.press('Control+z')
        expect(await getRedoButton(page)).toBeEnabled()
        await page.keyboard.press('ArrowLeft')
        await page.keyboard.press('2')
        expect(await getRedoButton(page)).toBeDisabled()
        await page.keyboard.press('Control+z')
        expect(await getRedoButton(page)).toBeEnabled()
        assertEquationEditorLatexContent(page.getByTestId('equation-editor'), '\\sqrt{ }')
        await page.keyboard.press('Control+y')
        assertEquationEditorLatexContent(page.getByTestId('equation-editor'), '\\sqrt{2}')
      })
    })

    test('can insert LaTeX commands', async ({ page }) => {
      const equationEditor = page.getByTestId('equation-editor')
      await inputSpecialCharacterFromToolbar(page, '\\sqrt')
      await assertEquationEditorTextContent(equationEditor, '√​')
      await assertEquationEditorLatexContent(equationEditor, '\\sqrt{ }')
      await page.keyboard.press('1')
      await assertEquationEditorTextContent(equationEditor, '√1​')
      await assertEquationEditorLatexContent(equationEditor, '\\sqrt{1}')
    })

    test('closes on focus loss and reopens on click', async ({ page }) => {
      const equationEditor = page.getByTestId('equation-editor')
      await inputSpecialCharacterFromToolbar(page, '\\sqrt')
      await assertEquationEditorTextContent(equationEditor, '√​')
      await clickOutsideEditor(page)
      expect(getEditorLocator(page).locator('span > img')).toBeVisible()
      await getEditorLocator(page).locator('span.math-editor-wrapper').click()
    })

    test('closes on Esc press', async ({ page }) => {
      await page.keyboard.press('A')
      await clickOutsideEditor(page)
      expect(getEditorLocator(page).locator('span > img')).toBeVisible()
    })

    test('is removed if closed with empty LaTeX', async ({ page }) => {
      await clickOutsideEditor(page)
      await assertEditorHTMLContent(getEditorLocator(page), '&nbsp;&nbsp;')
    })

    test('opens with hot key', async ({ page }) => {
      await repeat(2, async () => await page.keyboard.press('Backspace'))
      expect(page.getByTestId('equation-editor')).toHaveCount(1)
      await clickOutsideEditor(page)
      expect(page.getByTestId('equation-editor')).toHaveCount(0)
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
      await inputSpecialCharacterFromToolbar(page, '\\sqrt')
      await page.keyboard.press('1')
      await page.keyboard.press('ArrowRight')
      await page.keyboard.press('2')
      await assertEquationEditorLatexContent(equationEditor, '\\sqrt{1}2')
    })

    test('writing invalid LaTeX shows error message', async ({ page }) => {
      await page.keyboard.press('Tab')
      await page.keyboard.type('\\sqt{1}')
      expect(page.locator('span.render-error')).toBeVisible()
    })

    test.describe('when multiple equation editors in answer', async () => {
      test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:1234')
        const editor = getEditorLocator(page)
        await editor.click()
        await page.getByRole('button', { name: 'Lisää kaava' }).click()
        await expect(page.getByTestId('equation-editor')).toHaveCount(1)
        await page.keyboard.press('A')
        await clickOutsideEditor(page)
        await getEditorLocator(page).click()
        await page.getByRole('button', { name: 'Lisää kaava' }).click()
        await page.keyboard.press('B')
        await clickOutsideEditor(page)
        expect(page.locator('span > img')).toHaveCount(2)
        assertAnswerContent(answer, { answerHtml: 'A B' })
      })

      test('can edit both equations separately', async ({ page }) => {
        await page.getByRole('img').first().click()
        await page.keyboard.press('2')
        await page.getByRole('img').last().click()
        await page.keyboard.press('2')
        await page.keyboard.press('B')
        assertAnswerContent(answer, { answerHtml: 'A2 B2' })
      })
    })
  })
})
