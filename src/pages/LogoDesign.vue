<!--
  LogoDesign.vue - Logo Design Studio Component

  A comprehensive logo design interface that allows users to create stunning text effects
  with multiple fonts, colors, gradients, and special effects in a magenta/violet theme.

  FEATURES:
  - Design Settings: Font selection, color/gradient picker, showcase style selector
  - Special Effects: Stars, lightning, glow, and stroke effects with inline settings
  - Live Preview: Two showcase modes (Starfield and Sparkly) with animated previews
  - Responsive Design: Mobile-friendly layout with flexible controls

  STRUCTURE:
  1. Page Header: Title and subtitle with gradient background
  2. Design Controls: Main control panel with unified settings
     - Design Settings: Font, color, showcase style dropdowns
     - Special Effects: Four effect toggles in a single row with inline settings
  3. Showcase Area: Live preview with two modes (starfield/sparkly)
  4. Action Section: Design tips and navigation buttons

  EFFECTS:
  - Show Stars: Animated starfield background with cool-toned stars
  - Show Lightning: Storm bolt effects positioned around the logo
  - Enable Glow: Customizable glow effect with 13 color options and opacity control
  - Enable Stroke: Text stroke effect with 13 color options and width control

  FONTS: 5 Google Fonts (Fredoka One, Righteous, Comfortaa, Chewy, Kalam)
  COLORS: 8 magenta/violet themed gradients
  SHOWCASE: 2 modes (Starfield Effects, Sparkly Effects)
-->
<template>
  <div class="logo-design">
    <div class="page-header">
      <h1 class="page-title">Logo Design Studio ⭐</h1>
      <p class="page-subtitle">Stunning Effects with Multiple Fonts in Magenta</p>
    </div>

    <div class="design-controls">
      <h2>🎨 Design Studio Controls</h2>

      <!-- Design Settings -->
      <div class="controls-grid">
        <div class="control-group">
          <CustomDropdown
            label="Select Font"
            :options="fontOptions"
            :selectedValue="selectedFont"
            :selectedText="selectedFontName"
            @select="selectFont"
          />
        </div>

        <div class="control-group">
          <ColorDropdown
            label="Select Color"
            :options="colorSwatches"
            :selectedValue="selectedColor"
            :selectedText="selectedColorName"
            :selectedGradient="selectedGradient"
            @select="selectColor"
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

      <!-- Special Effects - Single row of 4 effect toggles with inline settings below -->
      <div class="control-checkboxes">
        <div class="effects-row">
          <!-- Simple toggle effects (no settings) -->
          <CustomCheckbox
            label="Show Stars"
            :checked="starsEnabled"
            @change="starsEnabled = $event"
          />
          <CustomCheckbox
            label="Show Lightning"
            :checked="lightningEnabled"
            @change="lightningEnabled = $event"
          />
          <!-- Complex effects (with inline settings when enabled) -->
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
          <!-- Glow settings dropdown (appears when glow is enabled) -->
          <div v-if="glowEnabled" class="inline-settings">
            <GlowDropdown
              :selectedColor="selectedGlowColor"
              :glowOpacity="glowOpacity"
              @update:selectedColor="selectedGlowColor = $event"
              @update:glowOpacity="glowOpacity = $event"
            />
          </div>
          <!-- Stroke settings dropdown (appears when stroke is enabled) -->
          <div v-if="strokeEnabled" class="inline-settings">
            <StrokeDropdown
              :selectedColor="selectedStrokeColor"
              :strokeWidth="strokeWidth"
              @update:selectedColor="selectedStrokeColor = $event"
              @update:strokeWidth="strokeWidth = $event"
            />
          </div>
        </div>
      </div>

      <!-- Showcase Content - Conditional display based on activeTab (starfield/sparkly) -->
      <!-- Starfield Tab Content -->
      <div v-show="activeTab === 'starfield'" class="tab-content">
        <!-- Gradient Logo with starfield -->
        <div class="logo-sample-card">
          <h3 class="sample-title">Gradient Style with Starfield Background</h3>
          <div class="logo-container">
            <div class="logo-text gradient-logo"
                 :class="[selectedFont, { 'animated': true, 'glow-effect': glowEnabled }]"
                 :style="{ '--selected-gradient': selectedGradient, '--glow-color': selectedGlowColor, '--glow-opacity': glowOpacity, '--stroke-color': selectedStrokeColor, '--stroke-width': strokeEnabled ? strokeWidth + 'px' : '0px' }">
              Drama Girl
            </div>
            <div v-if="starsEnabled" class="stars-decoration starfield">
              <span class="star starfield-star" v-for="n in 18" :key="n" :style="getStarfieldStyle(n)">⭐</span>
            </div>
            <div v-if="lightningEnabled" class="lightning-decoration storm">
              <span class="lightning storm-bolt"
                    v-for="n in 4"
                    :key="n"
                    :style="getStormBoltStyle(n)">⚡</span>
            </div>
          </div>
          <p class="sample-description">Beautiful gradient logo with starfield background and optional effects</p>
        </div>

        <!-- Animated Wavy Logo with starfield -->
        <div class="logo-sample-card">
          <h3 class="sample-title">Animated Wavy Text with Starfield</h3>
          <div class="logo-container">
            <div class="logo-text wavy-text animated-text"
                 :class="[selectedFont, { 'glow-effect': glowEnabled }]"
                 :style="{ color: selectedColor, '--glow-color': selectedGlowColor, '--glow-opacity': glowOpacity, '--stroke-color': selectedStrokeColor, '--stroke-width': strokeEnabled ? strokeWidth + 'px' : '0px' }">
              <span>D</span><span>r</span><span>a</span><span>m</span><span>a</span><span>&nbsp;</span><span>G</span><span>i</span><span>r</span><span>l</span>
            </div>
            <div v-if="starsEnabled" class="stars-decoration starfield">
              <span class="star starfield-star" v-for="n in 18" :key="n" :style="getStarfieldStyle(n)">⭐</span>
            </div>
            <div v-if="lightningEnabled" class="lightning-decoration storm">
              <span class="lightning storm-bolt"
                    v-for="n in 4"
                    :key="n"
                    :style="getStormBoltStyle(n)">⚡</span>
            </div>
          </div>
          <p class="sample-description">Wavy animated text with individual letter movement and starfield background</p>
        </div>
      </div>

      <!-- Sparkly Tab Content -->
      <div v-show="activeTab === 'sparkly'" class="tab-content">
        <!-- Sparkly Text Logo -->
        <div class="logo-sample-card">
          <h3 class="sample-title">Sparkly Gem Text Effect with Gradient</h3>
          <div class="logo-container">
            <div class="logo-text sparkly-text gradient-logo"
                 :class="[selectedFont, { 'animated': true, 'glow-effect': glowEnabled }]"
                 :style="{ '--selected-gradient': selectedGradient, '--glow-color': selectedGlowColor, '--glow-opacity': glowOpacity, '--stroke-color': selectedStrokeColor, '--stroke-width': strokeEnabled ? strokeWidth + 'px' : '0px' }">
              <span>D</span><span>r</span><span>a</span><span>m</span><span>a</span><span>&nbsp;</span><span>G</span><span>i</span><span>r</span><span>l</span>
            </div>
            <div class="sparkles-decoration">
              <span class="sparkle" v-for="n in 12" :key="n" :style="getSparkleStyle(n)">✨</span>
            </div>
          </div>
          <p class="sample-description">Luxurious sparkling text with gem-like shimmer effects and animated gradient</p>
        </div>

        <!-- Sparkly Wavy Text Logo -->
        <div class="logo-sample-card">
          <h3 class="sample-title">Sparkly Wavy Text Effect</h3>
          <div class="logo-container">
            <div class="logo-text sparkly-text wavy-text animated-text"
                 :class="[selectedFont, { 'glow-effect': glowEnabled }]"
                 :style="{ color: selectedColor, '--glow-color': selectedGlowColor, '--glow-opacity': glowOpacity, '--stroke-color': selectedStrokeColor, '--stroke-width': strokeEnabled ? strokeWidth + 'px' : '0px' }">
              <span>D</span><span>r</span><span>a</span><span>m</span><span>a</span><span>&nbsp;</span><span>G</span><span>i</span><span>r</span><span>l</span>
            </div>
            <div class="sparkles-decoration">
              <span class="sparkle" v-for="n in 12" :key="n" :style="getSparkleStyle(n)">✨</span>
            </div>
          </div>
          <p class="sample-description">Combination of wavy letter animation with sparkling effects for maximum drama</p>
        </div>
      </div>
    </div>

    <div class="action-section">
      <h2>Design Tips</h2>
      <div class="tips-card">
        <p>⭐ Stars add magical and dreamy vibes to your logo</p>
        <p>⚡ Lightning effects create energy and excitement</p>
        <p>✨ Mix different effects for unique combinations</p>
        <p>🎨 Magenta color palette creates strong feminine appeal</p>
        <p>💫 Multiple fonts available for different styles and moods</p>
        <p>🎯 Each font brings its own personality to your logo</p>
      </div>

      <div class="action-buttons">
        <CustomButton
          text="Back to Font Showcase"
          variant="primary"
          @click="goToFontShowcase"
        />

        <CustomButton
          text="Home"
          variant="secondary"
          @click="goHome"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from '../components/CustomButton.vue'
import CustomDropdown from '../components/CustomDropdown.vue'
import ColorDropdown from '../components/ColorDropdown.vue'
import CustomCheckbox from '../components/CustomCheckbox.vue'
import GlowDropdown from '../components/GlowDropdown.vue'
import StrokeDropdown from '../components/StrokeDropdown.vue'

export default {
  name: 'LogoDesign',
  components: {
    CustomButton,
    CustomDropdown,
    ColorDropdown,
    CustomCheckbox,
    GlowDropdown,
    StrokeDropdown
  },
  data() {
    return {
      starsEnabled: true,
      lightningEnabled: true,
      glowEnabled: false,
      strokeEnabled: true,
      selectedFont: 'fredoka-one',
      selectedColor: '#FF20B2', // Default to magenta
      activeTab: 'starfield', // Default to starfield tab
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
      selectedGlowColor: '#008B8B', // Default to dark turquoise for sophisticated contrast
      glowOpacity: 0.4, // Default glow opacity (40%)
      selectedStrokeColor: '#00FFFF', // Default to cyan for vibrant contrast
      strokeWidth: 0.1 // Default stroke width in pixels
    }
  },
  computed: {
    selectedGradient() {
      const swatch = this.colorSwatches.find(s => s.value === this.selectedColor)
      return swatch ? swatch.gradient : this.colorSwatches[4].gradient // Default to magenta
    },
    selectedFontName() {
      const font = this.fontOptions.find(f => f.value === this.selectedFont)
      return font ? font.name : this.fontOptions[0].name
    },
    selectedColorName() {
      const color = this.colorSwatches.find(c => c.value === this.selectedColor)
      return color ? color.name : this.colorSwatches[4].name
    },
    selectedShowcaseName() {
      const showcase = this.showcaseOptions.find(s => s.value === this.activeTab)
      return showcase ? showcase.name : this.showcaseOptions[0].name
    }
  },
  methods: {
    selectFont(fontValue) {
      this.selectedFont = fontValue
    },
    selectColor(color) {
      this.selectedColor = color
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
    getStormBoltStyle(index) {
      // Creates symmetrical lightning bolt arrangement around the logo: \ Drama Girl /
      // 4 bolts positioned at corners: top-left, top-right, bottom-left, bottom-right
      const positions = [
        { top: '15%', left: '20%' },    // Top-left
        { top: '15%', right: '20%' },   // Top-right
        { top: '75%', left: '30%' },    // Bottom-left
        { top: '75%', right: '30%' }    // Bottom-right
      ]
      return positions[index - 1] || { top: '50%', left: '50%' }
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
    },
    goToFontShowcase() {
      this.$router.push('/fonts')
    },
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Righteous&family=Comfortaa:wght@700&family=Chewy&family=Kalam:wght@700&display=swap');

.logo-design {
  max-width: 100%;
  background-color: #1a1a1a;
  min-height: 100vh;
  padding: 2rem;
}

.page-header {
  text-align: center;
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #FF20B2 0%, #C71585 50%, #8B0A50 100%);
  color: white;
  border-radius: 15px;
  margin-bottom: 3rem;
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

.design-controls {
  background: linear-gradient(145deg, #2d2d2d 0%, #1f1f1f 100%);
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.4);
  margin-bottom: 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.design-controls h2 {
  color: #e0e0e0;
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.controls-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  align-items: start;
  margin-bottom: 2rem;
}

.section-title {
  color: #FF20B2;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
  text-align: center;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
  position: relative;
}

.section-title:first-of-type {
  margin-top: 0;
}

.section-title:not(:first-of-type)::before {
  content: '';
  position: absolute;
  top: -0.75rem;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 32, 178, 0.3), transparent);
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.control-group h4 {
  color: #B0B0B0;
  font-size: 0.9rem;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.control-checkboxes {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
}

/* Effects Layout - Single row of 4 checkboxes with settings row below */
.effects-row {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
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
  padding-bottom: 1rem; /* Uniform spacing below effect dropdowns */
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


/* Showcase Section within main controls */
.tab-content {
  background: rgba(255, 255, 255, 0.015);
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.03);
}

.logo-sample-card {
  background: radial-gradient(circle at 30% 20%,
    rgba(25, 25, 45, 1) 0%,
    rgba(15, 15, 25, 1) 40%,
    rgba(5, 15, 10, 1) 70%,
    rgba(0, 5, 0, 1) 100%);
  padding: 3rem 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  margin-bottom: 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.sample-title {
  color: #b0b0b0;
  margin-bottom: 2rem;
  font-size: 1.3rem;
}

.logo-container {
  position: relative;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
}

.logo-text {
  font-size: 5.5rem;
  font-weight: 700;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  text-shadow:
    2px 2px 4px rgba(0,0,0,0.8),
    0 0 20px rgba(255, 20, 178, 0.3),
    0 0 40px rgba(255, 20, 178, 0.1);
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

/* Logo Styles - Gradient background with CSS custom properties for dynamic effects */
.gradient-logo {
  background: var(--selected-gradient);
  background-size: 600% 600%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: none;
  position: relative;
  -webkit-text-stroke: var(--stroke-width, 1px) var(--stroke-color, #00FFFF);
}

/* Animated text style - Solid color for compatibility with wavy animation */
.animated-text {
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
  -webkit-text-stroke: var(--stroke-width, 1px) var(--stroke-color, #00FFFF);
}

/* Gradient Animation - 6 second infinite animation */
.animated.gradient-logo {
  animation: gradientShift 6s ease-in-out infinite;
}

/* Glow Effect - Uses modern CSS color-mix for dynamic opacity control */
.glow-effect {
  filter:
    drop-shadow(0 0 12px color-mix(in srgb, var(--glow-color, #FF20B2) calc(var(--glow-opacity, 0.7) * 100%), transparent))
    drop-shadow(0 0 24px color-mix(in srgb, var(--glow-color, #FF20B2) calc(var(--glow-opacity, 0.7) * 60%), transparent))
    drop-shadow(0 0 36px color-mix(in srgb, var(--glow-color, #FF20B2) calc(var(--glow-opacity, 0.7) * 40%), transparent));
}

.gradient-logo.glow-effect {
  -webkit-text-stroke: var(--stroke-width, 1px) var(--stroke-color, #00FFFF);
}

/* Animations - Optimized keyframes for smooth performance */
@keyframes gradientShift {
  0%, 100% { background-position: 0% 30%; }
  25% { background-position: 70% 0%; }
  50% { background-position: 100% 70%; }
  75% { background-position: 30% 100%; }
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

/* Wavy Text Animation from FontShowcase */
.wavy-text {
  display: inline-block;
}

.wavy-text span {
  display: inline-block;
  transition: all 0.3s ease;
  animation: wave 4s ease-in-out infinite;
}

.wavy-text span:nth-child(1) {
  animation-delay: 0s;
  transform: rotate(-2deg) translateY(-3px);
}
.wavy-text span:nth-child(2) {
  animation-delay: 0.2s;
  transform: rotate(1deg) translateY(2px);
}
.wavy-text span:nth-child(3) {
  animation-delay: 0.4s;
  transform: rotate(-1deg) translateY(-2px);
}
.wavy-text span:nth-child(4) {
  animation-delay: 0.6s;
  transform: rotate(2deg) translateY(4px);
}
.wavy-text span:nth-child(5) {
  animation-delay: 0.8s;
  transform: rotate(-1.5deg) translateY(-1px);
}
.wavy-text span:nth-child(6) {
  animation-delay: 1s;
  transform: rotate(0deg) translateY(0px);
}
.wavy-text span:nth-child(7) {
  animation-delay: 1.2s;
  transform: rotate(-2.5deg) translateY(-4px);
}
.wavy-text span:nth-child(8) {
  animation-delay: 1.4s;
  transform: rotate(1.5deg) translateY(3px);
}
.wavy-text span:nth-child(9) {
  animation-delay: 1.6s;
  transform: rotate(-1deg) translateY(-2px);
}
.wavy-text span:nth-child(10) {
  animation-delay: 1.8s;
  transform: rotate(2deg) translateY(1px);
}

@keyframes wave {
  0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
  25% { transform: translateY(-2px) rotate(1deg) scale(1.02); }
  50% { transform: translateY(2px) rotate(-0.5deg) scale(0.98); }
  75% { transform: translateY(-1px) rotate(0.5deg) scale(1.01); }
}

.wavy-text:hover span {
  animation-duration: 1.2s;
  transform: scale(1.1);
}

/* Sparkly Text Effect */
.sparkly-text {
  position: relative;
  overflow: visible;
}

.sparkles-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 5;
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

/* Lightning Decoration */
.lightning-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 10;
}

.lightning {
  position: absolute;
  font-size: 2rem;
  color: #FFD700;
  filter: drop-shadow(0 0 15px #FFD700);
  animation: lightningFlash 4s ease-in-out infinite;
}

.storm .storm-bolt {
  color: #00BFFF;
  filter: drop-shadow(0 0 20px #00BFFF);
}

@keyframes lightningFlash {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  2% { opacity: 1; transform: scale(1.3); }
  4% { opacity: 0.1; transform: scale(0.9); }
  6% { opacity: 1; transform: scale(1.2); }
  8% { opacity: 0.2; transform: scale(1); }
}

.sample-description {
  color: #b0b0b0;
  font-style: italic;
  margin-top: 2rem;
  font-size: 1.1rem;
}

.action-section {
  background: linear-gradient(145deg, #2d2d2d 0%, #1f1f1f 100%);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.4);
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.action-section h2 {
  color: #e0e0e0;
  margin-bottom: 2rem;
  font-size: 1.8rem;
}

.tips-card {
  background: linear-gradient(135deg, #333333 0%, #262626 100%);
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  text-align: left;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.tips-card p {
  margin-bottom: 0.5rem;
  color: #c0c0c0;
  font-size: 1rem;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .logo-text {
    font-size: 3rem;
  }

  .controls-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .design-controls {
    padding: 1rem;
  }

  .section-title {
    font-size: 1.1rem;
  }

  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>
