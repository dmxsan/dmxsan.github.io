# XLab by dmxsan.dev

An open geospatial lab accompanying the [dmxsan.dev](https://dmxsan.dev) portfolio, hosting in-progress experiments, spatial models, and interactive demos.

## Structure

- `index.html`: Root index of experiments and latest updates
- [`deforestation/`](https://lab.dmxsan.dev/deforestation/): Automatic Deforestation Detection prototype (44-epoch training curve inspector and confidence cutoff preview)
- `assets/styles.css`: Shared Light EO and Dark Forest CSS tokens and layout styles
- `assets/theme.js`: Theme toggle using the same `dmxsan-theme` storage key convention as `dmxsan.dev`
- `favicon.svg`: 5x5 NIR X mark
- `404.html`: Fallback page for retired or unknown routes

## Local Preview

Serve static files directly from the repository root with no build step:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` in a browser.

## Deployment & Subpaths

- Deployed from `main` (`/`) via GitHub Pages at `https://lab.dmxsan.dev/` (`https://dmxsan.github.io/` redirects here).
- Per-repository GitHub Pages sites under `dmxsan/<repo>` resolve cleanly as sibling subpaths (`/<repo>/`).
