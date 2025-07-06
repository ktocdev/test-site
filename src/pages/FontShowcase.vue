<template>
  <div class="font-showcase">
    <div class="page-header">
      <h1 class="page-title">Drama Girl Font Showcase 💖</h1>
      <p class="page-subtitle">Chunky & Playful Fonts for Your Teen High School RPG</p>
    </div>

    <div class="color-palette">
      <h2>Color Swatches</h2>
      <p class="color-instruction">Click on any color to apply it to the fonts below!</p>
      <div class="color-grid">
        <ColorSwatch
          v-for="swatch in colorSwatches"
          :key="swatch.value"
          :color-value="swatch.value"
          :color-name="swatch.name"
          :gradient="swatch.gradient"
          :is-active="selectedColor === swatch.value"
          @select="selectColor"
        />
      </div>
    </div>

    <div class="font-samples">
      <div class="font-samples-header">
        <h2>Font Samples</h2>
        <div class="animation-controls">
          <CustomButton 
            :text="animationEnabled ? 'Disable Animation' : 'Enable Animation'"
            :variant="animationEnabled ? 'danger' : 'success'"
            @click="toggleAnimation"
          />
          <CustomButton 
            :text="heartbeatEnabled ? 'Disable Heartbeat' : 'Enable Heartbeat'"
            :variant="heartbeatEnabled ? 'danger' : 'success'"
            @click="toggleHeartbeat"
          />
        </div>
      </div>
      
      <div class="font-sample">
        <h3 class="font-name">Fredoka One (Google Fonts)</h3>
        <div class="logo-sample fredoka-one enhanced-text" 
             :class="{ 'wavy-text': animationEnabled, 'heartbeat': heartbeatEnabled }" 
             :style="{ color: selectedColor, '--glow-color': selectedColor }">
          <span>D</span><span>r</span><span>a</span><span>m</span><span>a</span><span>&nbsp;</span><span>G</span><span>i</span><span>r</span><span>l</span>
        </div>
        <p class="font-description">Chunky, rounded, and super playful - perfect for a teen game!</p>
      </div>

      <div class="font-sample">
        <h3 class="font-name">Righteous (Google Fonts)</h3>
        <div class="logo-sample righteous enhanced-text" 
             :class="{ 'wavy-text': animationEnabled, 'heartbeat': heartbeatEnabled }" 
             :style="{ color: selectedColor, '--glow-color': selectedColor }">
          <span>D</span><span>r</span><span>a</span><span>m</span><span>a</span><span>&nbsp;</span><span>G</span><span>i</span><span>r</span><span>l</span>
        </div>
        <p class="font-description">Bold and energetic with a modern street style vibe.</p>
      </div>

      <div class="font-sample">
        <h3 class="font-name">Comfortaa (Google Fonts)</h3>
        <div class="logo-sample comfortaa enhanced-text" 
             :class="{ 'wavy-text': animationEnabled, 'heartbeat': heartbeatEnabled }" 
             :style="{ color: selectedColor, '--glow-color': selectedColor }">
          <span>D</span><span>r</span><span>a</span><span>m</span><span>a</span><span>&nbsp;</span><span>G</span><span>i</span><span>r</span><span>l</span>
        </div>
        <p class="font-description">Soft, rounded, and friendly - great for approachable design.</p>
      </div>

      <div class="font-sample">
        <h3 class="font-name">Lalezar (Google Fonts)</h3>
        <div class="logo-sample lalezar enhanced-text" 
             :class="{ 'wavy-text': animationEnabled, 'heartbeat': heartbeatEnabled }" 
             :style="{ color: selectedColor, '--glow-color': selectedColor }">
          <span>D</span><span>r</span><span>a</span><span>m</span><span>a</span><span>&nbsp;</span><span>G</span><span>i</span><span>r</span><span>l</span>
        </div>
        <p class="font-description">Thick and impactful with a unique character.</p>
      </div>

      <div class="font-sample">
        <h3 class="font-name">Bungee (Google Fonts)</h3>
        <div class="logo-sample bungee enhanced-text" 
             :class="{ 'wavy-text': animationEnabled, 'heartbeat': heartbeatEnabled }" 
             :style="{ color: selectedColor, '--glow-color': selectedColor }">
          <span>D</span><span>r</span><span>a</span><span>m</span><span>a</span><span>&nbsp;</span><span>G</span><span>i</span><span>r</span><span>l</span>
        </div>
        <p class="font-description">Urban and bold with great visual impact.</p>
      </div>

      <div class="font-sample">
        <h3 class="font-name">Chewy (Google Fonts)</h3>
        <div class="logo-sample chewy enhanced-text" 
             :class="{ 'wavy-text': animationEnabled, 'heartbeat': heartbeatEnabled }" 
             :style="{ color: selectedColor, '--glow-color': selectedColor }">
          <span>D</span><span>r</span><span>a</span><span>m</span><span>a</span><span>&nbsp;</span><span>G</span><span>i</span><span>r</span><span>l</span>
        </div>
        <p class="font-description">Fun and bouncy with a hand-drawn feel.</p>
      </div>

      <div class="font-sample">
        <h3 class="font-name">Kalam (Google Fonts)</h3>
        <div class="logo-sample kalam enhanced-text" 
             :class="{ 'wavy-text': animationEnabled, 'heartbeat': heartbeatEnabled }" 
             :style="{ color: selectedColor, '--glow-color': selectedColor }">
          <span>D</span><span>r</span><span>a</span><span>m</span><span>a</span><span>&nbsp;</span><span>G</span><span>i</span><span>r</span><span>l</span>
        </div>
        <p class="font-description">Handwritten style that's casual and approachable.</p>
      </div>
    </div>

    <div class="action-section">
      <h2>Implementation Notes</h2>
      <div class="notes-card">
        <p>🎨 All fonts shown are from Google Fonts (free to use)</p>
        <p>💖 Color palette ranges from hot pink to deep magenta</p>
        <p>🎮 Perfect for a teen girl high school RPG aesthetic</p>
        <p>✨ Consider adding text effects like shadows or outlines for extra pop!</p>
      </div>
      
      <div class="action-buttons">
        <CustomButton 
          text="Back to Home" 
          variant="primary" 
          @click="goHome"
        />
        
        <CustomButton 
          text="Logo Design Studio" 
          variant="success" 
          @click="goToLogo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from '../components/CustomButton.vue'
import ColorSwatch from '../components/ColorSwatch.vue'

export default {
  name: 'FontShowcase',
  components: {
    CustomButton,
    ColorSwatch
  },
  data() {
    return {
      selectedColor: '#FF1493', // Default to Deep Pink
      animationEnabled: true, // Animation starts enabled
      heartbeatEnabled: false, // Heartbeat animation starts disabled
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
        }
      ]
    }
  },
  methods: {
    selectColor(color) {
      this.selectedColor = color
    },
    toggleAnimation() {
      this.animationEnabled = !this.animationEnabled
    },
    toggleHeartbeat() {
      this.heartbeatEnabled = !this.heartbeatEnabled
    },
    goHome() {
      this.$router.push('/')
    },
    goToLogo() {
      this.$router.push('/logo')
    }
  }
}
</script>

<style scoped>
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Righteous&family=Comfortaa:wght@700&family=Lalezar&family=Bungee&family=Chewy&family=Kalam:wght@700&display=swap');

.font-showcase {
  max-width: 100%;
  background: #1a1a1a;
  min-height: 100vh;
  padding: 2rem;
}

.page-header {
  text-align: center;
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #FF1493 0%, #DA70D6 50%, #BA55D3 100%);
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

.color-palette {
  background: linear-gradient(145deg, #2d2d2d 0%, #1f1f1f 100%);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.4);
  margin-bottom: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.color-palette h2 {
  text-align: center;
  color: #E0E0E0;
  margin-bottom: 1rem;
  font-size: 1.8rem;
}

.color-instruction {
  text-align: center;
  color: #B0B0B0;
  margin-bottom: 2rem;
  font-style: italic;
  font-size: 1.1rem;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.font-samples {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
}

.font-samples-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(145deg, #2d2d2d 0%, #1f1f1f 100%);
  padding: 1.5rem 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.4);
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.animation-controls {
  display: flex;
  gap: 1rem;
}

@media (max-width: 768px) {
  .font-samples-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .animation-controls {
    flex-direction: column;
    width: 100%;
  }
}

.font-samples h2 {
  text-align: center;
  color: #E0E0E0;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.font-sample {
  background: radial-gradient(circle at 30% 20%, 
    rgba(25, 25, 45, 1) 0%, 
    rgba(15, 15, 25, 1) 40%, 
    rgba(5, 15, 10, 1) 70%, 
    rgba(0, 5, 0, 1) 100%);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.font-name {
  color: #E0E0E0;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.logo-sample {
  font-size: 3rem;
  font-weight: 700;
  margin: 1rem 0;
  transition: all 0.3s ease;
}




.wavy-text {
  display: inline-block;
}

/* Enhanced text effects for all logo samples */
.enhanced-text {
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
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

/* Heartbeat Animation */
.heartbeat {
  animation: heartbeat 1.09s ease-in-out infinite;
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

.heartbeat:hover {
  animation-duration: 0.9s;
}

.font-description {
  color: #B0B0B0;
  font-style: italic;
  margin-top: 1rem;
}

/* Font-specific classes */
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

.lalezar {
  font-family: 'Lalezar', cursive;
}

.bungee {
  font-family: 'Bungee', cursive;
}

.chewy {
  font-family: 'Chewy', cursive;
}

.kalam {
  font-family: 'Kalam', cursive;
  font-weight: 700;
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
  color: #E0E0E0;
  margin-bottom: 2rem;
  font-size: 1.8rem;
}

.notes-card {
  background: linear-gradient(135deg, #333333 0%, #262626 100%);
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  text-align: left;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.notes-card p {
  margin-bottom: 0.5rem;
  color: #C0C0C0;
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
  
  .logo-sample {
    font-size: 2rem;
  }
  
  .color-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>
