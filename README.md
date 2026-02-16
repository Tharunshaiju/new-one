Valentine's Day Proposal


Live URL : mygff.netlify.app
A stunning, interactive Valentine's Day proposal website featuring a beautiful Silk WebGL shader background throughout the entire application, built with Next.js, Three.js, React Three Fiber, TypeScript, and Tailwind CSS.

## ✨ Features

### Silk Shader Background (All Pages)
- **Beautiful WebGL Shader** - Gorgeous silk-like flowing pattern powered by Three.js
- **Smooth Animations** - Organic, wave-like movements across the screen
- **Performance Optimized** - Hardware-accelerated rendering with React Three Fiber
- **Consistent Design** - Same elegant background throughout the entire app
- **Customizable Parameters** - Adjust speed, scale, color, noise, and rotation

### Interactive Elements
- **Escaping "No" Button** - Moves to random positions when you try to hover or click
- **Dynamic "Yes" Button** - Grows larger each time the "No" button escapes
- **Shrinking "No" Button** - Gets smaller with each attempt
- **Smart Text Changes** - The "No" button text changes progressively

### Modern Design
- **Dark Theme** - Sleek black background with vibrant shader animations
- **Glassmorphism** - Frosted glass effects and backdrop blur
- **Smooth Animations** - Elegant transitions and micro-interactions
- **Minimalist Typography** - Large, bold, clean headings
- **Particle Effects** - Celebration particles on success

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher

### Installation

```bash
# Navigate to the project
cd valentine-proposal

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
http://localhost:3000
```

## 🎨 Silk Background Customization

The Silk shader is used consistently across all pages. You can customize it in both `app/page.tsx` and `app/yes/page.tsx`:

```tsx
<Silk
  speed={5}                     // Animation speed (1-10)
  scale={1}                     // Pattern scale/zoom
  color="#7B7481"              // Base color (hex)
  noiseIntensity={1.5}         // Grain/texture intensity (0-3)
  rotation={0}                 // Rotation angle in radians
/>
```

### Color Variations
Try different colors for different moods:
```tsx
// Romantic pink
color="#FF69B4"

// Deep purple
color="#8B008B"

// Elegant gold
color="#FFD700"

// Soft lavender
color="#E6E6FA"

// Classic gray (default)
color="#7B7481"
```

### Speed Variations
```tsx
speed={2}    // Slow, dreamy
speed={5}    // Medium (default)
speed={10}   // Fast, energetic
```

## 🎯 How It Works

### Main Page (`/`)
1. **Silk shader background** creates a mesmerizing flowing silk pattern
2. Displays the question with handwritten, elegant typography
3. "No" button escapes when approached
4. "Yes" button grows to encourage the right choice
5. Encouragement messages appear after multiple attempts

### Success Page (`/yes`)
1. **Same Silk shader** maintains visual consistency
2. Smooth transition with particle effects
3. Glassmorphic content card
4. Feature highlights
5. Romantic messaging

## 🛠️ Technologies

- **Next.js 14** - React framework with App Router
- **Three.js** - WebGL library for 3D graphics and shaders
- **React Three Fiber** - React renderer for Three.js
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Silk Shader** - Custom WebGL shader for flowing silk effect
- **Google Fonts** - Handwriting fonts (Dancing Script, Great Vibes, Pacifico)

## 📱 Project Structure

```
valentine-proposal/
├── app/
│   ├── page.tsx              # Main proposal page (Silk background)
│   ├── yes/
│   │   └── page.tsx          # Success page (Silk background)
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles + handwriting fonts
├── components/
│   └── Silk.tsx              # WebGL silk shader component
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Silk Shader Parameters

- **speed**: Animation speed (1-10, default: 5)
- **scale**: Pattern zoom level (0.5-3, default: 1)
- **color**: Base color in hex format (default: "#7B7481")
- **noiseIntensity**: Grain/texture amount (0-3, default: 1.5)
- **rotation**: Pattern rotation in radians (default: 0)

## 💡 Customization Tips

### Silk Shader Customization
Update settings in both `app/page.tsx` and `app/yes/page.tsx`:

```tsx
// Romantic pink silk
<Silk
  speed={4}
  scale={1.2}
  color="#FF1493"
  noiseIntensity={2}
  rotation={0.5}
/>

// Calm blue silk
<Silk
  speed={3}
  scale={0.8}
  color="#4169E1"
  noiseIntensity={1}
  rotation={0}
/>

// Elegant purple silk
<Silk
  speed={5}
  scale={1}
  color="#9370DB"
  noiseIntensity={1.5}
  rotation={0.2}
/>
```

### Typography
The handwriting fonts can be changed in `app/globals.css`:
- `font-handwriting` - Dancing Script
- `font-handwriting-fancy` - Great Vibes  
- `font-handwriting-bold` - Pacifico

### Button Text
Modify the "No" button responses in `app/page.tsx`:
```tsx
const noButtonTexts = [
  "No",
  "Are you sure?",
  "Really?",
  // Add your own messages...
];
```

## 📦 Build for Production

```bash
npm run build
npm start
```

## ❤️ Perfect For

- Valentine's Day proposals
- Anniversary surprises
- Romantic gestures
- Special moments

## 🌟 Credits

- Silk shader component by react-bits
- Handwriting fonts from Google Fonts (Dancing Script, Great Vibes, Pacifico)
- Built with love using Next.js, Three.js, and React Three Fiber
- Inspired by elegant silk textures and romantic aesthetics

---

**Made with 💖 and beautiful WebGL shaders** ✨
