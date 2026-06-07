import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import ts from "typescript";

export async function readAds() {
  const corpusPath = resolve("src/data/ads.ts");
  const source = await readFile(corpusPath, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
    },
  });

  const dataUrl = `data:text/javascript;base64,${Buffer.from(
    compiled.outputText,
  ).toString("base64")}`;
  const { ads } = await import(dataUrl);

  return ads;
}
