# JordanWebDev Portfolio

A modern, Halo Infinite-themed React portfolio showcasing projects, experience, and technical skills.

## Features

- **Xbox Boot Animation**: Recreation of the original Xbox boot animation with a green orb using Canvas API
- **Press Start Screen**: Interactive transition screen before entering the main portfolio
- **Hexagonal Grid Background**: UNSC-inspired hexagonal pattern overlay
- **UNSC Color Palette**: Cyan (#00E6E6) and gray theme inspired by Halo Infinite
- **Glitch-Effect Navigation**: Smooth navigation transitions with glowing hover effects
- **Responsive Pages**:
  - **Home**: Hero section with parallax mouse effects and quick links
  - **Works**: Masonry grid layout showcasing projects
  - **Bio**: Personal information with animated skill progress bars
  - **Interests**: Card-based layout displaying hobbies and passions
  - **Experience**: Vertical timeline showing career progression
  - **Blog**: Discord server announcements integration (placeholder ready)
- **Smooth Scrolling**: Enhanced user experience with smooth page transitions
- **Framer Motion Animations**: Fluid animations throughout the application

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Canvas API** - Xbox boot animation

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to view the portfolio.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment

This portfolio is configured for automatic deployment to GitHub Pages via GitHub Actions. 

When you push to the `main` branch, the workflow will:
1. Build the project
2. Deploy to GitHub Pages

## Discord Integration (Blog Page)

To connect your Discord server announcements:

1. Create a Discord webhook for your announcements channel
2. Add the webhook URL to your environment variables
3. Update the `Blog.jsx` component with your Discord API endpoint

```javascript
// Example Discord API call
const response = await fetch('YOUR_DISCORD_API_ENDPOINT');
const data = await response.json();
```

## Customization

### Colors

Edit `tailwind.config.js` to modify the Halo-themed color palette:

```javascript
colors: {
  'halo-cyan': '#00E6E6',
  'halo-blue': '#00A8CC',
  'halo-gray': '#2A2E35',
  'halo-dark': '#1A1D23',
  // Add your custom colors
}
```

### Content

Update content in the respective page files under `src/pages/`:
- `Home.jsx` - Landing page
- `Works.jsx` - Projects portfolio
- `Bio.jsx` - About section
- `Interests.jsx` - Hobbies and interests
- `Experience.jsx` - Career timeline
- `Blog.jsx` - Blog/announcements

## License

MIT

## Author

JordanWebDev - Computer Software Developer
