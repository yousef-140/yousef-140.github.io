// Loads the real page in a simulated browser and checks it works. Run: npm test
const { JSDOM, VirtualConsole } = require("jsdom"); const path = require("path");
const errors = [], vc = new VirtualConsole(); vc.on("jsdomError", (e) => errors.push(e.message)); vc.on("error", (m) => errors.push(String(m)));
const dir = process.argv[2] ? path.resolve(process.argv[2]) : path.join(__dirname, "..");
JSDOM.fromFile(path.join(dir, "index.html"), { runScripts: "dangerously", resources: "usable", virtualConsole: vc,
  beforeParse: function (w) { w.Element.prototype.scrollIntoView = function () {}; w.scrollTo = function () {}; } /* jsdom lacks these browser features */ }).then(function (dom) {
  const w = dom.window, d = w.document; let fail = 0;
  const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };
  w.addEventListener("load", function () {
    setTimeout(function () {
      ok(d.querySelectorAll("#featGrid .card").length === 3, "3 featured projects");
      ok(d.querySelectorAll("#projGrid .card").length === w.PROJECTS.length, "all projects listed");
      ok(!!d.querySelector("#services .card") && !!d.querySelector("#skills .skill"), "services and skills render");
      const q = d.getElementById("q"); q.value = "faiss"; q.dispatchEvent(new w.Event("input"));
      ok(d.querySelectorAll("#projGrid .card").length === 3, "search 'faiss' finds 3");
      d.querySelector('.chip[data-cat="Computer Vision"]').click();
      ok(d.querySelectorAll("#projGrid .card").length === 0, "category + search combine (empty state)");
      q.value = ""; q.dispatchEvent(new w.Event("input"));
      ok(d.querySelectorAll("#projGrid .card").length === 1, "category filter works");
      const before = d.documentElement.getAttribute("data-theme"); d.getElementById("themeBtn").click();
      ok(d.documentElement.getAttribute("data-theme") !== before, "theme toggle works");
      d.getElementById("menuBtn").click(); ok(d.getElementById("nav").classList.contains("open"), "mobile menu opens");
      w.location.hash = "#/project/power-consumption-etl";
      setTimeout(function () {
        ok(/Power Consumption/.test(d.querySelector("h1").textContent), "case study route works");
        ok(!!d.querySelector(".shots img"), "case study shows screenshot");
        w.location.hash = "#/project/nope";
        setTimeout(function () {
          ok(/not found/i.test(d.querySelector("h1").textContent), "unknown project shows not-found page");
          ok(errors.length === 0, "no script errors" + (errors.length ? ": " + errors[0] : ""));
          process.exit(fail ? 1 : 0);
        }, 50);
      }, 50);
    }, 100);
  });
});
