<template>
  <div
    class="p-4 rounded-lg border shadow-sm"
    :class="highlight
      ? 'bg-' + (color || 'blue') + '-50 border-' + (color || 'blue') + '-200'
      : 'bg-white border-slate-200'"
  >
    <div class="text-xs font-semibold uppercase tracking-wider text-slate-500">
      {{ label }}
    </div>
    <div class="text-2xl font-bold mt-1" :class="'text-' + (color || 'blue') + '-700'">
      {{ value }}
    </div>
    <div v-if="subtext" class="text-xs text-slate-500 mt-1">{{ subtext }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
  subtext?: string
  highlight?: boolean
  color?: string
}>()
</script>
