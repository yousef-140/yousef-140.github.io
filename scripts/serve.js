// Tiny local web server with no dependencies. Run: npm start  (open http://localhost:3000)
const http = require("http"), fs = require("fs"), path = require("path");
const dir = process.argv[2] ? path.resolve(process.argv[2]) : path.join(__dirname, "..");
const T = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".json": "application/json", ".gif": "image/gif", ".mp4": "video/mp4" };
http.createServer(function (req, res) {
  let f = path.join(dir, decodeURIComponent(req.url.split("?")[0]));
  if (!f.startsWith(dir)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
  fs.readFile(f, function (e, d) {
    if (e) { res.writeHead(404); return res.end("Not found"); }
    res.writeHead(200, { "Content-Type": T[path.extname(f)] || "application/octet-stream" }); res.end(d);
  });
}).listen(3000, function () { console.log("Open http://localhost:3000  (Ctrl+C to stop)"); });
