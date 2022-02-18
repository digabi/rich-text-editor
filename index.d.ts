export interface RichTextEditorOptions {
  ignoreSaveObject?: boolean;
  locale?: "FI" | "SV";
  screenshotSaver?: ({ data, type }: { data: any; type: string }) => Promise<string>;
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
)
