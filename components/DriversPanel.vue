<template>
  <div class="grid md:grid-cols-2 gap-8">
    <div class="space-y-6">
      <p class="text-sm text-slate-600 mb-4">Adjust the drivers to see contribution.</p>
      <div v-for="(v, k) in weights" :key="k">
        <label class="flex justify-between text-sm font-medium mb-1 capitalize">
          <span>{{ k }}</span> <span class="text-blue-600">{{ v }}%</span>
        </label>
        <input
          type="range"
          v-model="weights[k]"
          :max="100"
          class="w-full h-2 bg-slate-200 rounded-lg appearance-none accent-blue-600"
        />
      </div>
    </div>

    <div class="flex items-center justify-center">
      <div
        class="relative w-64 h-64 rounded-full border-8 border-slate-100 flex items-center justify-center overflow-hidden"
      >
        <div
          class="absolute w-full h-full opacity-80"
          :style="{
            background: `conic-gradient(
              #D97706 0% ${weights.gold}%,
              #2563EB ${weights.gold}% ${weights.gold + weights.debt}%,
              #10B981 ${weights.gold + weights.debt}% ${
              weights.gold + weights.debt + weights.fiscal
            }%,
              #64748B ${weights.gold + weights.debt + weights.fiscal}% 100%
            )`
          }"
        ></div>

        <div
          class="absolute w-48 h-48 bg-white rounded-full flex flex-col items-center justify-center z-10 shadow-inner"
        >
          <div class="text-xs text-slate-400">Total Weight</div>
          <div :class="total > 100 ? 'text-red-500 text-2xl font-bold' : 'text-slate-800 text-2xl font-bold'">
            {{ total }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const weights = ref({ gold: 20, debt: 40, fiscal: 30, commodities: 10 })

const total = computed(() =>
  Object.values(weights.value).reduce((a, b) => a + b, 0)
)
</script>
