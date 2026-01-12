<template>
  <div class="mb-6 border-b border-slate-200 pb-4">
        <h2 class="text-2xl font-bold text-slate-900">{{ title }}</h2>
        <p class="text-slate-500 mt-1 text-sm">{{ subtitle }}</p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
   title?: string
   subtitle?: string
}>()
</script>
