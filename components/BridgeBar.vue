<template>
   <div class="h-4 bg-slate-400 w-full rounded relative group mt-1">
        <span class="absolute -right-2 -top-4 text-[10px] text-slate-600 w-24 text-right">{{ label }} \${{ Math.round(value) }}</span>
    </div>
</template>

<script setup lang="ts">
defineProps<{
  value: number
  label:string
}>()
</script>
