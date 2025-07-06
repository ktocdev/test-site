<template>
  <label class="custom-checkbox" :class="{ 'is-checked': checked }">
    <input
      type="checkbox"
      :checked="checked"
      @change="$emit('change', $event.target.checked)"
      class="checkbox-input"
    />
    <span class="checkbox-box">
      <span class="checkbox-checkmark">✓</span>
    </span>
    <span class="checkbox-label">{{ label }}</span>
  </label>
</template>

<script>
export default {
  name: 'CustomCheckbox',
  props: {
    label: {
      type: String,
      required: true
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  emits: ['change']
}
</script>

<style scoped>
.custom-checkbox {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #333333 0%, #262626 100%);
  border: 2px solid transparent;
  user-select: none;
  min-width: 140px;
  width: auto;
  flex-shrink: 0;
}

.custom-checkbox:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 8px rgba(0,0,0,0.3);
  border-color: rgba(255, 20, 178, 0.3);
}

.custom-checkbox.is-checked {
  background: linear-gradient(135deg, #3d2d3d 0%, #2f1f2f 100%);
  border-color: #FF20B2;
  box-shadow: 0 3px 8px rgba(255, 20, 178, 0.2);
}

.checkbox-input {
  display: none;
}

.checkbox-box {
  position: relative;
  width: 20px;
  height: 20px;
  border: 2px solid #666;
  border-radius: 4px;
  background: #1a1a1a;
  transition: all 0.3s ease;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-checkbox:hover .checkbox-box {
  border-color: #FF20B2;
}

.custom-checkbox.is-checked .checkbox-box {
  background: #FF20B2;
  border-color: #FF20B2;
}

.checkbox-checkmark {
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  opacity: 0;
  transform: scale(0);
  transition: all 0.2s ease;
}

.custom-checkbox.is-checked .checkbox-checkmark {
  opacity: 1;
  transform: scale(1);
}

.checkbox-label {
  color: #e0e0e0;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s ease;
  line-height: 1.2;
  white-space: nowrap;
}

.custom-checkbox.is-checked .checkbox-label {
  color: #FF20B2;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .custom-checkbox {
    padding: 0.6rem 0.8rem;
    gap: 0.6rem;
  }

  .checkbox-box {
    width: 18px;
    height: 18px;
  }

  .checkbox-label {
    font-size: 0.8rem;
  }

  .checkbox-checkmark {
    font-size: 0.7rem;
  }
}
</style>
