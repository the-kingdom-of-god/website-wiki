# KOG Hub

The overarching site that lists and links to every KOG site: live sites, design directions, and pages the advisors made in Slack.

- `sites.json` — the list of every site. `index.html` reads it and builds the page, so this is the only file to edit when a site is added.
- `index.html` — the page itself (layout, search and filters).
- `assets/screenshots/` — one preview image per site.
- `sites/<name>/` — each site's **production build**, copied in from `<project>/dist/public` after a `vite build`. This folder is generated — don't hand-edit it.

## Viewing it locally

From this folder:

```
npx serve .
```

Then open the printed localhost URL.

## Adding a new site

1. Build the new project with a base path matching where it'll live here:
   ```
   cd ../kog-<new-site>
   npx vite build --base=/sites/<new-site>/
   ```
2. Copy the build output in:
   ```
   rm -rf ../kog-hub/sites/<new-site>
   mkdir -p ../kog-hub/sites/<new-site>
   cp -r dist/public/. ../kog-hub/sites/<new-site>/
   ```
3. Take a screenshot of the running site (1440-wide is a good width) and save it as
   `kog-hub/assets/screenshots/<new-site>.jpg`.
4. Add an entry to the `design` list in `sites.json` (name, url, image, accent, tagline, desc).

For a live site that isn't a design direction, add an entry to `live` instead
(name, url, desc, repo, and access: `public`, `partly`, `login` or `offline`).
The counters at the top update themselves.

## Note on `kog-studio-1` and `kog-studio-2` artwork

These two sites originally referenced images via `/manus-storage/...` paths, which only resolve
inside the Manus build environment that generated them — outside of it (including here) those
images 404'd. They've been replaced with original SVG artwork (in each project's
`client/src/assets/`) matching the same descriptions and palette, imported directly in
`App.tsx`/`Home.tsx` so they bundle with the app and need no external host. If you'd rather use
the original photography/renders, export them from Manus, drop them into `client/src/assets/`
(or `client/public/`), and swap the `import` paths back.

## Routing fix applied

`kog-come-gather`, `kog-faith-circle`, `kog-pink`, and `kog-studio-2` use client-side routing
(`wouter`). Their `App.tsx` was updated to wrap the router in `<Router base={import.meta.env.BASE_URL...}>`
so the app still matches routes correctly when served from a sub-path like `/sites/pink/` instead of
the site root `/`. Keep this pattern in any new project that uses wouter and might be nested here.
