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

    test('can undo and redo changes', async ({ page }) => {
      const equationEditor = page.getByTestId('equation-editor')
      await inputSpecialCharacter(page, '\\sqrt')
      await page.keyboard.press('1')
      expect(await getUndoButton(page)).toBeEnabled()
      expect(await getRedoButton(page)).toBeDisabled()
      await (await getUndoButton(page)).click()
      expect(await getRedoButton(page)).toBeEnabled()
      await page.keyboard.press('ArrowLeft')
      await page.keyboard.press('2')
      expect(await getRedoButton(page)).toBeDisabled()
      assertEquationEditorLatexContent(equationEditor, '\\sqrt{2}')
    })
  })
})
