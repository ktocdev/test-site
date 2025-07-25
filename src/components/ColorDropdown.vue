<template>
  <div class="color-dropdown" :class="{ 'is-open': isOpen }">
    <div class="dropdown-toggle" @click="toggleDropdown">
      <span class="dropdown-label">{{ label }}</span>
      <div class="dropdown-value">
        <div class="color-preview" :style="{ background: selectedGradient }"></div>
      </div>
      <span class="dropdown-arrow" :class="{ 'rotated': isOpen }">▼</span>
    </div>

    <div class="dropdown-menu" v-show="isOpen">
      <div
        v-for="option in options"
        :key="option.value"
        class="dropdown-item"
        :class="{ 'is-active': selectedValue === option.value }"
        @click="selectOption(option)"
      >
        <div class="color-item-preview" :style="{ background: option.gradient }"></div>
        <div class="color-item-info">
          <span class="color-item-name">{{ option.name }}</span>
          <small class="color-item-value">{{ option.value }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorDropdown',
  props: {
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    selectedValue: {
      type: String,
      required: true
    },
    selectedText: {
      type: String,
      required: true
    },
    selectedGradient: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    selectOption(option) {
      this.$emit('select', option.value)
      this.isOpen = false
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
.color-dropdown {
  position: relative;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

.dropdown-toggle {
  background: linear-gradient(135deg, #333333 0%, #262626 100%);
  border: 2px solid transparent;
  border-radius: 10px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  position: relative;
  box-shadow: 0 3px 10px rgba(0,0,0,0.3);
}

.dropdown-toggle:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.4);
  border-color: rgba(255, 20, 178, 0.3);
}

.is-open .dropdown-toggle {
  border-color: #FF20B2;
  background: linear-gradient(135deg, #3d2d3d 0%, #2f1f2f 100%);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 20, 178, 0.2);
}

.dropdown-label {
  color: #B0B0B0;
  font-size: 0.9rem;
  font-style: italic;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.dropdown-value {
  display: flex;
  align-items: center;
  justify-content: center;
}

.color-preview {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.color-name {
  color: #FF20B2;
  font-size: 1.1rem;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.dropdown-arrow {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  color: #FF20B2;
  font-size: 0.8rem;
  transition: transform 0.3s ease;
}

.dropdown-arrow.rotated {
  transform: translateY(-50%) rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: linear-gradient(145deg, #2d2d2d 0%, #1f1f1f 100%);
  border: 2px solid #FF20B2;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.4);
  z-index: 1000;
  margin-top: 0.5rem;
  max-height: 350px;
  overflow-y: auto;
  backdrop-filter: blur(10px);
}

.dropdown-item {
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background: rgba(255, 20, 178, 0.1);
}

.dropdown-item.is-active {
  background: rgba(255, 20, 178, 0.2);
  border-left: 3px solid #FF20B2;
}

.color-item-preview {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  flex-shrink: 0;
}

.color-item-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.color-item-name {
  color: #FF20B2;
  font-size: 1rem;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.color-item-value {
  color: #B0B0B0;
  font-size: 0.8rem;
  font-style: italic;
  font-family: 'Courier New', monospace;
}

/* Scrollbar Styling */
.dropdown-menu::-webkit-scrollbar {
  width: 6px;
}

.dropdown-menu::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.dropdown-menu::-webkit-scrollbar-thumb {
  background: #FF20B2;
  border-radius: 3px;
}

.dropdown-menu::-webkit-scrollbar-thumb:hover {
  background: #C71585;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .color-dropdown {
    max-width: 100%;
  }

  .dropdown-toggle {
    padding: 0.8rem;
  }

  .color-preview {
    width: 35px;
    height: 35px;
  }

  .color-name {
    font-size: 1rem;
  }

  .dropdown-item {
    padding: 0.8rem;
  }

  .color-item-preview {
    width: 30px;
    height: 30px;
  }

  .color-item-name {
    font-size: 0.9rem;
  }
}
</style>
