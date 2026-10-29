# 👑 KOG Website Wiki

Every Kingdom of God site, in one place. 🌍

This repo holds the **hub**, a single page that lists and links to every KOG site. It's live at
🔗 **https://www.kogwebsite.wiki** (and a mirror at https://kog-project-overview.surge.sh).

---

## 🗺️ What's where

```
📁 hub/                     ← 🌐 the website itself (this is what gets published)
   📄 index.html            ← the page: layout, search, filters, sort
   📄 sites.json            ← ⭐ the list of every site (edit this to add one)
   📁 assets/screenshots/   ← 🖼️ one preview image per site
   📁 sites/                ← 🏗️ built copies of the design sites (generated, don't hand-edit)
   📄 CNAME                 ← surge domain

📁 designs/                 ← 🎨 source code for the 8 design sites (React + Vite, made in Manus)
   📁 becoming/  📁 becoming-awake/  📁 come-gather/  📁 faith-circle/
   📁 open-me/   📁 pink/            📁 studio-1/     📁 studio-2/

📁 scripts/
   📄 build-designs.sh      ← 🔨 builds designs/<name> into hub/sites/<name>
```

**In short:** 🌐 `hub/` is the website, 🎨 `designs/` is the source for the sites it hosts, and ⭐ `hub/sites.json` is the list.

### 🤔 Why is `sites.json` inside `hub/` and not at the root?

The page reads the list while it runs in your browser: `hub/index.html` loads it with
`fetch("sites.json")`, from the same folder as the page. The page also links to it ("The full list
is in sites.json"), so anyone can open the raw list.

Only the `hub/` folder is published, to Vercel and to surge, so the page can only load files
inside `hub/`. If `sites.json` sat at the root of the repo, it wouldn't be published, and the live
page would load an empty list. 🫙

Keeping it next to `index.html` means:
- ✅ there's **one** copy, with no second version to keep in sync
- ✅ `npx serve hub` and a plain deploy just work, with no copy step to remember
- ✅ what you edit is exactly what goes live

---

## 📚 What the hub lists

`hub/sites.json` has four sections. The counters at the top of the page update by themselves.

| Section | What it is | Fields |
| --- | --- | --- |
| 🟢 `live` | Real sites on their own domains | `name`, `url`, `image`, `desc`, `repo`, `access`, `date` |
| 🎨 `design` | The design directions in `designs/`, hosted in `hub/sites/` | `name`, `url`, `image`, `accent`, `tagline`, `desc`, `date` |
| 🤖 `manus` | Sites made with Manus | `name`, `url`, `image`, `desc`, `shared`, `date` |
| 💬 `made_in_slack` | Pages the advisors made in Slack | `name`, `url`, `image`, `group`, `date` |

🔐 `access` is one of `public`, `partly`, `login` or `offline`.
📅 `date` is `YYYY-MM-DD` and drives the timeline and the newest/oldest sort.

---

## 👀 View it on your computer

```sh
npx serve hub
```

Then open the localhost link it prints.

---

## ➕ Add a site

### 🔗 A site that lives somewhere else (live, Manus or Slack)

1. 📸 Take a 1440×900 screenshot, resize it to 720 wide and save it as a `.jpg` in
   `hub/assets/screenshots/live/`, `manus/` or `slack/` (Slack pages are named after the page ID).
2. ✍️ Add an entry to the matching section of `hub/sites.json`.

That's it. 🎉

### 🎨 A new design site

1. 📂 Put the project in `designs/<name>/`.
2. 🔨 Build it into the hub:
   ```sh
   scripts/build-designs.sh <name>
   ```
3. 📸 Save a screenshot as `hub/assets/screenshots/<name>.jpg`.
4. ✍️ Add an entry to `design` in `hub/sites.json`, with `url` set to `sites/<name>/`.

---

## 🔨 Rebuild the design sites

```sh
scripts/build-designs.sh          # 🔁 all of them
scripts/build-designs.sh pink     # 🎯 just one
```

Each design is built with `--base=/sites/<name>/` so it works from its sub-folder, then copied into
`hub/sites/<name>/`. Dependencies are installed with `pnpm` the first time.

---

## 🚀 Publish

Both hosts publish the `hub/` folder.

```sh
npx surge hub kog-project-overview.surge.sh   # 🌊 surge mirror
vercel --prod                                 # ▲ kogwebsite.wiki (Vercel project kog-website-wiki)
```

▲ The repo root is linked to the Vercel project `kog-website-wiki`, and that project's
**Root Directory** setting needs to be `hub`.

---

## 🛠️ Notes on the design sites

- 🖼️ **Studio 1 and Studio 2 artwork.** These first pointed at `/manus-storage/...` images, which
  only load inside Manus. They now use original SVG artwork in each project's `client/src/assets/`,
  imported in `App.tsx`/`Home.tsx` so it's bundled with the app. To use the original images, export them
  from Manus into `client/src/assets/` (or `client/public/`) and change the imports back.
- 🧭 **Routing in sub-folders.** Come Gather, Faith Circle, Pink and Studio 2 use `wouter` for routing.
  Their `App.tsx` wraps the router in `<Router base={import.meta.env.BASE_URL...}>` so routes still
  match when served from `/sites/<name>/`. Do the same for any new design that uses `wouter`.
- 💡 Each design has an `ideas.md` describing its design direction.
