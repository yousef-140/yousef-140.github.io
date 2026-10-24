/* Renders the whole site from the files in /data. You normally never edit this file. */

(function () {
  "use strict";
  var S = window.SITE, K = window.SKILLS, V = window.SERVICES, L = window.STATUS_LABELS;
  var P = window.PROJECTS.filter(function (p) { return p.published; });
  var R = (window.ARTICLES || []).filter(function (a) { return a.published; });
  var app = document.getElementById("app");
  var state = { q: "", cat: "All" };
  var view = "";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-"); }
  function tags(a) { return (a || []).map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join(""); }
  function list(a) { return a && a.length ? "<ul>" + a.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : '<p class="empty">Nothing documented yet.</p>'; }
  function badge(text, kind) { return '<span class="badge b-' + slug(kind || text) + '">' + esc(text) + "</span>"; }
  function bySlug(s) { return P.filter(function (p) { return p.slug === s; })[0]; }
  function safeUrl(u) { return /^https?:\/\//i.test(u || "") ? u : ""; }

  function card(p) {
    return '<article class="card"><div class="row" style="margin:0">' + badge(p.category, "x") + badge(p.status) + "</div>" +
      "<h3>" + esc(p.title) + "</h3><p>" + esc(p.summary) + '</p><div class="tags">' + tags(p.tech.slice(0, 6)) + "</div>" +
      '<div class="row"><a class="btn primary" href="#/project/' + esc(p.slug) + '">Read case study</a>' +
      '<a class="btn" href="' + esc(safeUrl(p.github)) + '" target="_blank" rel="noopener">GitHub</a>' +
      (safeUrl(p.demo) ? '<a class="btn" href="' + esc(p.demo) + '" target="_blank" rel="noopener">Live demo</a>' : "") + "</div></article>";
  }

  function gridHtml() {
    var q = state.q.toLowerCase();
    var items = P.filter(function (p) {
      var okCat = state.cat === "All" || p.category === state.cat;
      var hay = (p.title + " " + p.summary + " " + p.tech.join(" ") + " " + p.category).toLowerCase();
      return okCat && hay.indexOf(q) !== -1;
    });
    return items.length ? items.map(card).join("") : '<p class="empty">No projects match this filter.</p>';
  }

  function home() {
    var feat = P.filter(function (p) { return p.featured; }).slice(0, 3);
    var cats = ["All"].concat(P.map(function (p) { return p.category; }).filter(function (c, i, a) { return a.indexOf(c) === i; }));
    var h = '<section class="hero" id="home"><div class="wrap"><p class="eyebrow">' + esc(S.tagline) + "</p><h1>" + esc(S.name) +
      ": data pipelines (ETL), machine learning, RAG applications and data analysis projects</h1>" + '<p class="lead">' + esc(S.headline) + "</p><p>" + esc(S.intro) + "</p>" +
      '<div class="row"><a class="btn primary" href="#projects">View projects</a><a class="btn" href="#contact">Contact me</a>' +
      '<a class="btn" href="' + esc(S.contact.github) + '" target="_blank" rel="noopener">GitHub</a>' +
      '<a class="btn" href="' + esc(S.contact.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a></div></div></section>';

    h += '<section id="featured"><div class="wrap"><h2>Featured projects</h2><div class="grid" id="featGrid">' + feat.map(card).join("") + "</div></div></section>";

    h += '<section id="projects"><div class="wrap"><h2>All projects</h2><div class="tools"><input id="q" type="search" placeholder="Search projects or technologies" aria-label="Search projects" value="' + esc(state.q) + '">' +
      cats.map(function (c) { return '<button class="chip" data-cat="' + esc(c) + '" aria-pressed="' + (c === state.cat) + '">' + esc(c) + "</button>"; }).join("") +
      '</div><div class="grid" id="projGrid">' + gridHtml() + "</div></div></section>";

    h += '<section id="services"><div class="wrap"><h2>Services</h2><p>Every service says whether it is backed by a finished project or still being learned. Pricing: request a quote.</p><div class="grid">' +
      V.map(function (s) {
        var ev = (s.evidence || []).map(bySlug).filter(Boolean).map(function (p) { return '<a href="#/project/' + esc(p.slug) + '">' + esc(p.title) + "</a>"; }).join(", ");
        return '<article class="card">' + badge(s.basis === "project" ? "Backed by projects" : s.basis === "learning" ? "Currently learning" : "Planned", s.basis === "project" ? "project" : s.basis) +
          "<h3>" + esc(s.title) + "</h3><p><strong>Problem:</strong> " + esc(s.problem) + "</p>" + list(s.deliverables) +
          '<div class="tags">' + tags(s.tech) + "</div>" + (ev ? "<p>Evidence: " + ev + "</p>" : "") + (s.note ? "<p>" + esc(s.note) + "</p>" : "") +
          '<div class="row"><a class="btn primary" href="mailto:' + esc(S.contact.email) + "?subject=" + encodeURIComponent("Quote request: " + s.title) + '">Request a quote</a></div></article>';
      }).join("") + "</div></div></section>";

    var cs = K.map(function (k) { return k.category; }).filter(function (c, i, a) { return a.indexOf(c) === i; });
    h += '<section id="skills"><div class="wrap"><h2>Skills and evidence</h2><p>Skills are labelled by evidence, not by percentages.</p><div class="cols">' +
      cs.map(function (c) {
        return '<div class="skills-cat card"><h3>' + esc(c) + "</h3>" + K.filter(function (k) { return k.category === c; }).map(function (k) {
          var pr = (k.projects || []).map(bySlug).filter(Boolean).map(function (p) { return '<a href="#/project/' + esc(p.slug) + '">' + esc(p.title) + "</a>"; }).join(", ");
          return '<div class="skill"><span>' + esc(k.name) + "</span>" + badge(L[k.status] || k.status, k.status) + (pr ? "<small>" + pr + "</small>" : "") + "</div>";
        }).join("") + "</div>";
      }).join("") + "</div></div></section>";

    h += R.length ? '<section id="notes"><div class="wrap"><h2>Technical notes</h2><div class="grid">' + R.map(function (a) {
      return '<article class="card"><h3>' + esc(a.title) + "</h3><p>" + esc(a.summary) + "</p>" + (safeUrl(a.url) ? '<div class="row"><a class="btn" href="' + esc(a.url) + '" target="_blank" rel="noopener">Read</a></div>' : "") + "</article>";
    }).join("") + "</div></div></section>" : "";

    h += '<section id="about"><div class="wrap"><h2>About me</h2>' + S.about.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") + "</div></section>";

    h += '<section id="contact"><div class="wrap"><h2>Contact</h2><p>Tell me about your data, your goal and your deadline.</p><div class="row">' +
      '<a class="btn primary" href="mailto:' + esc(S.contact.email) + '">Email me</a><a class="btn" href="' + esc(S.contact.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a>' +
      '<a class="btn" href="' + esc(S.contact.github) + '" target="_blank" rel="noopener">GitHub</a></div><p>Email: <a href="mailto:' + esc(S.contact.email) + '">' + esc(S.contact.email) + "</a></p></div></section>";
    return h;
  }

  function caseStudy(p) {
    var shots = p.screenshots && p.screenshots.length ? '<div class="shots">' + p.screenshots.map(function (s) {
      return '<figure><img src="' + esc(s.src) + '" alt="' + esc(s.alt) + '" loading="lazy"><figcaption>' + esc(s.alt) + "</figcaption></figure>";
    }).join("") + "</div>" : '<div class="ph">No screenshots added yet. Put images in assets/screenshots/ and list them in data/projects.js.</div>';
    return '<section><div class="wrap case"><p><a href="#projects">← All projects</a></p><div class="row" style="margin:0">' + badge(p.category, "x") + badge(p.status) + "</div>" +
      "<h1>" + esc(p.title) + "</h1><p class=\"lead\" style=\"color:var(--muted)\">" + esc(p.summary) + '</p><div class="tags">' + tags(p.tech) + "</div>" +
      '<div class="row"><a class="btn primary" href="' + esc(safeUrl(p.github)) + '" target="_blank" rel="noopener">View repository</a>' +
      (safeUrl(p.demo) ? '<a class="btn" href="' + esc(p.demo) + '" target="_blank" rel="noopener">Live demo</a>' : "") + "</div>" +
      "<h2>Problem</h2><p>" + esc(p.problem) + "</p><h2>Goals</h2>" + list(p.goals) +
      '<h2>Architecture and data flow</h2><ol class="flow">' + (p.architecture || []).map(function (a) { return "<li>" + esc(a) + "</li>"; }).join("") + "</ol>" +
      "<h2>Implementation (from the source code and README)</h2>" + list(p.implementation) +
      "<h2>Results</h2>" + (p.results && p.results.length ? list(p.results) : '<p class="empty">No measured results are documented for this project, so none are claimed.</p>') +
      "<h2>Limitations</h2>" + list(p.limitations) + "<h2>Screenshots</h2>" + shots +
      "<h2>Possible real-world uses</h2>" + list(p.applications) + "<h2>Next improvements</h2>" + list(p.next) +
      '<div class="row"><a class="btn primary" href="mailto:' + esc(S.contact.email) + "?subject=" + encodeURIComponent("Project inquiry: " + p.title) + '">Discuss a similar project</a></div></div></section>';
  }

  function notFound() {
    return '<section><div class="wrap"><h1>Page not found</h1><p>This project does not exist.</p><a class="btn primary" href="#projects">Back to projects</a></div></section>';
  }

  function bindHome() {
    var q = document.getElementById("q"), g = document.getElementById("projGrid");
    q.addEventListener("input", function () { state.q = q.value; g.innerHTML = gridHtml(); });
    document.querySelectorAll(".chip").forEach(function (b) {
      b.addEventListener("click", function () {
        state.cat = b.getAttribute("data-cat");
        document.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", String(c === b)); });
        g.innerHTML = gridHtml();
      });
    });
  }

  function route() {
    var h = location.hash || "#home", m = h.match(/^#\/project\/(.+)$/);
    document.getElementById("nav").classList.remove("open");
    document.getElementById("menuBtn").setAttribute("aria-expanded", "false");
    if (m) {
      var p = bySlug(decodeURIComponent(m[1]));
      app.innerHTML = p ? caseStudy(p) : notFound();
      document.title = (p ? p.title : "Not found") + " — " + S.name;
      view = "case"; window.scrollTo(0, 0);
    } else {
      if (view !== "home") { app.innerHTML = home(); bindHome(); view = "home"; document.title = S.name + " — " + S.tagline; }
      var el = document.getElementById(h.slice(1));
      if (el) { el.scrollIntoView(); } else { window.scrollTo(0, 0); }
    }
  }

  function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("theme", t); } catch (e) { /* storage may be blocked */ }
  }
  var saved = null; try { saved = localStorage.getItem("theme"); } catch (e) { saved = null; }
  if (saved === "light" || saved === "dark") setTheme(saved);
  document.getElementById("themeBtn").addEventListener("click", function () {
    setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });
  document.getElementById("menuBtn").addEventListener("click", function () {
    var n = document.getElementById("nav"), o = n.classList.toggle("open");
    this.setAttribute("aria-expanded", String(o));
  });
  document.getElementById("footer").innerHTML = "© " + new Date().getFullYear() + " " + esc(S.name) + ". Built as a static site. <a href=\"" + esc(S.contact.github) + "\">GitHub</a> · <a href=\"mailto:" + esc(S.contact.email) + "\">" + esc(S.contact.email) + "</a>";
  document.addEventListener("error", function (e) {
    var t = e.target;
    if (t && t.tagName === "IMG") { var d = document.createElement("div"); d.className = "ph"; d.textContent = "Image not found: " + t.getAttribute("src"); t.replaceWith(d); }
  }, true);
  window.addEventListener("hashchange", route);
  route();
})();
