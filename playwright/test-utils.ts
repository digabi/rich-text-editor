import { expect, Page, Locator } from '@playwright/test'

export const assertEditorTextContent = async (editor: Locator, content: string) => {
  expect(await editor.textContent()).toBe(content)
}

export const assertEditorHTMLContent = async (editor: Locator, content: string) => {
  expect(await editor.innerHTML()).toBe(content)
}

export const assertEquationEditorTextContent = async (equationEditor: Locator, content: string) => {
  expect(await equationEditor.locator('.math-editor-equation-field').textContent()).toBe(content)
}

export const assertEquationEditorLatexContent = async (equationEditor: Locator, content: string) => {
  expect(await equationEditor.locator('.math-editor-latex-field').textContent()).toBe(content)
}

export const getEditorLocator = (page: Page) => {
  return page.getByTestId('rich-text-editor')
}

export const repeat = async (times: number, action: () => Promise<void>) => {
  for (const _i of Array(times)) {
    await action()
  }
  return Promise.resolve()
}

export const inputSpecialCharacter = async (page: Page, latexCommand: string) => {
  await page.getByTitle(latexCommand, { exact: true }).click()
}

/** Clicks near the bottom corner of the page, to make sure it doesn't hit the editor or toolbar */
export const clickOutsideEditor = async (page: Page) => {
  const dimensions = await page.evaluate(() => ({
    x: document.documentElement.clientWidth,
    y: document.documentElement.clientHeight,
  }))

  await page.click('html', {
    position: {
      x: dimensions.x - 5,
      y: dimensions.y - 5,
    },
  })
}

export const getUndoButton = async (page: Page) => page.getByTestId('undo')

export const getRedoButton = async (page: Page) => page.getByTestId('redo')
