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
} from './test-utils'
//import { RichTextEditor } from '../src/components/RichTextEditor'
import RichTextEditor from '../src/react/rich-text-editor'
import { Answer } from '../src/react/utility'

test.describe('Rich text editor', () => {
  let answer: Answer = { answerHtml: '', answerText: '', imageCount: 0 }

  const onAnswerChange = (newAnswer: Answer) => {
    answer = newAnswer
  }

  test.beforeEach(async ({ page, mount }) => {
    await mount(
      <RichTextEditor
        language="FI"
        editorStyle={{ position: 'absolute', top: '300px', width: '100%' }}
        onValueChange={onAnswerChange}
        allowedFileTypes={['image/png', 'image/jpeg']}
      />,
    )
    await page.addStyleTag({
      url: '//unpkg.com/@digabi/mathquill/build/mathquill.css',
    })
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write'])
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

    await inputSpecialCharacterFromToolbar(page, specialCharacters.alpha[1])
    await assertEditorTextContent(editor, specialCharacters.alpha[1])

    await page.getByTestId('toggle-all-special-characters').click()

    await inputSpecialCharacterFromToolbar(page, specialCharacters.delta[1])
    await assertEditorTextContent(editor, specialCharacters.alpha[1] + specialCharacters.delta[1])
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

  test('can paste png file from clipboard', async ({ page }) => {
    const editor = getEditorLocator(page)
    await setClipboardImage(page, 'image/png', samplePNG)
    await paste(page)
    await expect(editor.locator('img')).toBeVisible()
  })

  test('can not paste a gif file from clipboard', async ({ page }) => {
    const editor = getEditorLocator(page)
    await setClipboardImage(page, 'image/gif', sampleGIF)
    await paste(page)
    await expect(editor.locator('img')).not.toBeVisible()
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

    assertAnswerContent(answer, {
      answerText: '',
      imageCount: 0,
    })

    const mathImage = getEditorLocator(page).getByRole('img')
    await expect(mathImage).toHaveAttribute('data-math-svg', 'true')
    await expect(mathImage).toHaveAttribute('src', /^data:image\/svg/)
    await expect(mathImage).toHaveAttribute('alt', latex)
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
        await inputSpecialCharacterFromToolbar(page, specialCharacters.alpha[1])
        await clickOutsideEditor(page)

        assertAnswerContent(answer, { answerText: `H${specialCharacters.alpha[1]}ld!` })
      })

      test('with an equation', async ({ page }) => {
        await page.keyboard.press('Control+e')
        await inputLatexCommandFromToolbar(page, specialCharacters.cos[0])
        await clickOutsideEditor(page)

        assertAnswerContent(answer, { answerText: 'H\u00A0\u00A0ld!' })
      })

      test('with a pasted image', async ({ page }) => {
        const editor = getEditorLocator(page)
        const img = `<img src="data:image/png;base64,${samplePNG}" alt="Hello World!">`
        await pasteHtmlImage(page, img)
        await assertEditorHTMLContent(editor, `H${img}ld!`)

        assertAnswerContent(answer, {
          answerHtml: `H${img}ld!`, //TODO: Does not work, not important
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
      await inputLatexCommandFromToolbar(page, specialCharacters.sqrt[0])
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
