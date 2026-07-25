# Joao Rodrigo Faria — Interactive Career Journey CV

An interactive, scroll/swipe-driven CV that walks through 20 years of aerospace and automotive
tooling engineering as a series of chapters on an animated world map — from a Mechatronics
degree in Brazil to Expert Tool Engineer at FACC in Austria.

**Live site:** https://pedrofaria01.github.io/JoaoFaria-CV/

## Features

- Chapter-by-chapter career journey navigated by mouse wheel, touch swipe, keyboard arrows, or
  the progress dots
- Animated world map background that highlights each chapter's location
- "About" and "Contact" panels accessible from the header
- Built with accessibility in mind: `aria-live` chapters, focus management on panels, keyboard
  navigation

## Tech stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- [anime.js](https://animejs.com/) for scene/transition animations
- [dotted-map](https://github.com/Guillecabo/dotted-map) for the generated map grid
- [Oxlint](https://oxc.rs/) for linting

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run lint      # run Oxlint
```

## Project structure

```
src/
  components/     # header, footer, map background, career scene/overlay, info panel, nav arrows
  data/            # career chapters content and generated map grid
  utils/           # animation helpers (anime.js)
scripts/           # one-off script to regenerate the map grid JSON (see below)
```

To regenerate the dotted map data after changing `scripts/gen-map.mjs`:

```bash
node scripts/gen-map.mjs
```

## Deployment

The site is built and published to the `gh-pages` branch (classic branch-based GitHub Pages,
no CI required), served at `https://pedrofaria01.github.io/JoaoFaria-CV/`
(see `base` in `vite.config.js`):

```bash
npm run build
npx gh-pages -d dist
```
