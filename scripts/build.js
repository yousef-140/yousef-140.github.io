// Copies the site into dist/ (this folder is what gets published). Run: npm run build
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, ".."), dist = path.join(root, "dist");
fs.rmSync(dist, { recursive: true, force: true }); fs.mkdirSync(dist);
["index.html", "css", "js", "data", "assets", ".nojekyll"].forEach(function (f) {
  const src = path.join(root, f);
  if (fs.existsSync(src)) fs.cpSync(src, path.join(dist, f), { recursive: true });
});
console.log("build OK: dist/ created");
