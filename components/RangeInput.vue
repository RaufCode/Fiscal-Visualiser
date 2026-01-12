<template>
  <div>
    <label class="block text-sm font-medium mb-2">
      {{ label }}
      <span
        v-if="tooltip"
        class="text-amber-600 ml-1 cursor-help"
        :title="tooltip"
      >
        <i class="fa-solid fa-circle-info"></i>
      </span>
    </label>

    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      @input="$emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
      class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
    />

    <div class="flex justify-between text-xs text-slate-500 mt-1">
      <span>{{ leftLabel }}</span>
      <span v-if="centerLabel" class="font-bold text-amber-600">{{ centerLabel }}</span>
      <span>{{ rightLabel }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  modelValue: number
  min: number
  max: number
  step?: number         
  leftLabel?: string    
  centerLabel?: string  
  rightLabel?: string   
  tooltip?: string      
}>()

defineEmits(['update:modelValue'])
</script>
