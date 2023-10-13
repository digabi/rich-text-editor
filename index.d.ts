export interface RichTextEditorOptions {
  ignoreSaveObject?: boolean;
  ignoreEventHandling?: boolean;
  locale?: "FI" | "SV";
  screenshotSaver?: ({ type, data, el }: { type: string; data: Buffer; el: Element }) => Promise<string>;
  baseUrl?: string;
  screenshotImageSelector?: string;
  invalidImageSelector?: string;
  fileTypes?: string[];
  sanitize?: (markup: string) => string;
  updateMathImg?: (jQuery: {}, latex: string) => void;
}

export function makeRichText(
  element: Element,
  options: RichTextEditorOptions,
  onChange: (data: { answerHTML: string; answerText: string }) => void
): void
