# 🚀 Quick Start Guide - Refactored Portfolio

## ✅ What Was Done

Your 1089-line `index.html` has been refactored into a clean, modular structure:

- **3 CSS files** instead of 1 giant `<style>` block
- **6 section files** for easy content editing
- **2 JavaScript files** for navigation and utilities
- **Same look and functionality** - nothing broke!

## 📦 What You Have

```
portfolio/
├── index.html              # 52 lines (was 1089!)
├── README.md              # Full documentation
├── QUICKSTART.md          # This file
├── css/                   # Organized styles
│   ├── main.css          # 277 lines
│   ├── components.css    # 274 lines
│   └── sections.css      # 153 lines
├── js/                    # JavaScript functionality
│   ├── navigation.js     # 63 lines
│   └── utils.js          # 43 lines
├── sections/              # Your content
│   ├── home.html
│   ├── about.html
│   ├── research.html
│   ├── ai-education.html
│   ├── data-viz.html
│   └── rigour.html
└── assets/                # For images (empty for now)
```

## 🔄 How to Deploy This

### Step 1: Download the Files

All the files are in this chat's outputs. Download the entire folder structure.

### Step 2: Replace Your Current Files

In your `~/Desktop/portfolio` folder:

```bash
# Backup your current index.html (just in case)
cp index.html index.html.backup

# Copy all the new files into your portfolio folder
# (You can drag and drop from Downloads or use terminal)
```

### Step 3: Test Locally

Open `index.html` in your browser to test it works locally.

**Important:** Because it loads files dynamically, you need to run it through a local server:

#### Option A: Using VS Code
1. Install "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"
3. It will open in your browser

#### Option B: Using Python (if you have it)
```bash
cd ~/Desktop/portfolio
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser

### Step 4: Push to GitHub

Once you've verified it works:

```bash
cd ~/Desktop/portfolio
git add .
git commit -m "Refactor: Split into modular structure"
git push
```

Netlify will auto-deploy in ~30 seconds!

### Step 5: Check Your Live Site

Go to `precious-torte-f1a3ca.netlify.app` (or `brooklyncorbett.com` once DNS propagates)

## ⚠️ Important Note

The refactored version loads section content via JavaScript. This means:

- ✅ Works perfectly on Netlify/GitHub Pages
- ✅ Works with Live Server or local server
- ❌ Won't work if you just double-click index.html (browser security)

That's why you need Step 3 above!

## 🎨 Making Your First Edit

Let's test it! Try this:

1. Open `sections/home.html`
2. Change "Brooklyn Corbett" to "Brooklyn Corbett - TEST"
3. Save
4. Push to GitHub
5. Check your live site in 30 seconds!

## 💡 Where to Make Changes

| What you want to change | File to edit |
|------------------------|--------------|
| Your bio text | `sections/about.html` |
| Research projects | `sections/research.html` |
| AI tools | `sections/ai-education.html` |
| Color scheme | `css/main.css` (CSS variables at top) |
| Button styles | `css/components.css` |
| Navigation | `index.html` |

## 🐛 Troubleshooting

**Problem:** Sections don't load (blank page)
**Solution:** Make sure you're using a local server (see Step 3)

**Problem:** Styles look broken
**Solution:** Check that all CSS files are in the `css/` folder

**Problem:** Navigation doesn't work
**Solution:** Check browser console (F12) for errors

## ❓ Questions?

Read the full `README.md` for detailed documentation!

## 🎉 What's Next?

Now you're ready to:
1. Add your actual photo to `assets/`
2. Update your content in the section files
3. Start building those interactive research demos!

The modular structure makes it super easy to add new features without breaking anything. Each feature can have its own JavaScript file, and you'll always know where everything is!
