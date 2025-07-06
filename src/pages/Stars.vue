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

          <div class="control-group">
            <CustomDropdown
              label="Select Showcase Style"
              :options="showcaseOptions"
              :selectedValue="activeTab"
              :selectedText="selectedShowcaseName"
              @select="activeTab = $event"
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
            <CustomCheckbox
              label="Space Travel Mode"
              :checked="spaceTravel"
              @change="spaceTravel = $event"
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
          
          <!-- Randomize Logo Button -->
          <div class="randomize-section">
            <button class="randomize-button" @click="randomizeLogo">
              🎲 Randomize Logo Style
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Canvas Container -->
    <div class="canvas-container">
      <canvas 
        ref="starsCanvas"
        class="stars-canvas"
      ></canvas>
      
      <!-- Starfield Decoration (when starfield tab is active) -->
      <div v-if="activeTab === 'starfield'" class="stars-decoration starfield">
        <span class="star starfield-star" v-for="n in 18" :key="n" :style="getStarfieldStyle(n)">⭐</span>
      </div>
      
      <!-- Sparkles Decoration (when sparkly tab is active) -->
      <div v-if="activeTab === 'sparkly'" class="sparkles-decoration">
        <span class="sparkle" v-for="n in 12" :key="n" :style="getSparkleStyle(n)">✨</span>
      </div>
      
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
      activeTab: 'starfield', // Default to starfield tab
      spaceTravel: false, // Flying through space animation
      showcaseOptions: [
        {
          name: 'Starfield Effects',
          value: 'starfield',
          description: 'Magical starfield background'
        },
        {
          name: 'Sparkly Effects',
          value: 'sparkly',
          description: 'Luxurious sparkles & gems'
        }
      ],
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
        // Original magenta/violet theme colors
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
        // Vibrant cyans and teals (complementary to magentas)
        {
          value: '#00FFFF',
          name: 'Electric Cyan',
          gradient: 'linear-gradient(to bottom, #00FFFF, #00BFFF)'
        },
        {
          value: '#00CED1',
          name: 'Dark Turquoise',
          gradient: 'linear-gradient(to bottom, #40E0D0, #008B8B)'
        },
        {
          value: '#20B2AA',
          name: 'Light Sea Green',
          gradient: 'linear-gradient(to bottom, #7FFFD4, #20B2AA)'
        },
        {
          value: '#008080',
          name: 'Teal',
          gradient: 'linear-gradient(to bottom, #20B2AA, #006666)'
        },
        // Neon blues and purples
        {
          value: '#0080FF',
          name: 'Electric Blue',
          gradient: 'linear-gradient(to bottom, #00BFFF, #0066CC)'
        },
        {
          value: '#4169E1',
          name: 'Royal Blue',
          gradient: 'linear-gradient(to bottom, #6495ED, #191970)'
        },
        {
          value: '#8A2BE2',
          name: 'Blue Violet',
          gradient: 'linear-gradient(to bottom, #9932CC, #4B0082)'
        },
        {
          value: '#9400D3',
          name: 'Dark Violet',
          gradient: 'linear-gradient(to bottom, #BA55D3, #6A0DAD)'
        },
        // Neon greens and limes
        {
          value: '#00FF00',
          name: 'Lime Green',
          gradient: 'linear-gradient(to bottom, #32CD32, #228B22)'
        },
        {
          value: '#ADFF2F',
          name: 'Green Yellow',
          gradient: 'linear-gradient(to bottom, #ADFF2F, #9ACD32)'
        },
        {
          value: '#39FF14',
          name: 'Neon Green',
          gradient: 'linear-gradient(to bottom, #39FF14, #32CD32)'
        },
        {
          value: '#00FF7F',
          name: 'Spring Green',
          gradient: 'linear-gradient(to bottom, #00FF7F, #00FA9A)'
        },
        // Vibrant oranges and reds
        {
          value: '#FF4500',
          name: 'Orange Red',
          gradient: 'linear-gradient(to bottom, #FF6347, #DC143C)'
        },
        {
          value: '#FF6600',
          name: 'Blazing Orange',
          gradient: 'linear-gradient(to bottom, #FF8C00, #FF4500)'
        },
        {
          value: '#FF0000',
          name: 'Pure Red',
          gradient: 'linear-gradient(to bottom, #FF4444, #CC0000)'
        },
        {
          value: '#DC143C',
          name: 'Crimson',
          gradient: 'linear-gradient(to bottom, #FF1493, #B22222)'
        },
        // Electric yellows and golds
        {
          value: '#FFFF00',
          name: 'Electric Yellow',
          gradient: 'linear-gradient(to bottom, #FFFF44, #FFD700)'
        },
        {
          value: '#FFD700',
          name: 'Gold',
          gradient: 'linear-gradient(to bottom, #FFF700, #DAA520)'
        },
        {
          value: '#FFA500',
          name: 'Orange',
          gradient: 'linear-gradient(to bottom, #FFB347, #FF8C00)'
        },
        // Holographic/iridescent colors
        {
          value: '#FF00FF',
          name: 'Fuchsia',
          gradient: 'linear-gradient(to bottom, #FF44FF, #DD00DD)'
        },
        {
          value: '#7F00FF',
          name: 'Violet',
          gradient: 'linear-gradient(to bottom, #9932CC, #4B0082)'
        },
        {
          value: '#4FD0E4',
          name: 'Sky Blue',
          gradient: 'linear-gradient(to bottom, #87CEEB, #00BFFF)'
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
    selectedShowcaseName() {
      const showcase = this.showcaseOptions.find(s => s.value === this.activeTab)
      return showcase ? showcase.name : this.showcaseOptions[0].name
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
  watch: {
    spaceTravel(newValue) {
      // Regenerate stars when space travel mode is toggled
      this.generateStars()
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
      
      // Dark forest green to midnight navy gradient with fixed intensity
      const forestGreen = 'rgba(0, 20, 10, 0.4)'
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
      
      // Generate fewer stars in space travel mode for better performance and realism
      const starCount = this.spaceTravel ? 100 : 200
      for (let i = 0; i < starCount; i++) {
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
        twinkleSpeed: (Math.random() * 0.02 + 0.01) * 3, // Fixed twinkle speed
        glowSize: Math.random() * 2 + 1, // Glow radius
        depth: Math.random(), // For parallax effect (0 = far, 1 = close)
        // Space travel properties
        originalX: 0, // Will be set after creation
        originalY: 0, // Will be set after creation
        z: Math.random() * 1000 + 100, // Distance from viewer (100-1100)
        speed: Math.random() * 2 + 0.5 // Movement speed for space travel
      }
      
      // Set original positions for space travel reset
      star.originalX = star.x
      star.originalY = star.y
      
      this.stars.push(star)
    },
    
    
    drawStars() {
      const canvas = this.$refs.starsCanvas
      const ctx = canvas.getContext('2d')
      
      // Clear canvas and redraw background
      this.updateBackground()
      
      // Draw each star
      this.stars.forEach(star => {
        // Space travel animation logic
        if (this.spaceTravel) {
          // Move star closer (decrease z)
          star.z -= star.speed
          
          // Reset star position when it gets too close
          if (star.z <= 1) {
            star.z = Math.random() * 500 + 500 // Reset to far distance
            star.originalX = Math.random() * this.canvasWidth
            star.originalY = Math.random() * this.canvasHeight
          }
          
          // Calculate perspective projection
          const centerX = this.canvasWidth / 2
          const centerY = this.canvasHeight / 2
          const perspective = 500 // Lower values = more dramatic perspective
          
          // Project 3D position to 2D screen coordinates
          star.x = centerX + (star.originalX - centerX) * (perspective / star.z)
          star.y = centerY + (star.originalY - centerY) * (perspective / star.z)
          
          // Calculate size based on distance (closer = bigger) - reduced for space travel
          const baseSizeMultiplier = Math.max(0.05, perspective / star.z)
          star.size = (star.size * 0.99) + (baseSizeMultiplier * 1.2 * 0.01) // Smooth size interpolation with smaller multiplier
        }
        
        // Skip drawing if star is outside canvas bounds
        if (star.x < -50 || star.x > this.canvasWidth + 50 || 
            star.y < -50 || star.y > this.canvasHeight + 50) {
          return
        }
        
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
        
        // Add sparkle effect for larger stars with reduced frequency in space travel mode
        if (star.size > 2) {
          // In space travel mode, only show sparkles occasionally (1-2 times per second)
          const sparkleFrequency = this.spaceTravel ? 0.03 : 1.0 // 3% chance vs always
          const shouldShowSparkle = this.spaceTravel ? Math.random() < sparkleFrequency : true
          
          if (shouldShowSparkle) {
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
    
    handleResize() {
      this.initCanvas()
      this.generateStars()
    },
    
    getWavyStyle(index) {
      return {
        animationDelay: `${index * 0.1}s`
      }
    },

    randomizeLogo() {
      // Randomly select font
      const randomFont = this.fontOptions[Math.floor(Math.random() * this.fontOptions.length)]
      this.logoFont = randomFont.value
      
      // Randomly select color
      const randomColor = this.colorSwatches[Math.floor(Math.random() * this.colorSwatches.length)]
      this.logoColor = randomColor.value
      
      // Randomly select animation
      const randomAnimation = this.animationOptions[Math.floor(Math.random() * this.animationOptions.length)]
      this.logoAnimation = randomAnimation.value
      
      // Randomly select showcase style
      const randomShowcase = this.showcaseOptions[Math.floor(Math.random() * this.showcaseOptions.length)]
      this.activeTab = randomShowcase.value
      
      // Randomly enable/disable glow (75% chance to enable)
      this.glowEnabled = Math.random() > 0.25
      
      // Randomize glow settings (even if disabled, set values for potential future enabling)
      const glowColors = [
        '#008B8B', '#FF1493', '#00FFFF', '#FFD700', '#00FF00', '#9400D3', '#FF4500',
        '#E0E6FF', '#FF69B4', '#20B2AA', '#ADFF2F', '#FF6600', '#8A2BE2', '#DC143C',
        '#4169E1', '#00CED1', '#FF20B2', '#39FF14', '#C71585', '#0080FF'
      ]
      this.selectedGlowColor = glowColors[Math.floor(Math.random() * glowColors.length)]
      this.glowOpacity = Math.random() * 0.7 + 0.1 // Between 0.1 and 0.8
      
      // Randomly enable/disable stroke (85% chance to enable)
      this.strokeEnabled = Math.random() > 0.15
      
      // Randomize stroke settings (even if disabled, set values for potential future enabling)
      const strokeColors = [
        '#00FFFF', '#FFFFFF', '#FFD700', '#FF1493', '#00FF00', '#9400D3',
        '#FF4500', '#8A2BE2', '#20B2AA', '#FF69B4', '#4169E1', '#ADFF2F',
        '#DC143C', '#00CED1', '#FF6600', '#0080FF', '#C71585', '#39FF14'
      ]
      this.selectedStrokeColor = strokeColors[Math.floor(Math.random() * strokeColors.length)]
      this.strokeWidth = Math.random() * 0.18 + 0.02 // Between 0.02 and 0.2
      
      // Randomly enable/disable space travel (25% chance to enable)
      this.spaceTravel = Math.random() > 0.75
    },

    getStarfieldStyle(index) {
      // Creates natural starfield pattern with 18 stars using cool-toned colors
      // Stars are positioned to avoid central logo area with varying sizes and opacity
      const positions = [
        // Top area stars
        { top: '8%', left: '15%', color: '#F0F8FF', size: '0.6rem', opacity: 0.7 },    // Alice blue, small
        { top: '12%', left: '35%', color: '#FFFACD', size: '0.4rem', opacity: 0.5 },   // Lemon chiffon, tiny
        { top: '18%', left: '65%', color: '#F5F5DC', size: '0.8rem', opacity: 0.8 },   // Beige, small-med
        { top: '15%', left: '85%', color: '#FFFFF0', size: '0.5rem', opacity: 0.6 },   // Ivory, small

        // Upper-middle area stars
        { top: '25%', left: '10%', color: '#F8F8FF', size: '0.7rem', opacity: 0.9 },   // Ghost white, small
        { top: '30%', left: '88%', color: '#FFF8DC', size: '0.4rem', opacity: 0.4 },   // Cornsilk, tiny
        { top: '35%', left: '5%', color: '#FFFAF0', size: '0.6rem', opacity: 0.7 },    // Floral white, small

        // Middle area stars (avoiding logo space)
        { top: '45%', left: '8%', color: '#F0FFFF', size: '0.5rem', opacity: 0.6 },    // Azure, small
        { top: '50%', left: '90%', color: '#F5F5F5', size: '0.8rem', opacity: 0.8 },   // White smoke, small-med
        { top: '40%', left: '12%', color: '#FFFAFA', size: '0.4rem', opacity: 0.5 },   // Snow, tiny

        // Lower-middle area stars
        { top: '65%', left: '7%', color: '#F0F0F0', size: '0.7rem', opacity: 0.9 },    // Gainsboro, small
        { top: '68%', left: '85%', color: '#FFF5EE', size: '0.6rem', opacity: 0.7 },   // Seashell, small
        { top: '72%', left: '92%', color: '#FFFFF0', size: '0.4rem', opacity: 0.6 },   // Ivory, tiny

        // Bottom area stars
        { top: '80%', left: '20%', color: '#F8F8FF', size: '0.5rem', opacity: 0.8 },   // Ghost white, small
        { top: '85%', left: '45%', color: '#FFFACD', size: '0.7rem', opacity: 0.7 },   // Lemon chiffon, small
        { top: '88%', left: '70%', color: '#F0F8FF', size: '0.6rem', opacity: 0.6 },   // Alice blue, small
        { top: '82%', left: '88%', color: '#F5F5DC', size: '0.4rem', opacity: 0.5 },   // Beige, tiny
        { top: '90%', left: '15%', color: '#FFFFF0', size: '0.8rem', opacity: 0.9 }    // Ivory, small-med
      ]
      const pos = positions[index - 1] || { top: '50%', left: '50%', color: '#F8F8FF', size: '0.5rem', opacity: 0.7 }
      return {
        top: pos.top,
        left: pos.left,
        color: pos.color,
        fontSize: pos.size,
        opacity: pos.opacity
      }
    },

    getSparkleStyle(index) {
      // Creates 12 sparkle positions around and on the text for luxurious gemstone effect
      // Each sparkle has unique color, position, and animation delay for dynamic shimmer
      const positions = [
        // Sparkles around the text
        { top: '10%', left: '20%', delay: '0s', color: '#FFD700' },      // Gold
        { top: '15%', left: '75%', delay: '0.8s', color: '#E6E6FA' },    // Lavender
        { top: '25%', left: '10%', delay: '1.2s', color: '#FFFACD' },    // Lemon chiffon
        { top: '35%', left: '85%', delay: '0.4s', color: '#F0F8FF' },    // Alice blue
        { top: '45%', left: '15%', delay: '1.6s', color: '#FFE4E1' },    // Misty rose
        { top: '55%', left: '80%', delay: '2.0s', color: '#E0FFFF' },    // Light cyan
        { top: '65%', left: '25%', delay: '0.6s', color: '#FAFAD2' },    // Light goldenrod
        { top: '75%', left: '70%', delay: '1.4s', color: '#F5FFFA' },    // Mint cream
        { top: '85%', left: '45%', delay: '1.8s', color: '#FFF0F5' },    // Lavender blush
        // Closer sparkles on text
        { top: '40%', left: '40%', delay: '0.2s', color: '#FFFFFF' },     // White
        { top: '50%', left: '55%', delay: '1.0s', color: '#F8F8FF' },     // Ghost white
        { top: '60%', left: '35%', delay: '1.3s', color: '#FFFAFA' }      // Snow
      ]
      const pos = positions[index - 1] || { top: '50%', left: '50%', delay: '0s', color: '#FFFFFF' }
      return {
        top: pos.top,
        left: pos.left,
        '--sparkle-delay': pos.delay,
        color: pos.color
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
}  .effects-row {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
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

.randomize-section {
  margin-top: 1rem;
  text-align: center;
}

.randomize-button {
  background: linear-gradient(135deg, #FF20B2 0%, #C71585 50%, #8B0A50 100%);
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 32, 178, 0.3);
  display: flex;
  align-items: center;
  gap: 0.8rem;
  justify-content: center;
  margin: 0 auto;
  min-width: 200px;
}

.randomize-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 32, 178, 0.4);
  background: linear-gradient(135deg, #FF44C4 0%, #D91A96 50%, #A00C60 100%);
}

.randomize-button:active {
  transform: translateY(0);
  box-shadow: 0 3px 10px rgba(255, 32, 178, 0.3);
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

/* Stars Decoration - Positioned absolutely to create depth */
.stars-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.star {
  position: absolute;
  font-size: 1rem; /* Base size, overridden by getStarfieldStyle() */
  filter: drop-shadow(0 0 8px currentColor);
  z-index: 1; /* Behind the logo text for depth */
}

.starfield .starfield-star {
  animation: starfieldTwinkle 3s ease-in-out infinite;
  filter: drop-shadow(0 0 4px currentColor);
  z-index: 1; /* Behind the logo text for depth */
  transform-origin: center;
}

@keyframes starfieldTwinkle {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  25% { opacity: 0.8; transform: scale(1.1); }
  50% { opacity: 0.6; transform: scale(1.05); }
  75% { opacity: 0.9; transform: scale(1.15); }
}

/* Sparkles Decoration */
.sparkles-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1; /* Behind the logo text for depth */
}

.sparkle {
  position: absolute;
  font-size: 0.8rem;
  animation: sparkleShimmer 2.5s ease-in-out infinite;
  animation-delay: var(--sparkle-delay, 0s);
  filter: drop-shadow(0 0 6px currentColor);
  transform-origin: center;
}

@keyframes sparkleShimmer {
  0%, 100% { opacity: 0.3; transform: scale(0.8) rotate(0deg); }
  10% { opacity: 0.9; transform: scale(1.2) rotate(45deg); }
  20% { opacity: 0.4; transform: scale(0.9) rotate(90deg); }
  30% { opacity: 1; transform: scale(1.3) rotate(135deg); }
  40% { opacity: 0.2; transform: scale(0.7) rotate(180deg); }
  50% { opacity: 0.8; transform: scale(1.1) rotate(225deg); }
  60% { opacity: 0.5; transform: scale(1.0) rotate(270deg); }
  70% { opacity: 0.9; transform: scale(1.25) rotate(315deg); }
  80% { opacity: 0.3; transform: scale(0.85) rotate(360deg); }
}

.stars-canvas {
  width: 100%;
  height: 100%;
  cursor: default;
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


@media (max-width: 1024px) {
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
  
  .drama-logo {
    font-size: 2rem;
  }
}
</style>
