import { readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const distDir = fileURLToPath(new URL("../dist", import.meta.url));
const textExtensions = new Set([
  ".html",
  ".css",
  ".js",
  ".mjs",
  ".json",
  ".svg",
  ".txt",
  ".xml",
  ".webmanifest",
]);

const replacements = [
  ['"/assets/', '"./assets/'],
  ["'/assets/", "'./assets/"],
  ["`/assets/", "`./assets/"],
  ["(/assets/", "(./assets/"],
  [",/assets/", ",./assets/"],
];

async function* walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else if (textExtensions.has(extname(entry.name).toLowerCase())) {
      yield fullPath;
    }
  }
}

for await (const filePath of walk(distDir)) {
  const source = await readFile(filePath, "utf8");
  let next = source;

  for (const [from, to] of replacements) {
    next = next.split(from).join(to);
  }

  if (next !== source) {
    await writeFile(filePath, next);
  }
}
