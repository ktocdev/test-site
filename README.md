# Vue Static Site

A beautiful Vue 3 static site with custom components and routing.

## Features

- ✨ Vue 3 with Composition API
- 🚀 Vite for fast development
- 🎨 Custom button component with multiple variants
- 📱 Responsive design
- 🧭 Vue Router for navigation
- 💅 Modern CSS with gradients and animations

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your system.

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and go to: `http://localhost:5173`

### Troubleshooting

If you get "ERR_CONNECTION_REFUSED" error:

1. **Check if the server is actually running**: Look for a message like "Local: http://localhost:5173/" in your terminal
2. **Try a different port**: Sometimes port 5173 might be in use
3. **Check firewall settings**: Make sure your firewall isn't blocking the connection
4. **Try running with explicit host**:
   ```bash
   npm run dev -- --host 0.0.0.0 --port 5173
   ```
5. **Clear browser cache** and try again
6. **Try accessing via 127.0.0.1**: `http://127.0.0.1:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── App.vue              # Main application component
├── main.js              # Application entry point
├── pages/               # Page components
│   ├── Home.vue         # Home page component
│   ├── FontShowcase.vue # Font showcase page
│   ├── LogoDesign.vue   # Logo design page
│   └── Stars.vue        # Stars page
└── components/          # Reusable components
    ├── CustomButton.vue # Reusable button component
    ├── CustomCheckbox.vue
    ├── CustomDropdown.vue
    ├── ColorDropdown.vue
    ├── ColorSwatch.vue
    ├── GlowDropdown.vue
    └── StrokeDropdown.vue
```

## Components

### CustomButton
A reusable button component with multiple variants:
- `primary` - Default blue gradient
- `secondary` - Pink gradient
- `success` - Blue to cyan gradient
- `danger` - Pink to yellow gradient

### Usage
```vue
<CustomButton 
  text="Click me" 
  variant="primary" 
  @click="handleClick"
/>
```
