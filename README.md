# CHEM101 — Midterm 2 preparation

A complete English-language study website built with React and Vite. No backend, account, API key, or paid service is required.

## Included

- 32 beginner-friendly lessons: foundations, bonding and geometry, molecular orbitals, gases, thermochemistry, equilibrium, acids and buffers, entropy, and Gibbs energy.
- 420 English practice questions with worked solutions and explanations for every incorrect choice: 35 calculation types with 10 numerical variants each, plus 70 conceptual questions. These are 105 underlying types/concept questions, not 420 unrelated methods.
- 10 fixed mock exams, each with 25 multiple-choice questions, 90 minutes, and a score out of 100. Each contains 18 calculation questions and 7 conceptual questions. Question IDs do not repeat between exams; calculation methods recur with different numbers.
- Mistake counts, separate unanswered-question counts, a review queue, topic accuracy, bookmarks, and attempt history.
- A timer, flags, question navigation, automatic submission on expiry, and recovery of an active exam after reloading.
- Progress export/import, mobile layouts, and printable results.
- A coverage map for all 343 pages of the eight supplied PDFs, reviewed solutions to all 45 supplied Midterm/Quiz questions, and explicit notes on errors or missing data in those sources.
- Interactive illustrations for VSEPR, oxygen ions, gas compression, and buffer composition.

## Run locally

Use Node.js 22.12+ or a compatible newer version. Tested on Node 24.

From the directory containing this README:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Do not open `index.html` directly: the app uses JavaScript modules and needs an HTTP server.

```sh
npm test
npm run build
npm run preview
```

The production build is written to `dist/`. Neither `dist/` nor `node_modules/` is tracked in Git; the deployment service generates them.

## Deploy to Vercel

1. Import the GitHub repository into Vercel.
2. Set **Root Directory** to the directory containing `package.json` (the repository root for `mid-chem`).
3. **Framework Preset:** Vite.
4. **Install Command:** `npm ci`. **Build Command:** `npm run build`. **Output Directory:** `dist`.
5. No environment variables are required. Deploy.

Build settings are also provided in `vercel.json`. Hash routes such as `/#lesson/buffer` work without server rewrite rules. Alternatively, run `vercel` from the project directory if you have the Vercel CLI installed.

## How to study

1. If chemistry is new to you, start with the three foundation lessons.
2. Follow the lesson sequence. A “read” mark records reading, not demonstrated mastery.
3. Practise by topic. Write the units and working before checking your answer. Checking the same answer twice does not add another attempt.
4. Review “My mistakes”. A correct retry clears the question from the unresolved queue while retaining the historical error count.
5. Attempt a mock exam without hints. Explanations appear after submission; results can be printed.

Calculation questions include their constants. Numerical choices are generally rounded to three significant figures. Use a scientific calculator and distinguish `ln` from `log`.

## Progress and timer behaviour

Progress is stored in `localStorage` under `chem101-progress-v1`, separately for each browser and site origin. Localhost, preview, and production deployments have separate storage. Export/import transfers progress between them. Clearing browser data may erase progress. If saving is unavailable, the app displays a warning so you can export before leaving.

The English-language update preserves all lesson/question IDs, answer keys, exam compositions, and the storage schema. Existing progress on the same origin remains compatible.

The timer uses an absolute deadline. Switching sections, reloading, or closing the tab does not pause it. JavaScript does not run while the site is closed; an expired attempt is submitted when the site is next opened. Use one tab at a time: the app warns about changes in another tab but does not merge simultaneous edits.

An unanswered exam question earns 0 points and is counted separately from an incorrect answer. “Skip without grading” in practice does not record an attempt. Import replaces current progress after confirmation and validates IDs, counters, answers, and scores. Export your current progress first if you want to keep both copies.

## Sources and limitations

Course sources: `23CHEM101_9.pdf` through `23CHEM101_16.pdf`, `Mid 2 copy for tg.docx`, and `Quiz 2 copy for tg.docx`.

All PDF pages were extracted and inspected in visual overview; figures and equations were checked against the extracted text. Repeated slides were consolidated. The website’s “Source review” section maps the complete lecture coverage.

The Midterm example includes entropy, Gibbs energy, and reversible isothermal expansion. The eight PDFs only announce these topics, so supplementary lessons cover the methods needed for the example. The referenced Data Table is absent from the supplied DOCX. Website questions provide the required numerical data explicitly; missing source answers are not invented.

Source issues include a wrong citric-acid species concentration, an incorrect temperature inequality, an unbalanced reaction, an invalid statement about q = ΔU, and errors in ICE/calorimetry examples. These are explained on the site. The source questions retain their original English wording; the surrounding review identifies flaws.

The mock exams are original practice based on the supplied materials. They do not guarantee a grade or the contents of a future exam. Additional lectures or the missing data table can be incorporated later.

Original PDFs are not published in full. The site includes the 45 supplied example questions and the Boyle’s-law graph image. Manrope and Lora fonts are served locally, with OFL licences in `public/fonts/`. Lucide uses the ISC licence. There is no analytics or server-side collection of study progress.

## Project structure

- `src/curriculum.js` — lessons, formula sheet, and glossary.
- `src/questions.js` — deterministic numerical variants, conceptual questions, and mock exam composition.
- `src/engine.js` — grading, statistics, and progress import validation.
- `src/main.jsx` — interface, routes, and browser persistence.
- `src/sources.js` — lecture map, corrections, and supporting references.
- `src/examples.json` — supplied Midterm/Quiz questions and reviewed solutions.
- `src/style.css` — responsive layout and print styles.
- `tests/engine.test.js` — bank integrity, independent numerical benchmarks, grading, persistence, and import validation.
- `DESIGN.md` and `.impeccable/design.json` — visual system documentation.

Validation: production build, seven automated tests, and browser scenarios at desktop/mobile widths covering practice, mistake correction, exam restoration, grading, export/import, timer expiry, and responsive layouts. Translation checks also confirm that all 420 original prompts, choices, answer keys, and exam assignments remain unchanged.
