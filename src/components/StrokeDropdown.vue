<template>
  <div class="stroke-dropdown">
    <button class="dropdown-button" @click="toggleDropdown" :class="{ 'active': isOpen, 'disabled': disabled }" :disabled="disabled">
      <span>Text Stroke Settings</span>
      <span class="dropdown-arrow" :class="{ 'rotate': isOpen }">▼</span>
    </button>

    <div v-if="isOpen" class="dropdown-content">
      <!-- Stroke Color Selection -->
      <div class="stroke-section">
        <label class="stroke-label">Stroke Color</label>
        <div class="stroke-color-grid">
          <div
            v-for="strokeColor in strokeColors"
            :key="strokeColor.value"
            class="stroke-color-swatch"
            :class="{ active: selectedColor === strokeColor.value }"
            :style="{ backgroundColor: strokeColor.value, boxShadow: `0 0 10px ${strokeColor.value}` }"
            @click="selectColor(strokeColor.value)"
            :title="strokeColor.name"
          ></div>
        </div>
      </div>

      <!-- Stroke Width Control -->
      <div class="stroke-section">
        <label class="stroke-label">Stroke Width: {{ strokeWidth }}px</label>
        <input
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          :value="strokeWidth"
          @input="updateWidth($event.target.value)"
          class="stroke-slider"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StrokeDropdown',
  props: {
    selectedColor: {
      type: String,
      default: '#00FFFF'
    },
    strokeWidth: {
      type: Number,
      default: 0.1
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOpen: false,
      strokeColors: [
        { value: '#00FFFF', name: 'Cyan' },
        { value: '#00FF7F', name: 'Spring Green' },
        { value: '#FFD700', name: 'Gold' },
        { value: '#FF4500', name: 'Orange Red' },
        { value: '#1E90FF', name: 'Dodger Blue' },
        { value: '#FF1493', name: 'Deep Pink' },
        { value: '#9370DB', name: 'Medium Purple' },
        { value: '#32CD32', name: 'Lime Green' },
        { value: '#00CED1', name: 'Dark Turquoise' },
        { value: '#FF6347', name: 'Tomato' },
        { value: '#ADFF2F', name: 'Green Yellow' },
        { value: '#FF69B4', name: 'Hot Pink' },
        { value: '#00BFFF', name: 'Deep Sky Blue' }
      ]
    }
  },
  methods: {
    toggleDropdown() {
      if (!this.disabled) {
        this.isOpen = !this.isOpen
      }
    },
    selectColor(color) {
      this.$emit('update:selectedColor', color)
    },
    updateWidth(width) {
      this.$emit('update:strokeWidth', parseFloat(width))
    }
  },
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.isOpen = false
      }
    })
  }
}
</script>

<style scoped>
.stroke-dropdown {
  position: relative;
  width: 100%;
  max-width: 300px;
}

.dropdown-button {
  width: 100%;
  background: linear-gradient(135deg, #333333 0%, #262626 100%);
  color: #e0e0e0;
  border: 2px solid #00FFFF;
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
  border-color: #00FFFF;
  box-shadow: 0 5px 15px rgba(0, 255, 255, 0.2);
}

.dropdown-button.active {
  border-color: #00FFFF;
  background: linear-gradient(135deg, #00FFFF 0%, #008B8B 100%);
  color: #000;
}

.dropdown-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
  border-color: #555;
  color: #666;
}

.dropdown-button.disabled:hover {
  transform: none;
  border-color: #555;
  box-shadow: 0 3px 10px rgba(0,0,0,0.3);
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
  border: 2px solid #00FFFF;
  border-radius: 10px;
  padding: 20px;
  margin-top: 5px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 25px rgba(0, 255, 255, 0.2);
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

.stroke-section {
  margin-bottom: 20px;
}

.stroke-section:last-child {
  margin-bottom: 0;
}

.stroke-label {
  display: block;
  color: #e0e0e0;
  font-size: 0.9rem;
  margin-bottom: 12px;
  text-align: center;
  font-weight: 500;
}

.stroke-color-grid {
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.stroke-color-swatch {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  position: relative;
}

.stroke-color-swatch:hover {
  transform: scale(1.1);
  border-color: #fff;
}

.stroke-color-swatch.active {
  border-color: #fff;
  transform: scale(1.15);
}

.stroke-color-swatch.active::after {
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

.stroke-slider {
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(to right, #333, #00FFFF);
  outline: none;
  appearance: none;
  cursor: pointer;
}

.stroke-slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #00FFFF;
  border: 2px solid #fff;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  transition: all 0.2s ease;
}

.stroke-slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 3px 8px rgba(0, 255, 255, 0.4);
}

.stroke-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #00FFFF;
  border: 2px solid #fff;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
}

@media (max-width: 768px) {
  .stroke-color-grid {
    gap: 8px;
  }

  .stroke-color-swatch {
    width: 35px;
    height: 35px;
  }

  .dropdown-content {
    padding: 15px;
  }
}
</style>
