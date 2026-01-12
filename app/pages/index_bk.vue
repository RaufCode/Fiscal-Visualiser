<template>
  <div class="min-h-screen bg-gray-50 p-6 space-y-8">

    <!-- Header -->
    <SectionHeader subtitle="Gold for Reserves – Interactive Policy Simulator">
      Gold for Reserves
    </SectionHeader>

    <!-- Tabs -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="(tab, i) in tabs"
        :key="i"
        class="px-4 py-2 rounded-full text-sm font-medium"
        :class="activeTab === i
          ? 'bg-indigo-600 text-white'
          : 'bg-white text-gray-600 border'"
        @click="activeTab = i"
      >
        {{ tab }}
      </button>
    </div>

    <!-- TAB 0: Basic Loop -->
    <div v-if="activeTab === 0" class="space-y-6">

      <InsightBox>
        This section shows how gold purchases translate into FX inflows and
        domestic liquidity injection.
      </InsightBox>

      <div class="grid md:grid-cols-3 gap-4">
        <StatCard
          label="Gold Revenue (USD mn)"
          :value="calculations.revenue.value.toFixed(1)"
        />
        <StatCard
          label="FX Coverage (%)"
          :value="calculations.fundingShare.value.toFixed(1)"
        />
        <StatCard
          label="Cedi Injection (GHS bn)"
          :value="calculations.cediInjection.value.toFixed(2)"
        />
      </div>

      <SectionHeader subtitle="Key Inputs" />

      <div class="grid md:grid-cols-2 gap-6">
        <RangeInput
          label="Gold Volume (oz)"
          v-model="state.goldVol"
          :min="50000"
          :max="500000"
          :step="10000"
        />

        <RangeInput
          label="Gold Price (USD/oz)"
          v-model="state.goldPrice"
          :min="2000"
          :max="5000"
          :step="50"
        />
      </div>
    </div>

    <!-- TAB 1: Losses -->
    <div v-if="activeTab === 1" class="space-y-6">

      <InsightBox variant="warning">
        Losses arise from bonuses, discounts, logistics, and assay variance.
      </InsightBox>

      <WaterfallBar :items="lossItems" />

      <StatCard
        label="Loss per USD earned"
        :value="calculations.lossPerUSD.value.toFixed(3)"
      />
    </div>

    <!-- TAB 2: Liquidity Cost -->
    <div v-if="activeTab === 2" class="space-y-6">

      <InsightBox>
        Liquidity injection creates interest costs over time.
      </InsightBox>

      <BridgeBar
        :steps="[
          'FX Purchase',
          'Cedi Injection',
          'Sterilisation',
          'Interest Cost'
        ]"
      />

      <div class="grid md:grid-cols-3 gap-4">
        <StatCard
          label="Liquidity Injected (GHS)"
          :value="formatCurrency(calculations.liquidityInjected.value, '₵')"
        />
        <StatCard
          label="Annual Interest (GHS)"
          :value="formatCurrency(calculations.annualInterestCostGHS.value, '₵')"
        />
        <StatCard
          label="Period Interest (GHS)"
          :value="formatCurrency(calculations.periodInterestCostGHS.value, '₵')"
        />
      </div>
    </div>

    <!-- TAB 3: Treadmill -->
    <div v-if="activeTab === 3" class="space-y-6">

      <InsightBox variant="info">
        The treadmill shows how policy effort may fail to improve net reserves.
      </InsightBox>

      <TreadmillVisual
        :progress="Math.min(calculations.fundingShare.value, 100)"
        label="Policy Effort vs Outcome"
      />
    </div>

    <!-- TAB 4: Drivers -->
    <div v-if="activeTab === 4">
      <DriversPanel :drivers="drivers" />
    </div>

    <!-- TAB 5: Policy -->
    <div v-if="activeTab === 5">
      <PolicyPanel :items="policyItems" />
    </div>

    <!-- Footer -->
    <div class="pt-6 border-t flex justify-end">
      <button
        class="px-4 py-2 rounded bg-gray-800 text-white text-sm"
        @click="handlePrint"
      >
        <i class="fa fa-print mr-1" />
        Print / Export
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGoldLogic } from '../../composables/useGoldLogic'

const { state, calculations, formatCurrency } = useGoldLogic()

const activeTab = ref(0)

const tabs = [
  'The Basic Loop',
  'Where Losses Arise',
  'Liquidity Cost',
  'Treadmill Effect',
  'Drivers',
  'Optimal Policy'
]

const handlePrint = () => window.print()

/* -------- Derived UI data -------- */

const lossItems = computed(() => [
  {
    label: 'Miner Bonus',
    value: calculations.minerBonusAmt.value.toFixed(1),
    percent: 25
  },
  {
    label: 'Offtaker Discount',
    value: calculations.discountAmt.value.toFixed(1),
    percent: 30
  },
  {
    label: 'Freight & Insurance',
    value: calculations.freightAmt.value.toFixed(1),
    percent: 20
  },
  {
    label: 'Assay Loss',
    value: calculations.assayLossAmt.value.toFixed(1),
    percent: 15
  }
])

const drivers = [
  {
    key: 'bonus',
    label: 'Miner Bonus (%)',
    model: computed<number>({
      get: () => state.value.bonus,
      set: (v: number) => (state.value.bonus = v),
    }),
    min: 0,
    max: 5,
    step: 0.1,
  },
  {
    key: 'policyRate',
    label: 'Policy Rate (%)',
    model: computed<number>({
      get: () => state.value.policyRate,
      set: (v: number) => (state.value.policyRate = v),
    }),
    min: 5,
    max: 35,
    step: 0.5,
  },
]


const policyItems = computed(() => [
  {
    label: 'Net FX Efficiency',
    value: (100 - calculations.lossPerUSD.value * 100).toFixed(1) + '%'
  },
  {
    label: 'Annual USD Interest Cost',
    value: formatCurrency(calculations.annualInterestCostUSD.value, '$')
  }
])
</script>
