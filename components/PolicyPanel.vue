<template>
  <div>
    <div class="grid md:grid-cols-3 gap-4 mb-8">
      <div
        @click="policy = 'current'"
        class="cursor-pointer p-4 border rounded-lg hover:shadow-md transition"
        :class="policy === 'current'
          ? 'border-amber-500 bg-amber-50 ring-1 ring-amber-500'
          : 'border-slate-200'"
      >
        <h4 class="font-bold text-slate-800 mb-2">Status Quo</h4>
        <p class="text-xs text-slate-500">Monopoly aggregator.</p>
      </div>

      <div
        @click="policy = 'trustchain'"
        class="cursor-pointer p-4 border rounded-lg hover:shadow-md transition"
        :class="policy === 'trustchain'
          ? 'border-green-500 bg-green-50 ring-1 ring-green-500'
          : 'border-slate-200'"
      >
        <h4 class="font-bold text-slate-800 mb-2">Trust-Chain</h4>
        <p class="text-xs text-slate-500">Competitive bidding.</p>
      </div>

      <div
        @click="policy = 'austere'"
        class="cursor-pointer p-4 border rounded-lg hover:shadow-md transition"
        :class="policy === 'austere'
          ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
          : 'border-slate-200'"
      >
        <h4 class="font-bold text-slate-800 mb-2">Market Float</h4>
        <p class="text-xs text-slate-500">No intervention.</p>
      </div>
    </div>

    <div
      class="p-6 rounded-xl border-l-8 bg-white shadow-sm"
      :class="'border-' + res.color + '-500'"
    >
      <div class="grid grid-cols-3 gap-6 text-center mb-6">
        <div>
          <div class="text-xs text-slate-400 uppercase">Fiscal Cost</div>
          <div :class="'text-' + res.color + '-600'" class="font-bold">{{ res.cost }}</div>
        </div>
        <div>
          <div class="text-xs text-slate-400 uppercase">Systemic Risk</div>
          <div :class="'text-' + res.color + '-600'" class="font-bold">{{ res.risk }}</div>
        </div>
        <div>
          <div class="text-xs text-slate-400 uppercase">Stability</div>
          <div :class="'text-' + res.color + '-600'" class="font-bold">Variable</div>
        </div>
      </div>
      <p class="text-center text-slate-700 font-medium">"{{ res.desc }}"</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const policy = ref('current')

const res = computed(() => {
  if (policy.value === 'trustchain') {
    return {
      cost: "Medium",
      risk: "Low",
      desc: "Trust-Chain Model: Competitive bidding reduces trading losses.",
      color: "green"
    }
  }
  if (policy.value === 'austere') {
    return {
      cost: "Low",
      risk: "High",
      desc: "Fiscal Austerity: No intervention. Cedi floats freely.",
      color: "blue"
    }
  }
  return {
    cost: "High",
    risk: "Medium",
    desc: "Current Monopoly: High trading losses & sterilisation costs.",
    color: "amber"
  }
})
</script>
