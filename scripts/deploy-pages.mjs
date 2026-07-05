import { cp, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";

const root = process.cwd();
const dist = `${root}/dist`;

if (!existsSync(`${dist}/index.html`)) {
  throw new Error("Run npm run build first — dist/index.html is missing.");
}

for (const name of ["index.html", "404.html", ".nojekyll"]) {
  await cp(`${dist}/${name}`, `${root}/${name}`);
}

const assetsDest = `${root}/assets`;
if (existsSync(assetsDest)) await rm(assetsDest, { recursive: true, force: true });
await cp(`${dist}/assets`, assetsDest, { recursive: true });

console.log("Copied dist → repo root (index.html, 404.html, .nojekyll, assets/).");
