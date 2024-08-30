import { test, expect } from '@playwright/test'
import {
  getEditorLocator,
  assertEditorHTMLContent,
  assertEditorTextContent,
  repeat,
  inputSpecialCharacter,
  clickOutsideEditor,
  getUndoButton,
  getRedoButton,
  assertEquationEditorTextContent,
  assertEquationEditorLatexContent,
} from './test-utils'

test.describe('Rich text editor', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:1234')
  })

  test('can type in the editor', async ({ page }) => {
    const editor = getEditorLocator(page)
    await editor.click()
    await page.keyboard.type('Hello World!')
    await assertEditorHTMLContent(editor, 'Hello World!<br>')
    await assertEditorTextContent(editor, 'Hello World!')
  })

  test('can erase in the editor', async ({ page }) => {
    const editor = getEditorLocator(page)
    await editor.click()
    await page.keyboard.type('Hello World!')
    await assertEditorHTMLContent(editor, 'Hello World!<br>')
    await assertEditorTextContent(editor, 'Hello World!')
    await repeat(7, async () => {
      await page.keyboard.press('Backspace')
    })
    await assertEditorHTMLContent(editor, 'Hello<br>')
    await assertEditorTextContent(editor, 'Hello')
  })

  test('can input special characters from toolbar', async ({ page }) => {
    const editor = getEditorLocator(page)
    await editor.click()

    await inputSpecialCharacter(page, '\\alpha')
    await assertEditorTextContent(editor, 'α')

    await page.getByRole('button', { name: 'Näytä kaikki erikoismerkit' }).click()

    await inputSpecialCharacter(page, '\\delta')
    await assertEditorTextContent(editor, 'αδ')
  })

  test.describe('Equation editor', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:1234')
      const editor = getEditorLocator(page)
      await editor.click()
      await page.getByRole('button', { name: 'Lisää kaava' }).click()
      await expect(page.getByTestId('equation-editor')).toHaveCount(1)
    })

    test.describe('can undo and redo changes with ', () => {
      test.beforeEach(async ({ page }) => {
        await inputSpecialCharacter(page, '\\sqrt')
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
      await inputSpecialCharacter(page, '\\sqrt')
      await assertEquationEditorTextContent(equationEditor, '√​')
      await assertEquationEditorLatexContent(equationEditor, '\\sqrt{ }')
      await page.keyboard.press('1')
      await assertEquationEditorTextContent(equationEditor, '√1​')
      await assertEquationEditorLatexContent(equationEditor, '\\sqrt{1}')
    })

    test('closes on focus loss and reopens on click', async ({ page }) => {
      const equationEditor = page.getByTestId('equation-editor')
      await inputSpecialCharacter(page, '\\sqrt')
      await assertEquationEditorTextContent(equationEditor, '√​')
      await clickOutsideEditor(page)
      expect(getEditorLocator(page).locator('span > img')).toBeVisible()
      await getEditorLocator(page).locator('span.math-editor-wrapper').click()
    })

    test('opens with hot key', async ({ page }) => {
      await repeat(3, async () => await page.keyboard.press('Backspace'))
      expect(page.getByTestId('equation-editor')).toHaveCount(1)
      await clickOutsideEditor(page)
      expect(page.getByTestId('equation-editor')).toHaveCount(0)
      await getEditorLocator(page).click()
      await page.keyboard.press('Control+e')
      await expect(page.getByTestId('equation-editor')).toHaveCount(1)
    })
  })
})
