export const mathSvgResponse: (
  req: {
    query: { latex: string }
  },
  res: {
    type(type: string): void
    sendStatus(status: number): void
    send(body: string): void
  },
) => void

export function latexToSvg(latex: string, cb: (svg: string) => void): void
