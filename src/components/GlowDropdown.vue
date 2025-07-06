<template>
  <div class="glow-dropdown">
    <button class="dropdown-button" @click="toggleDropdown" :class="{ 'active': isOpen }">
      <span>Glow Settings</span>
      <span class="dropdown-arrow" :class="{ 'rotate': isOpen }">▼</span>
    </button>

    <div v-if="isOpen" class="dropdown-content">
      <!-- Glow Color Selection -->
      <div class="glow-section">
        <label class="glow-label">Glow Color</label>
        <div class="glow-color-grid">
          <div
            v-for="color in glowColors"
            :key="color.value"
            class="glow-color-swatch"
            :class="{ 'active': selectedColor === color.value }"
            :style="{ backgroundColor: color.value, boxShadow: `0 0 10px ${color.value}` }"
            @click="selectGlowColor(color.value)"
            :title="color.name"
          ></div>
        </div>
      </div>

      <!-- Glow Opacity Control -->
      <div class="glow-section">
        <label class="glow-label">Opacity: {{ Math.round(glowOpacity * 100) }}%</label>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          :value="glowOpacity"
          @input="$emit('update:glowOpacity', parseFloat($event.target.value))"
          class="glow-slider"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlowDropdown',
  props: {
    selectedColor: {
      type: String,
      default: '#008B8B'
    },
    glowOpacity: {
      type: Number,
      default: 0.4
    }
  },
  data() {
    return {
      isOpen: false,
      glowColors: [
        { value: '#008B8B', name: 'Dark Turquoise' },
        { value: '#2E8B57', name: 'Sea Green' },
        { value: '#4682B4', name: 'Steel Blue' },
        { value: '#483D8B', name: 'Dark Slate Blue' },
        { value: '#8B4513', name: 'Saddle Brown' },
        { value: '#FF20B2', name: 'Magenta' },
        { value: '#9370DB', name: 'Medium Purple' },
        { value: '#32CD32', name: 'Lime Green' },
        { value: '#00CED1', name: 'Dark Turquoise' },
        { value: '#FF6347', name: 'Tomato' },
        { value: '#FFD700', name: 'Gold' },
        { value: '#00BFFF', name: 'Deep Sky Blue' },
        { value: '#FF1493', name: 'Deep Pink' }
      ]
    }
  },
  computed: {
    selectedGlowName() {
      const color = this.glowColors.find(c => c.value === this.selectedColor)
      return color ? color.name : 'Unknown'
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    selectGlowColor(color) {
      this.$emit('update:selectedColor', color)
    },
    closeDropdown() {
      this.isOpen = false
    }
  },
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.closeDropdown()
      }
    })
  }
}
</script>

<style scoped>
.glow-dropdown {
  position: relative;
  width: 100%;
  max-width: 300px;
}

.dropdown-button {
  width: 100%;
  background: linear-gradient(135deg, #333333 0%, #262626 100%);
  color: #e0e0e0;
  border: 2px solid #FF20B2;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px rgba(0,0,0,0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dropdown-button:hover {
  transform: translateY(-2px);
  border-color: #FF20B2;
  box-shadow: 0 5px 15px rgba(255, 20, 178, 0.2);
}

.dropdown-button.active {
  border-color: #FF20B2;
  background: linear-gradient(135deg, #FF20B2 0%, #C71585 100%);
  color: #000;
}

.dropdown-arrow {
  transition: transform 0.3s ease;
  font-size: 0.8rem;
}

.dropdown-arrow.rotate {
  transform: rotate(180deg);
}

.dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(30, 30, 30, 0.95);
  border: 2px solid #FF20B2;
  border-radius: 10px;
  padding: 20px;
  margin-top: 5px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 25px rgba(255, 20, 178, 0.2);
  z-index: 1000;
  animation: dropdownOpen 0.3s ease;
}

@keyframes dropdownOpen {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.glow-section {
  margin-bottom: 20px;
}

.glow-section:last-child {
  margin-bottom: 0;
}

.glow-label {
  display: block;
  color: #e0e0e0;
  font-size: 0.9rem;
  margin-bottom: 12px;
  text-align: center;
  font-weight: 500;
}

.glow-color-grid {
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.glow-color-swatch {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  position: relative;
}

.glow-color-swatch:hover {
  transform: scale(1.1);
  border-color: #fff;
}

.glow-color-swatch.active {
  border-color: #fff;
  transform: scale(1.15);
}

.glow-color-swatch.active::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-weight: bold;
  font-size: 0.9rem;
  text-shadow: 0 0 3px rgba(0,0,0,0.8);
}

.glow-slider {
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(to right, #333, #FF20B2);
  outline: none;
  appearance: none;
  cursor: pointer;
}

.glow-slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #FF20B2;
  border: 2px solid #fff;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  transition: all 0.2s ease;
}

.glow-slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 3px 8px rgba(255, 20, 178, 0.4);
}

.glow-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #FF20B2;
  border: 2px solid #fff;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
}

@media (max-width: 768px) {
  .glow-color-grid {
    gap: 8px;
  }

  .glow-color-swatch {
    width: 35px;
    height: 35px;
  }

  .dropdown-content {
    padding: 15px;
  }
}
</style>
