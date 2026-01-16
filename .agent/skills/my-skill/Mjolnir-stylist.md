---
name: Mjolnir Stylist
description: UI/UX Engineering skill for Tailwind CSS "Sci-Fi Military" aesthetics - Halo Infinite/Xbox themed components
---

# Mjolnir Stylist - Halo Infinite UI Components

## 🎨 Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `infinite-cyan` | `#00f7ff` | Primary - CTAs, highlights, borders |
| `chief-green` | `#4c6353` | Secondary - subtle accents, success states |
| `deep-charcoal` | `#1c1c1c` | Background - base canvas |
| `warning-yellow` | `#ffc107` | Accents - warnings, alerts |
| `hologram-blue` | `#0a84ff` | Accents - holographic effects |

---

## 1. Glass Panel Component

A frosted glass panel with a cyber-military aesthetic.

### Tailwind Classes
```jsx
// Glass Panel - Base
<div className="
  relative
  bg-infinite-cyan/10
  backdrop-blur-md
  border
  border-infinite-cyan/30
  rounded-sm
  shadow-[0_0_15px_rgba(0,247,255,0.15)]
  p-6
">
  {/* Content */}
</div>
```

### Full Component
```jsx
// components/GlassPanel.jsx
const GlassPanel = ({ children, className = '', glowIntensity = 'normal' }) => {
  const glowStyles = {
    subtle: 'shadow-[0_0_10px_rgba(0,247,255,0.1)]',
    normal: 'shadow-[0_0_15px_rgba(0,247,255,0.15)]',
    intense: 'shadow-[0_0_25px_rgba(0,247,255,0.25),0_0_50px_rgba(0,247,255,0.1)]'
  };

  return (
    <div className={`
      relative
      bg-infinite-cyan/10
      backdrop-blur-md
      border
      border-infinite-cyan/30
      rounded-sm
      ${glowStyles[glowIntensity]}
      transition-all
      duration-300
      hover:border-infinite-cyan/50
      hover:shadow-[0_0_25px_rgba(0,247,255,0.25)]
      ${className}
    `}>
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-infinite-cyan" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-infinite-cyan" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-infinite-cyan" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-infinite-cyan" />
      
      {children}
    </div>
  );
};

export default GlassPanel;
```

---

## 2. Hexagonal Background Pattern

Military-grade honeycomb pattern for tactical overlays.

### CSS Implementation (Add to index.css)
```css
/* Hexagonal Background Pattern */
.hex-pattern {
  background-color: #1c1c1c;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2300f7ff' fill-opacity='0.06'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

/* Animated Hexagon Variation */
.hex-pattern-animated {
  background-color: #1c1c1c;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2300f7ff' fill-opacity='0.04'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  animation: hex-pulse 4s ease-in-out infinite;
}

@keyframes hex-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

### Usage with Tailwind
```jsx
// Apply as a wrapper
<div className="hex-pattern min-h-screen">
  {/* Page content */}
</div>

// Or as an overlay
<div className="relative">
  <div className="absolute inset-0 hex-pattern opacity-50 pointer-events-none" />
  <div className="relative z-10">
    {/* Content above pattern */}
  </div>
</div>
```

### Alternative: Tailwind Arbitrary SVG
```jsx
<div className="
  bg-deep-charcoal
  bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2228%22%20height%3D%2249%22%20viewBox%3D%220%200%2028%2049%22%3E%3Cg%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2300f7ff%22%20fill-opacity%3D%220.06%22%3E%3Cpath%20d%3D%22M13.99%209.25l13%207.5v15l-13%207.5L1%2031.75v-15l12.99-7.5zM3%2017.9v12.7l10.99%206.34%2011-6.35V17.9l-11-6.34L3%2017.9zM0%2015l12.98-7.5V0h-2v6.35L0%2012.69v2.3zm0%2018.5L12.98%2041v8h-2v-6.85L0%2035.81v-2.3zM15%200v7.5L27.99%2015H28v-2.31h-.01L17%206.35V0h-2zm0%2049v-8l12.99-7.5H28v2.31h-.01L17%2042.15V49h-2z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]
">
  {/* Content */}
</div>
```

---

## 3. Glitch Text Typography

Corrupted data aesthetic for headers and emphasis.

### CSS Implementation (Add to index.css)
```css
/* Glitch Text Base */
.glitch-text {
  position: relative;
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch-text::before {
  color: #00f7ff;
  animation: glitch-anim-1 2s infinite linear alternate-reverse;
  clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
}

.glitch-text::after {
  color: #ff0055;
  animation: glitch-anim-2 3s infinite linear alternate-reverse;
  clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
}

@keyframes glitch-anim-1 {
  0% { transform: translate(0); }
  20% { transform: translate(-3px, 3px); }
  40% { transform: translate(-3px, -3px); }
  60% { transform: translate(3px, 3px); }
  80% { transform: translate(3px, -3px); }
  100% { transform: translate(0); }
}

@keyframes glitch-anim-2 {
  0% { transform: translate(0); }
  20% { transform: translate(3px, -3px); }
  40% { transform: translate(3px, 3px); }
  60% { transform: translate(-3px, -3px); }
  80% { transform: translate(-3px, 3px); }
  100% { transform: translate(0); }
}

/* Subtle Glitch Variant */
.glitch-text-subtle {
  animation: glitch-flicker 4s infinite;
}

@keyframes glitch-flicker {
  0%, 90%, 100% { opacity: 1; transform: translate(0); }
  91% { opacity: 0.8; transform: translate(-2px, 0); }
  92% { opacity: 1; transform: translate(2px, 0); }
  93% { opacity: 0.9; transform: translate(0); }
}

/* Scanline overlay for extra effect */
.glitch-scanlines::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 247, 255, 0.03) 2px,
    rgba(0, 247, 255, 0.03) 4px
  );
  pointer-events: none;
}
```

### Tailwind + Arbitrary Values Hybrid
```jsx
// components/GlitchText.jsx
const GlitchText = ({ children, as: Tag = 'h1', className = '' }) => {
  return (
    <Tag 
      className={`
        glitch-text
        font-halo
        text-infinite-cyan
        tracking-[0.1em]
        uppercase
        drop-shadow-[0_0_10px_rgba(0,247,255,0.5)]
        ${className}
      `}
      data-text={children}
    >
      {children}
    </Tag>
  );
};

export default GlitchText;
```

### Usage
```jsx
<GlitchText as="h1" className="text-4xl md:text-6xl">
  SPARTAN-117
</GlitchText>

<GlitchText as="h2" className="text-2xl">
  MISSION BRIEFING
</GlitchText>
```

---

## 4. Angled Corner Buttons (Halo Menu Style)

The signature angular military button aesthetic.

### CSS Implementation (Add to index.css)
```css
/* Angled Button - Clip Path Approach */
.btn-halo {
  --corner-size: 12px;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 2rem;
  font-family: 'Orbitron', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #00f7ff;
  background: linear-gradient(135deg, rgba(0, 247, 255, 0.1) 0%, rgba(0, 247, 255, 0.05) 100%);
  border: 1px solid rgba(0, 247, 255, 0.4);
  clip-path: polygon(
    var(--corner-size) 0%,
    100% 0%,
    100% calc(100% - var(--corner-size)),
    calc(100% - var(--corner-size)) 100%,
    0% 100%,
    0% var(--corner-size)
  );
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-halo:hover {
  background: linear-gradient(135deg, rgba(0, 247, 255, 0.2) 0%, rgba(0, 247, 255, 0.1) 100%);
  border-color: rgba(0, 247, 255, 0.8);
  box-shadow: 
    0 0 20px rgba(0, 247, 255, 0.3),
    inset 0 0 20px rgba(0, 247, 255, 0.1);
  text-shadow: 0 0 10px rgba(0, 247, 255, 0.8);
}

.btn-halo:active {
  transform: scale(0.98);
}

/* Primary Filled Variant */
.btn-halo-primary {
  background: linear-gradient(135deg, #00f7ff 0%, #0a84ff 100%);
  color: #1c1c1c;
  border-color: transparent;
}

.btn-halo-primary:hover {
  background: linear-gradient(135deg, #33f9ff 0%, #3d9eff 100%);
  box-shadow: 0 0 30px rgba(0, 247, 255, 0.5);
}

/* Warning Variant */
.btn-halo-warning {
  color: #ffc107;
  border-color: rgba(255, 193, 7, 0.4);
  background: linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 193, 7, 0.05) 100%);
}

.btn-halo-warning:hover {
  border-color: rgba(255, 193, 7, 0.8);
  box-shadow: 0 0 20px rgba(255, 193, 7, 0.3);
}

/* Ghost variant */
.btn-halo-ghost {
  background: transparent;
  border-color: rgba(0, 247, 255, 0.2);
}
```

### Tailwind Component
```jsx
// components/HaloButton.jsx
const HaloButton = ({ 
  children, 
  variant = 'default', 
  size = 'md', 
  className = '',
  ...props 
}) => {
  const variants = {
    default: 'btn-halo',
    primary: 'btn-halo btn-halo-primary',
    warning: 'btn-halo btn-halo-warning',
    ghost: 'btn-halo btn-halo-ghost',
  };

  const sizes = {
    sm: 'text-xs px-4 py-2 [--corner-size:8px]',
    md: 'text-sm px-6 py-3 [--corner-size:12px]',
    lg: 'text-base px-8 py-4 [--corner-size:16px]',
  };

  return (
    <button 
      className={`
        ${variants[variant]}
        ${sizes[size]}
        font-halo
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default HaloButton;
```

### Usage
```jsx
<HaloButton variant="default">DEPLOY</HaloButton>
<HaloButton variant="primary" size="lg">INITIALIZE</HaloButton>
<HaloButton variant="warning">ABORT MISSION</HaloButton>
<HaloButton variant="ghost" size="sm">CANCEL</HaloButton>
```

---

## 📦 Complete CSS Block to Add to index.css

Copy this entire block to your `src/index.css` after the Tailwind directives:

```css
/* ============================================
   MJOLNIR DESIGN SYSTEM - HALO INFINITE THEME
   ============================================ */

/* Hexagonal Background Pattern */
.hex-pattern {
  background-color: #1c1c1c;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2300f7ff' fill-opacity='0.06'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

/* Glitch Text Effect */
.glitch-text {
  position: relative;
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch-text::before {
  color: #00f7ff;
  animation: glitch-anim-1 2s infinite linear alternate-reverse;
  clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
}

.glitch-text::after {
  color: #ff0055;
  animation: glitch-anim-2 3s infinite linear alternate-reverse;
  clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
}

@keyframes glitch-anim-1 {
  0% { transform: translate(0); }
  20% { transform: translate(-3px, 3px); }
  40% { transform: translate(-3px, -3px); }
  60% { transform: translate(3px, 3px); }
  80% { transform: translate(3px, -3px); }
  100% { transform: translate(0); }
}

@keyframes glitch-anim-2 {
  0% { transform: translate(0); }
  20% { transform: translate(3px, -3px); }
  40% { transform: translate(3px, 3px); }
  60% { transform: translate(-3px, -3px); }
  80% { transform: translate(-3px, 3px); }
  100% { transform: translate(0); }
}

/* Halo Angled Button */
.btn-halo {
  --corner-size: 12px;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 2rem;
  font-family: 'Orbitron', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #00f7ff;
  background: linear-gradient(135deg, rgba(0, 247, 255, 0.1) 0%, rgba(0, 247, 255, 0.05) 100%);
  border: 1px solid rgba(0, 247, 255, 0.4);
  clip-path: polygon(
    var(--corner-size) 0%,
    100% 0%,
    100% calc(100% - var(--corner-size)),
    calc(100% - var(--corner-size)) 100%,
    0% 100%,
    0% var(--corner-size)
  );
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-halo:hover {
  background: linear-gradient(135deg, rgba(0, 247, 255, 0.2) 0%, rgba(0, 247, 255, 0.1) 100%);
  border-color: rgba(0, 247, 255, 0.8);
  box-shadow: 0 0 20px rgba(0, 247, 255, 0.3), inset 0 0 20px rgba(0, 247, 255, 0.1);
  text-shadow: 0 0 10px rgba(0, 247, 255, 0.8);
}

.btn-halo:active {
  transform: scale(0.98);
}

.btn-halo-primary {
  background: linear-gradient(135deg, #00f7ff 0%, #0a84ff 100%);
  color: #1c1c1c;
  border-color: transparent;
}

.btn-halo-primary:hover {
  background: linear-gradient(135deg, #33f9ff 0%, #3d9eff 100%);
  box-shadow: 0 0 30px rgba(0, 247, 255, 0.5);
}

.btn-halo-warning {
  color: #ffc107;
  border-color: rgba(255, 193, 7, 0.4);
  background: linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 193, 7, 0.05) 100%);
}

.btn-halo-warning:hover {
  border-color: rgba(255, 193, 7, 0.8);
  box-shadow: 0 0 20px rgba(255, 193, 7, 0.3);
}

.btn-halo-ghost {
  background: transparent;
  border-color: rgba(0, 247, 255, 0.2);
}
```

---

## 🎯 Quick Reference Cheatsheet

| Component | Tailwind Classes |
|-----------|------------------|
| **Glass Panel** | `bg-infinite-cyan/10 backdrop-blur-md border border-infinite-cyan/30` |
| **Hex Background** | `hex-pattern` (CSS class) |
| **Glitch Text** | `glitch-text font-halo text-infinite-cyan uppercase tracking-[0.1em]` |
| **Angled Button** | `btn-halo font-halo` |
| **Primary Button** | `btn-halo btn-halo-primary` |
| **Glow Effect** | `shadow-[0_0_15px_rgba(0,247,255,0.3)]` |