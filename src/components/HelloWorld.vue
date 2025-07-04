<template>
  <div class="hello-world">
    <div class="hero-section">
      <h1 class="hero-title">Hello World! 🌍</h1>
      <p class="hero-subtitle">Welcome to your Vue Static Site</p>
      
      <div class="button-showcase">
        <h2>Button Component Showcase</h2>
        <div class="button-grid">
          <CustomButton 
            text="Primary Button" 
            variant="primary" 
            @click="showMessage('Primary button clicked!')"
          />
          
          <CustomButton 
            text="Secondary Button" 
            variant="secondary" 
            @click="showMessage('Secondary button clicked!')"
          />
          
          <CustomButton 
            text="Success Button" 
            variant="success" 
            @click="showMessage('Success button clicked!')"
          />
          
          <CustomButton 
            text="Go to Second Page" 
            variant="danger" 
            @click="navigateToSecondPage"
          />
          
          <CustomButton 
            text="Drama Girl Fonts" 
            variant="success" 
            @click="navigateToFonts"
          />
        </div>
      </div>
      
      <div v-if="message" class="message">
        {{ message }}
      </div>
    </div>
    
    <div class="features">
      <h2>Features of this Vue Site</h2>
      <div class="feature-grid">
        <div class="feature-card">
          <h3>⚡ Fast</h3>
          <p>Built with Vite for lightning-fast development and build times</p>
        </div>
        <div class="feature-card">
          <h3>🎨 Modern</h3>
          <p>Beautiful gradients and modern UI components</p>
        </div>
        <div class="feature-card">
          <h3>📱 Responsive</h3>
          <p>Works perfectly on all devices and screen sizes</p>
        </div>
        <div class="feature-card">
          <h3>🧩 Component-Based</h3>
          <p>Reusable components for consistent design</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from './CustomButton.vue'

export default {
  name: 'HelloWorld',
  components: {
    CustomButton
  },
  data() {
    return {
      message: ''
    }
  },
  methods: {
    showMessage(msg) {
      this.message = msg
      setTimeout(() => {
        this.message = ''
      }, 3000)
    },
    navigateToSecondPage() {
      this.$router.push('/second')
    },
    navigateToFonts() {
      this.$router.push('/fonts')
    }
  }
}
</script>

<style scoped>
.hello-world {
  max-width: 100%;
}

.hero-section {
  text-align: center;
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 15px;
  margin-bottom: 3rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.button-showcase {
  margin-top: 2rem;
}

.button-showcase h2 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  justify-items: center;
  margin-bottom: 2rem;
}

.message {
  background: rgba(255,255,255,0.2);
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  font-weight: 600;
  animation: fadeIn 0.3s ease;
}

.features {
  text-align: center;
}

.features h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #667eea;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .button-grid {
    grid-template-columns: 1fr;
  }
}
</style>
