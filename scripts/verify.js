// Checks your data files for mistakes. Run: npm run verify
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.join(__dirname, "..");
const sandbox = { window: {} }; vm.createContext(sandbox);
["site", "projects", "skills", "services"].forEach(function (f) {
  vm.runInContext(fs.readFileSync(path.join(root, "data", f + ".js"), "utf8"), sandbox, { filename: f + ".js" });
});
const W = sandbox.window, errors = [];
const err = (m) => errors.push(m);
const url = (u) => /^https?:\/\/\S+$/.test(u || "");
const CATS = ["Data Engineering","AI and RAG","Machine Learning","Computer Vision","NLP","Dashboards","Other"];
const STAT = ["Completed","In progress","Experimental","Educational","Planned"];
const slugs = new Set();
W.PROJECTS.forEach(function (p) {
  const id = "project " + p.slug;
  if (!/^[a-z0-9-]+$/.test(p.slug || "")) err(id + ": bad slug");
  if (slugs.has(p.slug)) err(id + ": duplicate slug"); slugs.add(p.slug);
  if (!CATS.includes(p.category)) err(id + ": unknown category " + p.category);
  if (!STAT.includes(p.status)) err(id + ": unknown status " + p.status);
  ["title","summary","problem"].forEach((k) => { if (!p[k]) err(id + ": missing " + k); });
  ["tech","goals","architecture","implementation","limitations"].forEach((k) => { if (!Array.isArray(p[k]) || !p[k].length) err(id + ": " + k + " must be a non-empty list"); });
  if (!url(p.github)) err(id + ": github must be an http(s) URL");
  if (p.demo !== null && !url(p.demo)) err(id + ": demo must be null or a URL");
  (p.screenshots || []).forEach((s) => { if (!fs.existsSync(path.join(root, s.src))) err(id + ": missing image " + s.src); });
});
W.SKILLS.forEach(function (k) {
  if (!W.STATUS_LABELS[k.status]) err("skill " + k.name + ": bad status");
  (k.projects || []).forEach((s) => { if (!slugs.has(s)) err("skill " + k.name + ": unknown project " + s); });
  if (k.status === "demonstrated" && !(k.projects || []).length) err("skill " + k.name + ": 'demonstrated' needs a project as evidence");
});
W.SERVICES.forEach(function (s) { (s.evidence || []).forEach((e) => { if (!slugs.has(e)) err("service " + s.title + ": unknown project " + e); }); });
const c = W.SITE.contact;
if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(c.email)) err("contact.email invalid");
if (!url(c.linkedin) || !url(c.github)) err("contact links invalid");
if (/your|example|placeholder/i.test(JSON.stringify(c))) err("contact still contains placeholder text");
if (errors.length) { console.error("FAILED:\n- " + errors.join("\n- ")); process.exit(1); }
console.log("verify OK: " + W.PROJECTS.length + " projects, " + W.SKILLS.length + " skills, " + W.SERVICES.length + " services");
