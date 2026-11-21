# XLab by dmxsan.dev

An open geospatial lab by [dmxsan.dev](https://dmxsan.dev) for in-progress experiments, spatial models, and interactive demos.

## Structure

- `index.html`: Root index of experiments and latest updates
- `deforestation/`: Automatic Deforestation Detection prototype (44-epoch training curve inspector and confidence cutoff preview)
- `assets/styles.css`: Shared Light EO and Dark Forest CSS tokens and layout styles
- `assets/theme.js`: Theme toggle and `dmxsan-theme` persistence synced with `dmxsan.dev`
- `favicon.svg`: 5x5 NIR X mark
- `404.html`: Fallback page for retired or unknown routes

## Local Preview

Serve static files directly from the repository root with no build step:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` in a browser.

## Deployment & Subpaths

- Deployed from `main` (`/`) via GitHub Pages at `https://dmxsan.github.io/`.
- Per-repository GitHub Pages sites under `dmxsan/<repo>` resolve cleanly as sibling subpaths (`/<repo>/`).
