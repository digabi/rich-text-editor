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

export const inputSpecialCharacterFromToolbar = async (page: Page, latexCommand: string) => {
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

const grantClipboardPermissions = async (page: Page) => {
  await page.context().grantPermissions(['clipboard-read', 'clipboard-write'])
}

export const setClipboardText = async (page: Page, text: string) => {
  await grantClipboardPermissions(page)
  await page.evaluate(async (text) => {
    console.log(text)
    navigator.clipboard.writeText(text)
    console.log(await navigator.clipboard.readText())
  }, text)
}

export const setClipboardHTML = async (page: Page, text: string) => {
  await grantClipboardPermissions(page)
  await page.evaluate((text) => {
    navigator.clipboard.write([new ClipboardItem({ 'text/html': new Blob([text], { type: 'text/html' }) })])
  }, text)
}

// WIP for pasting images
// export const setClipboardImage = async (page: Page, base64: string) => {
//   await page.evaluate((base64) => {
//     const binary = atob(base64)
//     const buffer = new Uint8Array(binary.length)
//     for (let i = 0; i < binary.length; i++) {
//       buffer[i] = binary.charCodeAt(i)
//     }
//     const blob = new Blob([buffer], { type: 'image/png' })
//     const clipboardItem = new ClipboardItem({ 'image/png': blob })
//     navigator.clipboard.write([clipboardItem])
//   }, base64)
// }
//
// export const mockImagePaste = async (element: Locator, base64: string) => {
//   await page.evaluate((base64) => {
//     const binary = atob(base64)
//     const buffer = new Uint8Array(binary.length)
//     for (let i = 0; i < binary.length; i++) {
//       buffer[i] = binary.charCodeAt(i)
//     }
//     const blob = new Blob([buffer], { type: 'image/png' })
//     const clipboardItem = new ClipboardItem({ 'image/png': blob })
//     const transferItem = new DataTransferItem()
//     element.dispatchEvent('paste', new ClipboardEvent('paste', { clipboardData: { items: [clipboardItem] } }))
//   }, base64)
// }

export const paste = async (page: Page) =>
  process.platform === 'darwin' ? page.keyboard.press('Meta+V') : page.keyboard.press('Control+V')

export const samplePNG =
  'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC'

export const sampleGIF = 'R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
