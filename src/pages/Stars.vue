<template>
  <div class="stars-page">
    <!-- Page Header -->
    <div class="page-header">
      <h1 class="page-title">Starry Night Sky</h1>
      <p class="page-subtitle">Experience the beauty of a midnight sky filled with twinkling stars</p>
    </div>

    <!-- Logo Control Panel -->
    <div class="logo-controls">
      <div class="logo-panel-header">
        <h3 class="panel-title">Drama Girl Logo Studio</h3>
        <label class="show-logo-control">
          <input 
            type="checkbox" 
            v-model="showLogo" 
            class="logo-checkbox"
          />
          <span class="checkbox-label">Show Logo</span>
        </label>
      </div>
      
      <div class="logo-settings" v-show="showLogo">
        <!-- Design Settings Grid -->
        <div class="controls-grid">
          <div class="control-group">
            <CustomDropdown
              label="Select Font"
              :options="fontOptions"
              :selectedValue="logoFont"
              :selectedText="selectedFontName"
              @select="logoFont = $event"
            />
          </div>

          <div class="control-group">
            <ColorDropdown
              label="Select Color"
              :options="colorSwatches"
              :selectedValue="logoColor"
              :selectedText="selectedColorName"
              :selectedGradient="selectedGradient"
              @select="logoColor = $event"
            />
          </div>

          <div class="control-group">
            <CustomDropdown
              label="Animation Style"
              :options="animationOptions"
              :selectedValue="logoAnimation"
              :selectedText="selectedAnimationName"
              @select="logoAnimation = $event"
            />
          </div>
        </div>

        <!-- Special Effects Row -->
        <div class="control-checkboxes">
          <div class="effects-row">
            <CustomCheckbox
              label="Enable Glow"
              :checked="glowEnabled"
              @change="glowEnabled = $event"
            />
            <CustomCheckbox
              label="Enable Stroke"
              :checked="strokeEnabled"
              @change="strokeEnabled = $event"
            />
          </div>
          
          <div class="effect-settings-row">
            <!-- Glow settings dropdown -->
            <div class="inline-settings" :class="{ 'disabled-settings': !glowEnabled }">
              <GlowDropdown
                :selectedColor="selectedGlowColor"
                :glowOpacity="glowOpacity"
                :disabled="!glowEnabled"
                @update:selectedColor="selectedGlowColor = $event"
                @update:glowOpacity="glowOpacity = $event"
              />
            </div>
            <!-- Stroke settings dropdown -->
            <div class="inline-settings" :class="{ 'disabled-settings': !strokeEnabled }">
              <StrokeDropdown
                :selectedColor="selectedStrokeColor"
                :strokeWidth="strokeWidth"
                :disabled="!strokeEnabled"
                @update:selectedColor="selectedStrokeColor = $event"
                @update:strokeWidth="strokeWidth = $event"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Canvas Container -->
    <div class="canvas-container">
      <canvas 
        ref="starsCanvas"
        class="stars-canvas"
        @click="addStar"
      ></canvas>
      
      <!-- Drama Girl Logo Overlay -->
      <div v-show="showLogo" class="logo-overlay">
        <div 
          :class="['drama-logo', logoFont, logoAnimation, { 'glow-effect': glowEnabled }]"
          :style="logoStyles"
        >
          <span v-if="logoAnimation === 'wavy'" class="wavy-text">
            <span v-for="(letter, index) in logoText" :key="index" :style="getWavyStyle(index)">
              {{ letter === ' ' ? '\u00A0' : letter }}
            </span>
          </span>
          <span v-else>{{ logoText }}</span>
        </div>
      </div>
      
      <div class="canvas-overlay">
        <div class="star-info">
          <span class="star-count">{{ stars.length }} stars visible</span>
          <span class="instructions">Click anywhere to add a new star</span>
        </div>
      </div>
    </div>

    <!-- Controls Panel -->
    <div class="controls-panel">
      <div class="control-section">
        <h3 class="control-title">Sky Settings</h3>
        <div class="control-group">
          <label class="control-label">Star Density</label>
          <input 
            type="range" 
            v-model="starDensity" 
            min="50" 
            max="500" 
            @input="regenerateStars"
            class="slider"
          />
          <span class="value-display">{{ starDensity }}</span>
        </div>
        <div class="control-group">
          <label class="control-label">Twinkle Speed</label>
          <input 
            type="range" 
            v-model="twinkleSpeed" 
            min="1" 
            max="10" 
            class="slider"
          />
          <span class="value-display">{{ twinkleSpeed }}x</span>
        </div>
        <div class="control-group">
          <label class="control-label">Gradient Intensity</label>
          <input 
            type="range" 
            v-model="gradientIntensity" 
            min="0" 
            max="1" 
            step="0.1" 
            @input="updateBackground"
            class="slider"
          />
          <span class="value-display">{{ Math.round(gradientIntensity * 100) }}%</span>
        </div>
      </div>
      
      <div class="control-section">
        <h3 class="control-title">Actions</h3>
        <div class="action-buttons">
          <button class="action-button regenerate" @click="regenerateStars">
            ✨ Regenerate Stars
          </button>
          <button class="action-button clear" @click="clearStars">
            🌑 Clear Sky
          </button>
          <button class="action-button save" @click="saveCanvas">
            💾 Save Sky
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomDropdown from '../components/CustomDropdown.vue'
import ColorDropdown from '../components/ColorDropdown.vue'
import CustomCheckbox from '../components/CustomCheckbox.vue'
import GlowDropdown from '../components/GlowDropdown.vue'
import StrokeDropdown from '../components/StrokeDropdown.vue'

export default {
  name: 'Stars',
  components: {
    CustomDropdown,
    ColorDropdown,
    CustomCheckbox,
    GlowDropdown,
    StrokeDropdown
  },
  data() {
    return {
      stars: [],
      animationId: null,
      canvasWidth: 0,
      canvasHeight: 0,
      starDensity: 200,
      twinkleSpeed: 3,
      gradientIntensity: 0.4,
      starColors: [
        '#FFFFFF',    // Pure white
        '#F8F8FF',    // Ghost white
        '#F0F8FF',    // Alice blue
        '#E6F3FF',    // Very light blue
        '#FFFACD',    // Lemon chiffon
        '#FFF8DC',    // Cornsilk
        '#F5F5DC',    // Beige
        '#E0E6FF',    // Lavender
        '#E6E6FA'     // Lavender
      ],
      // Logo settings
      showLogo: true,
      logoText: 'Drama Girl',
      logoFont: 'fredoka-one',
      logoColor: '#FF20B2',
      logoAnimation: 'gradient',
      glowEnabled: false,
      strokeEnabled: true,
      selectedGlowColor: '#008B8B',
      glowOpacity: 0.4,
      selectedStrokeColor: '#00FFFF',
      strokeWidth: 0.1,
      fontOptions: [
        {
          name: 'Fredoka One',
          value: 'fredoka-one',
          description: 'Chunky & playful'
        },
        {
          name: 'Righteous',
          value: 'righteous',
          description: 'Bold & energetic'
        },
        {
          name: 'Comfortaa',
          value: 'comfortaa',
          description: 'Soft & friendly'
        },
        {
          name: 'Chewy',
          value: 'chewy',
          description: 'Fun & bouncy'
        },
        {
          name: 'Kalam',
          value: 'kalam',
          description: 'Handwritten style'
        }
      ],
      colorSwatches: [
        {
          value: '#FF1493',
          name: 'Deep Pink',
          gradient: 'linear-gradient(to bottom, #FF69B4, #C71585)'
        },
        {
          value: '#FF69B4',
          name: 'Hot Pink',
          gradient: 'linear-gradient(to bottom, #FFB6C1, #FF1493)'
        },
        {
          value: '#FF20B2',
          name: 'Magenta',
          gradient: 'linear-gradient(to bottom, #FF69B4, #B8005F)'
        },
        {
          value: '#C71585',
          name: 'Medium Violet Red',
          gradient: 'linear-gradient(to bottom, #DA70D6, #8B0A50)'
        },
        {
          value: '#DA70D6',
          name: 'Orchid',
          gradient: 'linear-gradient(to bottom, #DDA0DD, #9932CC)'
        },
        {
          value: '#BA55D3',
          name: 'Medium Orchid',
          gradient: 'linear-gradient(to bottom, #D8BFD8, #8A2BE2)'
        },
        {
          value: '#00FFFF',
          name: 'Electric Cyan',
          gradient: 'linear-gradient(to bottom, #00FFFF, #00BFFF)'
        },
        {
          value: '#00CED1',
          name: 'Dark Turquoise',
          gradient: 'linear-gradient(to bottom, #40E0D0, #008B8B)'
        }
      ],
      animationOptions: [
        {
          name: 'Slow Gradient Fade',
          value: 'gradient',
          description: 'Smooth gradient background animation'
        },
        {
          name: 'Wavy Text',
          value: 'wavy',
          description: 'Individual letter wave animation with hover effect'
        },
        {
          name: 'Heart Beat',
          value: 'heartbeat',
          description: 'Rhythmic pulsing animation'
        },
        {
          name: 'Glow Pulse',
          value: 'glow-pulse',
          description: 'Pulsing glow effect'
        },
        {
          name: 'Static',
          value: 'static',
          description: 'No animation'
        }
      ]
    }
  },
  computed: {
    selectedGradient() {
      const swatch = this.colorSwatches.find(s => s.value === this.logoColor)
      return swatch ? swatch.gradient : this.colorSwatches[2].gradient // Default to magenta
    },
    selectedFontName() {
      const font = this.fontOptions.find(f => f.value === this.logoFont)
      return font ? font.name : this.fontOptions[0].name
    },
    selectedColorName() {
      const color = this.colorSwatches.find(c => c.value === this.logoColor)
      return color ? color.name : this.colorSwatches[2].name
    },
    selectedAnimationName() {
      const animation = this.animationOptions.find(a => a.value === this.logoAnimation)
      return animation ? animation.name : this.animationOptions[0].name
    },
    logoStyles() {
      return {
        '--selected-gradient': this.selectedGradient,
        '--logo-color': this.logoColor,
        '--glow-color': this.selectedGlowColor,
        '--glow-opacity': this.glowOpacity,
        '--stroke-color': this.selectedStrokeColor,
        '--stroke-width': this.strokeEnabled ? this.strokeWidth + 'px' : '0px'
      }
    }
  },
  mounted() {
    // Set browser tab title
    document.title = 'Stars - Drama Girl Design Inspiration'
    
    this.initCanvas()
    this.generateStars()
    this.startAnimation()
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    initCanvas() {
      const canvas = this.$refs.starsCanvas
      const container = canvas.parentElement
      
      // Set canvas size to fill the container
      this.canvasWidth = container.clientWidth
      this.canvasHeight = container.clientHeight
      
      canvas.width = this.canvasWidth
      canvas.height = this.canvasHeight
      
      this.updateBackground()
    },
    
    updateBackground() {
      const canvas = this.$refs.starsCanvas
      const ctx = canvas.getContext('2d')
      
      // Create radial gradient from center
      const centerX = this.canvasWidth / 2
      const centerY = this.canvasHeight / 2
      const radius = Math.max(this.canvasWidth, this.canvasHeight) * 0.8
      
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius
      )
      
      // Dark forest green to midnight navy gradient
      const forestGreen = `rgba(0, 20, 10, ${this.gradientIntensity})`
      const midnightNavy = '#0a0a1a'
      
      gradient.addColorStop(0, forestGreen)
      gradient.addColorStop(0.6, '#0f0f1f')
      gradient.addColorStop(1, midnightNavy)
      
      // Fill background
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
    },
    
    generateStars() {
      this.stars = []
      
      for (let i = 0; i < this.starDensity; i++) {
        this.createRandomStar()
      }
    },
    
    createRandomStar() {
      const star = {
        x: Math.random() * this.canvasWidth,
        y: Math.random() * this.canvasHeight,
        size: Math.random() * 3 + 0.5, // Size between 0.5 and 3.5
        brightness: Math.random() * 0.8 + 0.2, // Brightness between 0.2 and 1
        color: this.starColors[Math.floor(Math.random() * this.starColors.length)],
        twinklePhase: Math.random() * Math.PI * 2, // Random starting phase
        twinkleSpeed: (Math.random() * 0.02 + 0.01) * this.twinkleSpeed,
        glowSize: Math.random() * 2 + 1, // Glow radius
        depth: Math.random() // For parallax effect (0 = far, 1 = close)
      }
      
      this.stars.push(star)
    },
    
    addStar(event) {
      const canvas = this.$refs.starsCanvas
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      
      const newStar = {
        x: x,
        y: y,
        size: Math.random() * 2 + 1,
        brightness: Math.random() * 0.6 + 0.4,
        color: this.starColors[Math.floor(Math.random() * this.starColors.length)],
        twinklePhase: 0,
        twinkleSpeed: (Math.random() * 0.02 + 0.01) * this.twinkleSpeed,
        glowSize: Math.random() * 2 + 1,
        depth: Math.random()
      }
      
      this.stars.push(newStar)
    },
    
    drawStars() {
      const canvas = this.$refs.starsCanvas
      const ctx = canvas.getContext('2d')
      
      // Clear canvas and redraw background
      this.updateBackground()
      
      // Draw each star
      this.stars.forEach(star => {
        // Calculate twinkling effect
        const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7
        const currentBrightness = star.brightness * twinkle
        const currentSize = star.size * (0.8 + twinkle * 0.4)
        
        // Create star glow
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.glowSize * currentSize
        )
        
        // Parse color for alpha manipulation
        const alpha = currentBrightness * (0.3 + star.depth * 0.7)
        gradient.addColorStop(0, this.addAlpha(star.color, alpha))
        gradient.addColorStop(0.5, this.addAlpha(star.color, alpha * 0.3))
        gradient.addColorStop(1, 'transparent')
        
        // Draw glow
        ctx.save()
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.glowSize * currentSize, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        
        // Draw star center (brighter point)
        ctx.save()
        ctx.fillStyle = this.addAlpha(star.color, currentBrightness)
        ctx.beginPath()
        ctx.arc(star.x, star.y, currentSize * 0.3, 0, Math.PI * 2)
        ctx.fill()
        
        // Add sparkle effect for larger stars
        if (star.size > 2) {
          ctx.strokeStyle = this.addAlpha('#FFFFFF', currentBrightness * 0.6)
          ctx.lineWidth = 0.5
          const sparkleSize = currentSize * 1.5
          
          // Vertical sparkle line
          ctx.beginPath()
          ctx.moveTo(star.x, star.y - sparkleSize)
          ctx.lineTo(star.x, star.y + sparkleSize)
          ctx.stroke()
          
          // Horizontal sparkle line
          ctx.beginPath()
          ctx.moveTo(star.x - sparkleSize, star.y)
          ctx.lineTo(star.x + sparkleSize, star.y)
          ctx.stroke()
        }
        
        ctx.restore()
        
        // Update twinkle phase
        star.twinklePhase += star.twinkleSpeed
      })
    },
    
    addAlpha(color, alpha) {
      // Convert hex color to rgba with alpha
      const r = parseInt(color.substr(1, 2), 16)
      const g = parseInt(color.substr(3, 2), 16)
      const b = parseInt(color.substr(5, 2), 16)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    },
    
    startAnimation() {
      const animate = () => {
        this.drawStars()
        this.animationId = requestAnimationFrame(animate)
      }
      animate()
    },
    
    regenerateStars() {
      this.generateStars()
    },
    
    clearStars() {
      this.stars = []
    },
    
    saveCanvas() {
      const canvas = this.$refs.starsCanvas
      const link = document.createElement('a')
      link.download = 'starry-night-sky.png'
      link.href = canvas.toDataURL()
      link.click()
    },
    
    handleResize() {
      this.initCanvas()
      this.regenerateStars()
    },
    
    getWavyStyle(index) {
      return {
        animationDelay: `${index * 0.1}s`
      }
    }
  }
}
</script>

<style scoped>
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Righteous&family=Comfortaa:wght@700&family=Chewy&family=Kalam:wght@700&display=swap');

.stars-page {
  max-width: 100%;
  background-color: #0a0a1a;
  min-height: 100vh;
  padding: 2rem;
}

.page-header {
  text-align: center;
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #FF20B2 0%, #C71585 50%, #8B0A50 100%);
  color: white;
  border-radius: 15px;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.page-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Logo Controls Panel */
.logo-controls {
  background: linear-gradient(145deg, #2d2d2d 0%, #1f1f1f 100%);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.panel-title {
  color: #e0e0e0;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.show-logo-control {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  user-select: none;
}

.logo-checkbox {
  width: 18px;
  height: 18px;
  accent-color: #FF20B2;
  cursor: pointer;
}

.checkbox-label {
  color: #B0B0B0;
  font-size: 0.95rem;
  font-weight: 500;
}

.logo-settings {
  transition: all 0.3s ease;
}

.controls-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  align-items: start;
  margin-bottom: 2rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.control-checkboxes {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
}

.effects-row {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  min-width: 320px;
}

.effect-settings-row {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
}

.inline-settings {
  min-width: 250px;
  animation: slideDown 0.3s ease-out;
  padding-bottom: 1rem;
  transition: opacity 0.3s ease;
}

.inline-settings.disabled-settings {
  opacity: 0.4;
  pointer-events: none;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.canvas-container {
  position: relative;
  width: 100%;
  height: 600px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  border: 2px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
  background: #0a0a1a;
}

/* Logo Overlay */
.logo-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  pointer-events: none;
}

.logo-overlay .drama-logo.wavy {
  pointer-events: auto;
}

/* Drama Girl Logo Styles */
.drama-logo {
  font-size: 5.5rem;
  font-weight: 700;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
  -webkit-text-stroke: var(--stroke-width, 1px) var(--stroke-color, #00FFFF);
  transition: all 0.3s ease;
  color: var(--logo-color, #FF20B2);
}

/* Logo with gradient background */
.drama-logo.gradient {
  background: var(--selected-gradient);
  background-size: 600% 600%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: none;
  position: relative;
  animation: gradientShift 12s ease-in-out infinite;
}

/* Non-gradient animations should use the selected color */
.drama-logo:not(.gradient) {
  color: var(--logo-color, #FF20B2);
}

/* Glow Effect */
.drama-logo.glow-effect {
  filter: drop-shadow(0 0 20px color-mix(in srgb, var(--glow-color, #FFFFFF) calc(var(--glow-opacity, 0.6) * 100%), transparent));
}

/* Font Classes */
.fredoka-one {
  font-family: 'Fredoka One', cursive;
}

.righteous {
  font-family: 'Righteous', cursive;
}

.comfortaa {
  font-family: 'Comfortaa', cursive;
  font-weight: 700;
}

.chewy {
  font-family: 'Chewy', cursive;
}

.kalam {
  font-family: 'Kalam', cursive;
  font-weight: 700;
}

/* Animation Classes */
.drama-logo.gradient {
  background-size: 400% 400%;
  animation: gradientShift 12s ease-in-out infinite;
}

.wavy-text span {
  display: inline-block;
  animation: wave 2s ease-in-out infinite;
  transform-origin: center bottom;
}

.wavy-text:hover span {
  animation-duration: 1.2s;
  transform: scale(1.1);
}

.drama-logo.glow-pulse {
  animation: glowPulse 2s ease-in-out infinite;
}

.drama-logo.heartbeat {
  animation: heartbeat 1.8s ease-in-out infinite;
}

.drama-logo.heartbeat:hover {
  animation-duration: 1.5s;
}

.drama-logo.static {
  animation: none;
}

/* Logo Animations */
@keyframes gradientShift {
  0%, 100% { background-position: 0% 30%; }
  25% { background-position: 70% 0%; }
  50% { background-position: 100% 70%; }
  75% { background-position: 30% 100%; }
}

@keyframes wave {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-8px) rotate(1deg); }
  50% { transform: translateY(0px) rotate(0deg); }
  75% { transform: translateY(-4px) rotate(-0.5deg); }
}

@keyframes glowPulse {
  0%, 100% { 
    filter: drop-shadow(0 0 20px color-mix(in srgb, var(--glow-color, #FFFFFF) calc(var(--glow-opacity, 0.6) * 100%), transparent));
  }
  50% { 
    filter: drop-shadow(0 0 40px color-mix(in srgb, var(--glow-color, #FFFFFF) calc(var(--glow-opacity, 0.6) * 150%), transparent));
  }
}

@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.04);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.03);
  }
  70% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}

.stars-canvas {
  width: 100%;
  height: 100%;
  cursor: crosshair;
  display: block;
}

.canvas-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.3));
  padding: 1rem;
  pointer-events: none;
}

.star-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.star-count {
  font-weight: 600;
  color: #e0e0e0;
}

.instructions {
  font-style: italic;
  color: #B0B0B0;
}

.controls-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

.control-section {
  background: linear-gradient(145deg, #2d2d2d 0%, #1f1f1f 100%);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.control-title {
  color: #e0e0e0;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 0.5rem;
}

.control-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.control-label {
  color: #B0B0B0;
  font-size: 0.9rem;
  font-weight: 500;
}

.slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #2a2a3e;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FF20B2 0%, #C71585 100%);
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0,0,0,0.3);
}

.slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FF20B2 0%, #C71585 100%);
  cursor: pointer;
  border: none;
  box-shadow: 0 3px 6px rgba(0,0,0,0.3);
}

.value-display {
  color: #e0e0e0;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.action-button {
  background: linear-gradient(135deg, #2a2a3e 0%, #1a1a2e 100%);
  border: 2px solid transparent;
  border-radius: 10px;
  padding: 1rem;
  color: #e0e0e0;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  justify-content: center;
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0,0,0,0.3);
}

.action-button.regenerate {
  border-color: #4169E1;
}

.action-button.regenerate:hover {
  background: linear-gradient(135deg, #4169E1 0%, #6495ED 100%);
  color: white;
  box-shadow: 0 6px 15px rgba(65, 105, 225, 0.3);
}

.action-button.clear {
  border-color: #2F4F4F;
}

.action-button.clear:hover {
  background: linear-gradient(135deg, #2F4F4F 0%, #708090 100%);
  color: white;
  box-shadow: 0 6px 15px rgba(47, 79, 79, 0.3);
}

.action-button.save {
  border-color: #20B2AA;
}

.action-button.save:hover {
  background: linear-gradient(135deg, #20B2AA 0%, #48D1CC 100%);
  color: white;
  box-shadow: 0 6px 15px rgba(32, 178, 170, 0.3);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .controls-panel {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .canvas-container {
    height: 500px;
  }
  
  .controls-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .effects-row {
    flex-direction: row;
    gap: 1rem;
  }
  
  .drama-logo {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .stars-page {
    padding: 1rem;
  }
  
  .page-header {
    padding: 2rem 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .canvas-container {
    height: 400px;
  }
  
  .star-info {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
  
  .action-buttons {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .action-button {
    flex: 1;
    min-width: 150px;
  }
  
  .controls-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .logo-panel-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .effects-row {
    flex-direction: column;
    gap: 1rem;
  }
  
  .effect-settings-row {
    flex-direction: column;
  }
  
  .drama-logo {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .canvas-container {
    height: 300px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .drama-logo {
    font-size: 2rem;
  }
}
</style>
