<template>
  <div class="flex gap-2 items-end h-64">
    <div
      v-for="(item, i) in items"
      :key="i"
      class="w-1/4 rounded-t relative group flex flex-col justify-end transition-all duration-500"
      :class="'bg-' + item.color + '-100'"
      :style="{ height: item.height + '%' }"
    >
      <div class="w-full" :class="'bg-' + item.color + '-500'" style="height: 100%"></div>
      <div class="absolute top-0 w-full text-center -mt-6 font-bold" :class="'text-' + item.color + '-600'">
        ${{ Math.round(Number(item.value)) }}
      </div>
      <div class="absolute bottom-2 w-full text-center text-white font-bold opacity-80">
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  items: {
    label: string
    value: string | number
    percent: number
    color: string
    height: number
  }[]
}>()
</script>
