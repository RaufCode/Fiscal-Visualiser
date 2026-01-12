<template>
  <div class="contents">
    <div class="relative h-64 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200 overflow-hidden">
      <div class="text-center z-10">
        <div class="text-4xl mb-2"><i class="fa-solid fa-cubes-stacked text-amber-400"></i></div>
        <div class="text-2xl font-bold text-slate-700">{{ Math.round(goldNeeded).toLocaleString() }} oz</div>
        <div class="text-sm text-slate-500">Gold Required for $100M FX</div>
      </div>
      <div class="absolute bottom-0 w-full h-2 transition-colors" :class="scenario === 'fall' ? 'bg-red-500 animate-pulse' : 'bg-blue-300'"></div>
    </div>

    <div class="space-y-4">
      <div class="bg-white p-4 rounded shadow border border-slate-200">
        <h4 class="text-sm font-bold text-slate-500 uppercase">Scenario Impact</h4>
        <div class="mt-2 flex justify-between items-end border-b border-slate-100 pb-2">
          <span>Volume Required:</span>
          <span class="font-bold" :class="extraGold > 0 ? 'text-red-600' : 'text-green-600'">
            {{ extraGold > 0 ? '+' : '' }}{{ Math.round(extraGold).toLocaleString() }} oz
          </span>
        </div>
        <div class="mt-2 flex justify-between items-end">
          <span>Total Trading Loss:</span>
          <span class="font-bold" :class="scenario === 'fall' ? 'text-red-600' : 'text-slate-700'">
            \${{ (totalTradingLoss / 1000000).toFixed(2) }} Million
          </span>
        </div>
        <div class="text-[10px] text-slate-400 mt-1 text-right">*Based on current loss of \${{ Math.round(lossPerOz) }}/oz</div>
      </div>

      <div v-if="scenario === 'fall'" class="bg-red-50 p-4 rounded border-l-4 border-red-500 text-sm text-red-800">
        <strong>The Bear Trap:</strong> When gold prices fall, you must aggregate and export significantly more gold to get the same dollars. This exposes the state to compounding losses on higher volumes.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  basePrice: number
  scenario: 'rise' | 'fall' | 'flat'
  fxNeed: number
  lossPerOz: number
}>()

const data = computed(() => {
  return {
    price:
      props.scenario === 'rise'
        ? props.basePrice * 1.1
        : props.scenario === 'fall'
        ? props.basePrice * 0.8
        : props.basePrice,
  }
})

const goldNeeded = computed(() => props.fxNeed / data.value.price)
const baseGoldNeeded = computed(() => props.fxNeed / props.basePrice)
const extraGold = computed(() => goldNeeded.value - baseGoldNeeded.value)
const totalTradingLoss = computed(() => goldNeeded.value * props.lossPerOz)
</script>
