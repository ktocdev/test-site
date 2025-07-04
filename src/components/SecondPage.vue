<template>
  <div class="second-page">
    <div class="page-header">
      <h1 class="page-title">Welcome to the Second Page! 🚀</h1>
      <p class="page-subtitle">You successfully navigated here using the custom button component</p>
    </div>
    
    <div class="content-section">
      <div class="info-card">
        <h2>🎉 Navigation Success!</h2>
        <p>This demonstrates how Vue Router works with our custom button component.</p>
        <p>You can navigate between pages seamlessly in this single-page application.</p>
      </div>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number">1</div>
          <div class="stat-label">Custom Button Component</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">2</div>
          <div class="stat-label">Pages Created</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">∞</div>
          <div class="stat-label">Possibilities</div>
        </div>
      </div>
      
      <div class="action-section">
        <h2>Try More Actions</h2>
        <div class="action-buttons">
          <CustomButton 
            text="Show Alert" 
            variant="success" 
            @click="showAlert"
          />
          
          <CustomButton 
            text="Toggle Message" 
            variant="secondary" 
            @click="toggleMessage"
          />
          
          <CustomButton 
            text="Back to Home" 
            variant="primary" 
            @click="goHome"
          />
        </div>
        
        <div v-if="showToggleMessage" class="toggle-message">
          <p>🎈 This message was toggled using our custom button!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from './CustomButton.vue'

export default {
  name: 'SecondPage',
  components: {
    CustomButton
  },
  data() {
    return {
      showToggleMessage: false
    }
  },
  methods: {
    showAlert() {
      alert('Hello from the second page! 👋')
    },
    toggleMessage() {
      this.showToggleMessage = !this.showToggleMessage
    },
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.second-page {
  max-width: 100%;
}

.page-header {
  text-align: center;
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border-radius: 15px;
  margin-bottom: 3rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.page-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.content-section {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.info-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  text-align: center;
}

.info-card h2 {
  color: #f5576c;
  margin-bottom: 1rem;
  font-size: 1.8rem;
}

.info-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  color: #f5576c;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #666;
  font-weight: 600;
}

.action-section {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  text-align: center;
}

.action-section h2 {
  color: #333;
  margin-bottom: 2rem;
  font-size: 1.8rem;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.toggle-message {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
