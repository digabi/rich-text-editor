import { test, expect, Page, Locator } from '@playwright/test'

const assertEditorTextContent = async (editor: Locator, content: string) => {
  expect(await editor.textContent()).toBe(content)
}

const assertEditorHTMLContent = async (editor: Locator, content: string) => {
  expect(await editor.innerHTML()).toBe(content)
}

const getEditorLocator = (page: Page) => {
  return page.getByTestId('rich-text-editor')
}

const repeat = async (times: number, action: () => Promise<void>) => {
  for (const _i of Array(times)) {
    await action()
  }
  return Promise.resolve()
}

const inputSpecialCharacter = async (page: Page, latexCommand: string) => {
  await page.getByTitle(latexCommand, { exact: true }).click()
}

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
      expect(await equationEditor.locator('.math-editor-equation-field').textContent()).toBe('√​')
      expect(await equationEditor.locator('.math-editor-latex-field').textContent()).toBe('\\sqrt{ }')
      await page.keyboard.press('1')
      expect(await equationEditor.locator('.math-editor-equation-field').textContent()).toBe('√1​')
      expect(await equationEditor.locator('.math-editor-latex-field').textContent()).toBe('\\sqrt{1}')
    })
  })
})
