<template>
  <div class="home">
    <div class="hero-section">
      <h1 class="hero-title">Drama Girl 💃</h1>
      <p class="hero-subtitle">Design Inspiration Toolkit</p>
      <p class="hero-description">
        A curated collection of visual tools and resources to inspire the look and feel 
        of your Drama Girl game development journey
      </p>
      
      <div class="quick-nav">
        <CustomButton 
          text="Explore Fonts" 
          variant="primary" 
          @click="navigateToFonts"
        />
      </div>
    </div>
    
    <div class="tools-section">
      <h2>Inspiration Tools</h2>
      <div class="tools-grid">
        <div class="tool-card">
          <h3>🎨 Color Palettes</h3>
          <p>Explore dramatic color schemes perfect for creating mood and atmosphere in your game</p>
          <div class="tool-preview">
            <div class="color-dot" style="background: #FF1493;"></div>
            <div class="color-dot" style="background: #C71585;"></div>
            <div class="color-dot" style="background: #8B0A50;"></div>
            <div class="color-dot" style="background: #4B0082;"></div>
          </div>
        </div>
        
        <div class="tool-card">
          <h3>📝 Typography</h3>
          <p>Discover fonts that capture the dramatic flair and personality of your game characters</p>
          <div class="tool-preview">
            <span class="font-sample">Drama Girl</span>
          </div>
        </div>
        
        <div class="tool-card">
          <h3>🎭 UI Components</h3>
          <p>Interactive elements and buttons designed with theatrical drama in mind</p>
          <div class="tool-preview">
            <div class="sample-button">Sample Button</div>
          </div>
        </div>
        
        <div class="tool-card">
          <h3>✨ Visual Effects</h3>
          <p>Gradients, shadows, and animations to bring your game interface to life</p>
          <div class="tool-preview">
            <div class="effect-sample"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from '../components/CustomButton.vue'

export default {
  name: 'Home',
  components: {
    CustomButton
  },
  methods: {
    navigateToFonts() {
      this.$router.push('/fonts')
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 100%;
  background-color: #1a1a1a;
}

.hero-section {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #FF1493 0%, #C71585 50%, #8B0A50 100%);
  color: white;
  border-radius: 15px;
  margin-bottom: 3rem;
  box-shadow: 0 10px 30px rgba(255, 20, 147, 0.3);
}

.hero-title {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.hero-subtitle {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  opacity: 0.9;
  font-weight: 500;
}

.hero-description {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.8;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.quick-nav {
  margin-top: 2rem;
}

.tools-section {
  text-align: center;
  background-color: #1a1a1a;
  padding: 2rem 1rem;
}

.tools-section h2 {
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #e0e0e0;
  background: linear-gradient(45deg, #FF1493, #C71585);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.tool-card {
  background: linear-gradient(145deg, #2d2d2d 0%, #1f1f1f 100%);
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.4);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 20, 147, 0.2);
  text-align: left;
}

.tool-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(255, 20, 147, 0.3);
  border-color: rgba(255, 20, 147, 0.5);
}

.tool-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #FF1493;
  text-align: center;
}

.tool-card p {
  color: #b0b0b0;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.tool-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.color-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.font-sample {
  font-size: 1.2rem;
  font-weight: bold;
  color: #FF1493;
  font-style: italic;
}

.sample-button {
  background: linear-gradient(45deg, #FF1493, #C71585);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(255, 20, 147, 0.3);
}

.effect-sample {
  width: 60px;
  height: 20px;
  background: linear-gradient(90deg, #FF1493, #C71585, #8B0A50);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(255, 20, 147, 0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-section {
    padding: 3rem 1rem;
  }
  
  .tools-grid {
    grid-template-columns: 1fr;
  }
  
  .tool-card {
    padding: 2rem;
  }
}
</style>
