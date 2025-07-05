<template>
  <div class="logo-design">
    <div class="page-header">
      <h1 class="page-title">Logo Design Studio ⭐</h1>
      <p class="page-subtitle">Stunning Effects with Multiple Fonts in Magenta</p>
    </div>

    <div class="effects-controls">
      <h2>Effect Controls</h2>
      <div class="control-buttons">
        <CustomButton 
          :text="starsEnabled ? 'Hide Stars' : 'Show Stars'"
          :variant="starsEnabled ? 'danger' : 'success'"
          @click="toggleStars"
        />
        <CustomButton 
          :text="lightningEnabled ? 'Hide Lightning' : 'Show Lightning'"
          :variant="lightningEnabled ? 'danger' : 'success'"
          @click="toggleLightning"
        />
        <CustomButton 
          :text="glowEnabled ? 'Disable Glow' : 'Enable Glow'"
          :variant="glowEnabled ? 'danger' : 'success'"
          @click="toggleGlow"
        />
        <CustomButton 
          :text="animationEnabled ? 'Disable Animation' : 'Enable Animation'"
          :variant="animationEnabled ? 'danger' : 'success'"
          @click="toggleAnimation"
        />
      </div>
    </div>

    <div class="font-controls">
      <h2>Font Family</h2>
      <div class="font-options">
        <div 
          v-for="font in fontOptions" 
          :key="font.value"
          class="font-option"
          :class="{ active: selectedFont === font.value }"
          @click="selectFont(font.value)"
        >
          <span class="font-preview" :class="font.value">{{ font.name }}</span>
          <small class="font-label">{{ font.description }}</small>
        </div>
      </div>
    </div>

    <div class="logo-samples">
      <h2>Gradient Logo Showcase</h2>
      
      <!-- Gradient Logo with starfield -->
      <div class="logo-sample-card">
        <h3 class="sample-title">Gradient Style with Starfield Background</h3>
        <div class="logo-container">
          <div class="logo-text gradient-logo" 
               :class="[selectedFont, { 'animated': animationEnabled, 'glow-effect': glowEnabled }]">
            Drama Girl
          </div>
          <div v-if="starsEnabled" class="stars-decoration starfield">
            <span class="star starfield-star" v-for="n in 18" :key="n" :style="getStarfieldStyle(n)">{{ getStarEmoji(n) }}</span>
          </div>
          <div v-if="lightningEnabled" class="lightning-decoration storm">
            <span class="lightning storm-bolt" v-for="n in 4" :key="n" :style="getStormBoltStyle(n)">⚡</span>
          </div>
        </div>
        <p class="sample-description">Beautiful gradient logo with starfield background and optional effects</p>
      </div>

      <!-- Animated Wavy Logo with starfield -->
      <div class="logo-sample-card">
        <h3 class="sample-title">Animated Wavy Text with Starfield</h3>
        <div class="logo-container">
          <div class="logo-text wavy-text animated-text" 
               :class="[selectedFont, { 'glow-effect': glowEnabled }]">
            <span>D</span><span>r</span><span>a</span><span>m</span><span>a</span><span>&nbsp;</span><span>G</span><span>i</span><span>r</span><span>l</span>
          </div>
          <div v-if="starsEnabled" class="stars-decoration starfield">
            <span class="star starfield-star" v-for="n in 18" :key="n" :style="getStarfieldStyle(n)">{{ getStarEmoji(n) }}</span>
          </div>
          <div v-if="lightningEnabled" class="lightning-decoration storm">
            <span class="lightning storm-bolt" v-for="n in 4" :key="n" :style="getStormBoltStyle(n)">⚡</span>
          </div>
        </div>
        <p class="sample-description">Wavy animated text with individual letter movement and starfield background</p>
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
import CustomButton from './CustomButton.vue'

export default {
  name: 'LogoDesign',
  components: {
    CustomButton
  },
  data() {
    return {
      starsEnabled: true,
      lightningEnabled: true,
      glowEnabled: false,
      animationEnabled: true,
      selectedFont: 'fredoka-one',
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
      ]
    }
  },
  methods: {
    toggleStars() {
      this.starsEnabled = !this.starsEnabled
    },
    toggleLightning() {
      this.lightningEnabled = !this.lightningEnabled
    },
    toggleGlow() {
      this.glowEnabled = !this.glowEnabled
    },
    toggleAnimation() {
      this.animationEnabled = !this.animationEnabled
    },
    selectFont(fontValue) {
      this.selectedFont = fontValue
    },
    getStarEmoji(index) {
      return '⭐' // Only use classic yellow star
    },
    getStarfieldStyle(index) {
      // Create a natural starfield pattern behind the logo with cooler tones
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
      const positions = [
        { top: '10%', left: '30%' },
        { top: '25%', right: '35%' },
        { top: '75%', left: '25%' },
        { top: '85%', right: '30%' }
      ]
      return positions[index - 1] || { top: '50%', left: '50%' }
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

.effects-controls {
  background: linear-gradient(145deg, #2d2d2d 0%, #1f1f1f 100%);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.4);
  margin-bottom: 3rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.effects-controls h2 {
  color: #e0e0e0;
  margin-bottom: 2rem;
  font-size: 1.8rem;
}

.control-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.font-controls {
  background: linear-gradient(145deg, #2d2d2d 0%, #1f1f1f 100%);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.4);
  margin-bottom: 3rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.font-controls h2 {
  color: #e0e0e0;
  margin-bottom: 2rem;
  font-size: 1.8rem;
}

.font-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.font-option {
  background: linear-gradient(135deg, #333333 0%, #262626 100%);
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.font-option:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  border-color: rgba(255, 20, 178, 0.3);
}

.font-option.active {
  border-color: #FF20B2;
  background: linear-gradient(135deg, #3d2d3d 0%, #2f1f2f 100%);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 20, 178, 0.2);
}

.font-preview {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #FF20B2;
  margin-bottom: 0.5rem;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.font-label {
  color: #B0B0B0;
  font-size: 0.9rem;
  font-style: italic;
}

.logo-samples {
  margin-bottom: 3rem;
}

.logo-samples h2 {
  text-align: center;
  color: #e0e0e0;
  font-size: 1.8rem;
  margin-bottom: 2rem;
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
  font-size: 4rem;
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

/* Logo Styles - keeping only gradient */
.gradient-logo {
  background: linear-gradient(45deg, #FF20B2, #C71585, #DA70D6, #FF69B4);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: none;
}

/* Animated text style - solid color for compatibility with animation */
.animated-text {
  color: #FF20B2; /* Solid magenta color */
  text-shadow: 
    2px 2px 4px rgba(0,0,0,0.8),
    0 0 20px rgba(255, 20, 178, 0.3),
    0 0 40px rgba(255, 20, 178, 0.1);
}

/* Animation Effects - keeping only gradient */
.animated.gradient-logo {
  animation: gradientShift 4s ease-in-out infinite;
}

.glow-effect {
  filter: drop-shadow(0 0 20px #FF20B2) drop-shadow(0 0 40px #FF20B2);
}

/* Animations - keeping only gradient shift */
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Stars Decoration */
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
  font-size: 1rem; /* Base size, will be overridden by inline styles */
  animation: starTwinkle 2s ease-in-out infinite;
  filter: drop-shadow(0 0 8px currentColor);
  z-index: 3; /* Allow overlapping with text */
}

.starfield .starfield-star {
  animation: starfieldTwinkle 3s ease-in-out infinite;
  filter: drop-shadow(0 0 4px currentColor);
  z-index: 1; /* Behind the logo text */
  transform-origin: center;
}

@keyframes starTwinkle {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

@keyframes starfieldTwinkle {
  0%, 100% { 
    opacity: 0.4; 
    transform: scale(1); 
  }
  25% { 
    opacity: 0.8; 
    transform: scale(1.1); 
  }
  50% { 
    opacity: 0.6; 
    transform: scale(1.05); 
  }
  75% { 
    opacity: 0.9; 
    transform: scale(1.15); 
  }
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
  0%, 100% { 
    transform: translateY(0px) rotate(0deg) scale(1);
  }
  25% { 
    transform: translateY(-2px) rotate(1deg) scale(1.02);
  }
  50% { 
    transform: translateY(2px) rotate(-0.5deg) scale(0.98);
  }
  75% { 
    transform: translateY(-1px) rotate(0.5deg) scale(1.01);
  }
}

.wavy-text:hover span {
  animation-duration: 1.2s;
  transform: scale(1.1);
}

/* Lightning Decoration */
.lightning-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.lightning {
  position: absolute;
  font-size: 2rem;
  color: #FFD700;
  filter: drop-shadow(0 0 15px #FFD700);
  animation: lightningFlash 1.5s ease-in-out infinite;
}

.storm .storm-bolt {
  animation: stormStrike 2s ease-in-out infinite;
  color: #00BFFF;
  filter: drop-shadow(0 0 20px #00BFFF);
}

@keyframes lightningFlash {
  0%, 90%, 100% { opacity: 0.7; transform: scale(1); }
  5%, 85% { opacity: 1; transform: scale(1.2); }
}

@keyframes stormStrike {
  0%, 95%, 100% { opacity: 0; transform: scale(0.8); }
  5%, 90% { opacity: 1; transform: scale(1.4); }
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
    font-size: 2.5rem;
  }
  
  .control-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .font-options {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }
  
  .font-option {
    padding: 1rem;
  }
  
  .font-preview {
    font-size: 1.2rem;
  }
  
  .star, .lightning {
    font-size: 1.2rem;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>
