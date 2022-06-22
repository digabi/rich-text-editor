import * as express from "express";

export const mathSvgResponse: express.Handler;

export function latexToSvg(latex: string, cb: (svg: string) => void): void
