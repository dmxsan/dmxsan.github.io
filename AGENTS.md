# XLab (dmxsan.github.io) - Agent Rules & Design Contract

## 1. Discuss & Inspect First

- Do not edit files, create content, commit, push, or deploy unless the user explicitly instructs execution.
- When the user proposes a new experiment, utility, or page, inspect the target repository first and present a concise plan before editing.

## 2. Shared Design & Editorial Contract (`dmxsan.dev` Section 8)

- **Color Palette:** Reuse the exact Light EO (`#F5F6F2` / `#E9ECE5`) and Dark Forest (`#0F1411` / `#171F1A`) CSS custom properties defined in `assets/styles.css`, along with the `dmxsan-theme` localStorage key and OS preference fallback in `assets/theme.js`. Do not hardcode hex colors outside `:root`, `:root[data-theme='dark']`, `favicon.svg`, and the `#F5F6F2`/`#0F1411` theme-color meta/script lines.
- **Shape & Radius:** Keep sharp corners (`2px` to `3px` radius). Never use `999px` or `9999px` pill radii.
- **Brand & Icon:** Keep the `XLab by dmxsan.dev` header lockup (`X` in `--nir`, `Lab` in `--ink`) and the 5x5 Precision NIR X icon (`favicon.svg`).
- **Impersonal Voice:** Never use first-person (`"I"`). Keep XLab lighter and more exploratory than `dmxsan.dev`, while staying impersonal and clear to readers with light geospatial or AI knowledge.
- **Domain-Accurate Terminology:** Use exact scientific terms matching what each dataset or model defines, and keep terms consistent across titles, summaries, legends, and readouts. Never swap distinct remote sensing concepts as synonyms (for example, `deforestation` implies a forest definition and conversion, whereas `tree cover loss` as in Hansen GFC does not, and `canopy` refers to crown cover rather than a land-use class).
- **Honest Capability Labeling:** Match labels to actual functionality (`prototype`, `preview`, `inspector`, `demo`, `viewer`, `walkthrough`, `benchmark`). Reserve `tool` or `sandbox` strictly for pages where users supply or transform their own inputs.
- **Zero Em-Dashes:** Never use em-dashes in UI prose, code comments, or documentation.
- **Information & Color Restraint:** Index entries on `/` show only title, 1-sentence summary, maturity status (`PROTOTYPE`, `DEMO`, `TOOL`), and 2 to 3 uniform neutral tags. Do not place raw metrics or vanity star counts inside index tags. Keep search and category filters hidden until more than one entry exists. Reserve `--ndvi`, `--sar`, `--nir`, and `--amber` strictly for brand marks, links, active states, and chart/map data.

## 3. Repository Structure & GitHub Pages Rules

- This repository serves static files directly from `/` (`main` branch) at `https://lab.dmxsan.dev/` (with `https://dmxsan.github.io/` redirecting here).
- Do not break per-repo GitHub Pages subpaths (`/<repo>/`). Keep links on `/` relative (`./...`), and keep 404 assets root-absolute (`/assets/...`).
- Keep `.nojekyll` committed at the repository root.
