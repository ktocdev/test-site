<template>
  <div 
    class="color-swatch" 
    :class="{ active: isActive }"
    :style="{ background: gradient }" 
    @click="$emit('select', colorValue)"
  >
    <span>{{ colorValue }}</span>
    <small>{{ colorName }}</small>
  </div>
</template>

<script>
export default {
  name: 'ColorSwatch',
  props: {
    colorValue: {
      type: String,
      required: true
    },
    colorName: {
      type: String,
      required: true
    },
    gradient: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  emits: ['select']
}
</script>

<style scoped>
.color-swatch {
  height: 100px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 3px solid transparent;
}

.color-swatch:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

.color-swatch.active {
  border: 3px solid #333;
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(0,0,0,0.4);
}

.color-swatch span {
  font-family: monospace;
  font-size: 0.9rem;
}

.color-swatch small {
  font-size: 0.8rem;
  margin-top: 0.25rem;
  opacity: 0.9;
}
</style>
