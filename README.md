# Yousef — Portfolio Website

A **static website** (plain HTML, CSS and JavaScript). It needs **no backend, no database and no paid service**.
All content you will edit is in the `data/` folder. You almost never need to touch `js/app.js` or `css/style.css`.

## What is in the folder

```
index.html            page shell
css/style.css         design (dark + light theme)
js/app.js             builds the pages from the data files
data/site.js          name, texts, EMAIL / LINKEDIN / GITHUB (change contact details here only)
data/projects.js      all projects and case studies
data/skills.js        skills and their status
data/services.js      freelance services
data/lab.js           Automation Lab (n8n workflows) and technical articles
assets/screenshots/   put project images here
scripts/              checking, build and test tools
.github/workflows/    automatic deployment to GitHub Pages
```

## 1. Install the software (Windows)

1. **Node.js LTS** (version 18 or newer): https://nodejs.org  — click the LTS button, install with the default options.
2. **Visual Studio Code**: https://code.visualstudio.com
3. **Git**: https://git-scm.com/download/win (needed only for publishing).

Check Node: open VS Code terminal and run `node --version`. It should print a version number.

## 2. Open and run the project

1. Right-click the ZIP file, choose **Extract All**, and pick a folder such as `C:\Projects\portfolio`.
2. Open VS Code, choose **File > Open Folder**, and select the extracted `portfolio` folder (the one containing `package.json`).
3. Open the terminal: **Terminal > New Terminal**.
4. Run these commands, one at a time:

```
npm install
npm start
```

5. Open http://localhost:3000 in your browser. Press `Ctrl+C` in the terminal to stop the server.

You can also just double-click `index.html`; it works without a server too.

## 3. Check and build

```
npm run verify    # checks your data files for mistakes (bad links, missing images, wrong status)
npm test          # verify + opens the real page in a simulated browser and tests filters, theme, routes
npm run build     # verify + creates the dist/ folder (this is what gets published)
npm run preview   # shows dist/ at http://localhost:3000
```

## 4. How to edit (all in VS Code)

**Change contact details:** edit `contact` in `data/site.js`. This is the only place they are stored.

**Change text** (headline, About): edit `data/site.js`.

**Add a new project:** open `data/projects.js`, copy one whole `{ ... },` block, paste it at the end of the list, and edit it:

```js
{
  slug: "my-new-project",              // unique, lowercase, no spaces
  title: "My New Project",
  category: "Data Engineering",        // see the list at the top of the file
  status: "In progress",               // Completed | In progress | Experimental | Educational | Planned
  featured: false,                     // true = shown in "Featured" (the first 3 featured are used)
  published: true,                     // false = hidden draft
  summary: "One or two sentences.",
  tech: ["Python", "Airflow"],
  github: "https://github.com/yousef-140/my-new-project",
  demo: null,                          // or "https://my-demo-url" (button appears only if set)
  screenshots: [{src:"assets/screenshots/my-new-project.png", alt:"What the image shows"}],
  problem: "...", goals: ["..."],
  architecture: ["Step 1","Step 2","Step 3"],   // shown as a flow diagram
  implementation: ["Things you can prove from the code"],
  results: [],                         // only documented, real results; empty is fine
  limitations: ["Be honest here"],
  applications: ["..."], next: ["..."]
},
```

Save, then run `npm run verify`. It tells you exactly what is wrong if you made a typo.

**Replace/add screenshots:** copy the image into `assets/screenshots/` and list it in `screenshots`. Real screenshots are included for the Power ETL, Real Estate, RAG Platform and Research Coach projects. The other projects show a clearly marked placeholder until you add real screenshots.

**Update skills:** edit `data/skills.js`. Use `demonstrated` only if a project proves it. Change `learning` to `demonstrated` after you build something with it.

**Edit services:** edit `data/services.js`.

**Add an n8n workflow:** open `data/lab.js`, copy the template from the comment into `AUTOMATIONS`, and put the diagram or screenshots in `assets/automations/`. Remove API keys from any JSON export before linking it.

**Add an article:** use the template in `data/lab.js` (`ARTICLES`). Only `published: true` entries appear.

**New GitHub repositories are not added automatically.** This is on purpose: you decide what is featured. Add a project block when a repository is ready. (The repos `Security-Robot-with-face-recognition`, `SQL_GENERATOR` and `mobile_task` were not reviewed and are not included.)

## 5. Free deployment with GitHub Pages

GitHub Pages is free for public repositories. You get a free address like `https://yousef-140.github.io/`.

1. Sign in at https://github.com. Click **New repository**.
2. Name it **`yousef-140.github.io`** (this gives the address `https://yousef-140.github.io/`). Choose **Public**. Do not add a README. Click Create.
3. In the VS Code terminal, inside the project folder:

```
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/yousef-140/yousef-140.github.io.git
git push -u origin main
```

(Git may ask you to sign in. Use the browser login that appears.)

4. On GitHub open the repository: **Settings > Pages > Build and deployment > Source: GitHub Actions**.
5. Open the **Actions** tab. The workflow "Deploy to GitHub Pages" runs automatically (1-2 minutes). A green check means it worked.
6. Open `https://yousef-140.github.io/` and check that it loads.

**Updating the live site later:** edit files, then run

```
git add .
git commit -m "Update projects"
git push
```

The workflow tests, builds and publishes again automatically.

**Free alternatives:** Cloudflare Pages or Netlify also work. Use build command `npm run build` and output folder `dist`. Free plan limits can change, so check their pricing pages.

## 6. Common problems

| Problem | Fix |
|---|---|
| `npm is not recognized` | Install Node.js, then close and reopen VS Code. |
| `npm run verify` shows FAILED | Read the message: it names the project/skill and the problem. |
| Blank page after edit | A typo in a `data/*.js` file (missing comma, quote or bracket). Press F12 in the browser, open Console, and read the error line. |
| Image not showing | Check the path and capital letters in `src`; the page shows "Image not found: path". |
| Port 3000 already used | Close the other terminal running `npm start`. |
| PowerShell blocks npm scripts | Use **Command Prompt** terminal in VS Code, or run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`. |
| Actions workflow fails | Open the failed run and read the red step. Most often Pages source is not set to GitHub Actions (step 4). |

## 7. Contact form

There is no backend, so the Contact section uses `mailto:` links that open the visitor's email app. Your email address is visible in the page source, so expect some spam. A free form service (for example Formspree) can be added later if you want a form; it needs your own account and configuration.

## 8. Still needs your input

- Real screenshots for the projects that have none (and live demo URLs if you ever host one).
- Review every skill status and every project description for accuracy; they come from your README files and code, not from running the projects.
- Optional: a profile photo, a CV link, pricing, a custom domain (not required).

## 9. Privacy and repository cleanup (important)

Before sending clients to your GitHub, in `custom-knowledge-rag-platform` delete `data/uploads/*` (it contains copyrighted book PDFs and a PDF of your resume) and add `data/uploads/` to its `.gitignore`. Also remove `__pycache__` and `.ipynb_checkpoints` from `Gym_Coach`. In `research-coach-` the README shows `docs/demo.gif`, but that file is not in the repository, so the image is broken on GitHub: upload the GIF (or remove the line), then add it to this site under `screenshots`.
