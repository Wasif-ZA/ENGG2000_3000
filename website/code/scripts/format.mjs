import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(join(fileURLToPath(new URL("..", import.meta.url))));

const exts = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json", ".md", ".css"]);
const ignoreDirs = new Set([".next", "node_modules", "out", "dist", "build"]);

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!ignoreDirs.has(entry.name)) {
        files.push(...walk(fullPath));
      }
      continue;
    }
    if (exts.has(extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

function normalize(content) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const trimmed = lines.map((line) => line.replace(/[ \t]+$/g, ""));
  let result = trimmed.join("\n");
  if (!result.endsWith("\n")) {
    result += "\n";
  }
  return result;
}

const targets = [join(root, "src"), join(root, "public"), join(root, "scripts"), join(root, "README.md")].filter((path) => existsSync(path));

const files = targets.flatMap((target) => (statSync(target).isDirectory() ? walk(target) : [target]));

let changed = 0;
for (const file of files) {
  const before = readFileSync(file, "utf8");
  const after = normalize(before);
  if (before !== after) {
    writeFileSync(file, after, "utf8");
    changed += 1;
  }
}

console.log(`format: normalized ${changed} file(s)`);
