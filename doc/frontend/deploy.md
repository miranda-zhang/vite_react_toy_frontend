# Host a React/Vite frontend on **GitHub Pages (github.io)**

## 🧱 1. Prerequisites

* For **free GitHub accounts**, GitHub Pages sites must come from **public repositories**.
* **Private repositories** can use GitHub Pages **only if you’re on a paid plan** (like **GitHub Pro**, **Team**, or **Enterprise**).


| Repo visibility | Free account                 | Paid account |
| --------------- | ---------------------------- | ------------ |
| **Public**      | ✅ Can host with GitHub Pages | ✅ Can host   |
| **Private**     | ❌ Not allowed                | ✅ Allowed    |


Make sure you have:

* A GitHub account
* Git installed locally
* Created a project via webpage
* Downloaded the project

```bash
git clone git@github.com:miranda-zhang/vite_react_toy_frontend.git
```

This way saves a bit of hassle.

The other way is to create the vite project first, then:
```
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```
---

## Make sure Node version is compatible

```bash
nvm install 20
```

Tell `nvm` to use it *for this project only*

Inside your project folder:

```bash
cd /path/to/your/project
nvm use 20
```

You can also create a `.nvmrc` file:

```bash
echo "20" > .nvmrc
```

Now `nvm use` automatically picks up that version whenever you enter the directory.

> 🪄 **Bonus:** This doesn’t affect global Node — each terminal session can run a different Node version.

## 🚀 1. Create the vite prject
```bash
npm create vite@latest frontend -- --template react
```

## 🚀 2. Add GitHub Pages dependency

Inside your project root:

```bash
npm install gh-pages --save-dev
```

---

## ⚙️ 3. Update your `vite.config.js`

Add a `base` path so assets resolve correctly when hosted on GitHub Pages.

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'your-repo-name' with the actual repository name
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', 
})
```

If you're deploying to **`https://username.github.io/`** (main profile site, not a project), use:

```js
base: '/'
```

---

## 📦 4. Update `package.json` scripts

Add deploy and predeploy scripts:

```json
"homepage": "https://miranda-zhang.github.io/vite_react_toy_frontend/",
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

---
## ⚙️ 5. (Optional) Enable Pages in GitHub UI

If not auto-enabled:

* Go to **Settings → Pages**
* Under **Branch**, select `gh-pages` → `/ (root)`
* Save

---
## 🪣 6. Deploy to GitHub Pages

If you haven’t yet:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
``` 
Deploy
```bash
npm run deploy
```

This will:

* Build your Vite app to `/dist`
* Push the build to a new `gh-pages` branch
* Host it automatically on
  `https://<your-username>.github.io/<your-repo-name>/`

---

## ✅ Done!

Your site should be live at:

```
https://<username>.github.io/<repo-name>/
```
It can take up to 10 minutes for changes to your site to publish.
