# Brooklyn Corbett Portfolio - Refactored Structure

## 📁 File Structure

```
portfolio/
├── index.html              # Main HTML shell (loads everything)
├── css/
│   ├── main.css           # Global styles, navigation, footer, animations
│   ├── components.css     # Reusable components (cards, buttons, tags)
│   └── sections.css       # Section-specific styles
├── js/
│   ├── navigation.js      # Tab switching functionality
│   └── utils.js           # Section loading utility
├── sections/
│   ├── home.html          # Home page content
│   ├── about.html         # About section content
│   ├── research.html      # Research projects content
│   ├── ai-education.html  # AI tools content
│   ├── data-viz.html      # Data visualisation content
│   └── rigour.html        # Research rigour content
└── assets/
    └── (images, photos, etc.)
```

## 🚀 How It Works

1. **index.html** - The main file that contains only the shell (navigation, footer, empty section containers)
2. **Section files** - Each tab's content is in its own HTML file in the `sections/` folder
3. **CSS files** - Styles are organized into three logical files for easy maintenance
4. **JavaScript** - Handles navigation and dynamically loads section content

## 💻 Development Workflow

### Making Changes

1. **To edit content:**
   - Edit the relevant file in `sections/` folder
   - Example: To change your bio, edit `sections/about.html`

2. **To edit styles:**
   - Global styles → `css/main.css`
   - Component styles → `css/components.css`
   - Section-specific → `css/sections.css`

3. **To add functionality:**
   - Add JavaScript to existing files or create new ones in `js/`

### Deploying Changes

```bash
cd ~/Desktop/portfolio
git add .
git commit -m "Your change description"
git push
```

Or use VS Code's Source Control panel (the branch icon in the sidebar).

## 🎨 Adding Images

1. Place image files in the `assets/` folder
2. Reference them in HTML as: `assets/your-image.jpg`
3. Example for hero photo: Update `sections/home.html` and uncomment the image line

## ✨ Next Steps - Building Interactive Features

### Research Demos (Future)
Create new files in `js/` for each interactive demo:
- `js/research/focus-group-demo.js`
- `js/research/myth-buster-demo.js`
- etc.

### Data Visualizations (Future)
- Add D3.js or Chart.js library
- Create visualization scripts in `js/visualizations/`

## 📝 Benefits of This Structure

✅ **Maintainable** - Each piece of code has a clear location
✅ **Scalable** - Easy to add new features without cluttering
✅ **Organized** - No more scrolling through 1000+ line files
✅ **Professional** - Industry-standard file organization
✅ **Collaborative** - Clear structure makes it easy to work with others

## 🔍 Finding Things

- **Navigation bar** → `index.html` (lines 28-40)
- **Home page hero** → `sections/home.html`
- **Project cards** → `sections/research.html`
- **Button styles** → `css/components.css`
- **Color palette** → `css/main.css` (top, CSS variables)

## ⚠️ Important Notes

- The site uses **client-side routing** - sections load without page refresh
- All sections load on initial page load for better UX
- JavaScript is required for the site to work
- Styles use CSS variables for easy theme changes
