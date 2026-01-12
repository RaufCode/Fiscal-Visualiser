
<script setup lang="ts">
import { ref } from 'vue';
import { useGoldLogic } from '../composables/useGoldLogic'

import SectionHeader from './SectionHeader.vue'
import StatCard from './StatCard.vue'
import RangeInput from './RangeInput.vue'
import InsightBox from './InsightBox.vue'
import WaterfallBar from './WaterfallBar.vue'
import BridgeBar from './BridgeBar.vue'
import TreadmillVisual from './TreadmillVisual.vue'
import DriversPanel from './DriversPanel.vue'
import PolicyPanel from './PolicyPanel.vue'


// Import Logic
const { state, calculations, CONSTANTS, formatCurrency } = useGoldLogic();
const activeTab = ref(0);

const tabs = [
  "The Basic Loop",
  "Where Losses Arise",
  "Liquidity Cost",
  "Treadmill Effect",
  "Drivers",
  "Optimal Policy"
];

const handlePrint = () => {
  window.print();
};

// Panel 4 Local State
const scenario = ref('flat'); // rise, flat, fall
</script>

<template>
  <div>
    <!-- Navigation Tabs -->
    <div class="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm rounded-t-xl overflow-hidden no-print">
      <div class="px-4 md:px-8 overflow-x-auto">
        <div class="flex space-x-6">
          <button 
            v-for="(tab, idx) in tabs" 
            :key="idx"
            @click="activeTab = idx"
            class="py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors focus:outline-none"
            :class="activeTab === idx ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-500 hover:text-slate-700'"
          >
            {{ tab }}
          </button>
        </div>
      </div>
    </div>

    <!-- Content Area -->
    <div class="bg-white/50 min-h-[500px] p-4 md:p-8 rounded-b-xl">
        
        <!-- Print Header -->
        <div class="print-only hidden mb-8 pt-8">
            <h1 class="text-2xl font-bold">Gold for Reserves Policy Report</h1>
            <p class="text-sm text-slate-500">Generated Analysis Summary</p>
        </div>

        <!-- PANEL 1: BASIC LOOP -->
        <div v-if="activeTab === 0" class="panel-container">
            <SectionHeader title="The Basic Loop" subtitle="Gold → Dollars → FX Intervention → Cedi Stability" />
            <div class="grid md:grid-cols-2 gap-8">
                <div class="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <RangeInput label="Gold Purchased (oz)" v-model="state.goldVol" :min="10000" :max="500000" :step="5000" 
                        leftLabel="10k oz" :centerLabel="formatCurrency(state.goldVol, '') + ' oz'" rightLabel="500k oz" 
                        tooltip="Volume of gold aggregated from small-scale mines." />
                    
                    <RangeInput label="Global Gold Price (USD/oz)" v-model="state.goldPrice" :min="2000" :max="5000" :step="50"
                        leftLabel="$2k" :centerLabel="formatCurrency(state.goldPrice)" rightLabel="$5k" />

                    <RangeInput label="FX Intervention Target (USD Millions)" v-model="state.fxTarget" :min="50" :max="2000" :step="50"
                        leftLabel="$50M" :centerLabel="'$' + state.fxTarget + 'M'" rightLabel="$2B" 
                        tooltip="Amount of dollars BoG needs to sell to stabilize the Cedi." />
                </div>
                <div class="space-y-4">
                    <StatCard label="USD Raised" :value="'$' + calculations.revenue.value.toFixed(1) + ' Million'" subtext="Gross export revenue" />
                    <StatCard label="Intervention Funded" :value="calculations.fundingShare.value.toFixed(1) + '%'" subtext="Percentage of target covered by gold" :color="calculations.fundingShare.value < 50 ? 'red' : 'green'" />
                    <StatCard label="Implied Cedi Injection" :value="'₵' + calculations.cediInjection.value.toFixed(2) + ' Billion'" :subtext="`New money created at ₵${CONSTANTS.exchangeRate}/$`" :highlight="true" color="amber" />
                    <InsightBox color="blue" title="Key Insight">
                        Gold-backed FX intervention is a policy choice, not a law of economics. Every ounce bought requires printing Cedis, linking currency stability directly to monetary expansion.
                    </InsightBox>
                </div>
            </div>
        </div>

        <!-- PANEL 2: LOSSES -->
        <div v-if="activeTab === 1" class="panel-container">
            <SectionHeader title="Where the Losses Come From" subtitle="Every step in the chain extracts value." />
            <div class="grid md:grid-cols-12 gap-6">
                <div class="md:col-span-4 space-y-6 bg-white p-5 rounded-lg border border-slate-200">
                    <h3 class="font-bold text-sm text-slate-400 uppercase">Input Parameters</h3>
                    <div>
                        <label class="block text-sm font-medium mb-1">Market Price</label>
                        <div class="text-xl font-mono font-bold">{{ formatCurrency(state.goldPrice) }}</div>
                    </div>
                    <RangeInput label="Domestic Bonus (%)" v-model="state.bonus" :min="0" :max="5" :step="0.1"
                         :centerLabel="state.bonus + '%'" tooltip="Premium paid to miners to stop smuggling." />
                    <RangeInput label="Assay/Refining Loss (%)" v-model="state.assayLoss" :min="0" :max="2" :step="0.1"
                         :centerLabel="state.assayLoss + '%'" tooltip="Discrepancy between local assay and foreign refinery results." />
                    
                    <div class="pt-4 border-t border-slate-100 text-xs text-slate-500">
                        <div class="flex justify-between mb-1"><span>Fixed Off-taker Discount:</span> <span>{{ CONSTANTS.offtakerDiscount }}%</span></div>
                        <div class="flex justify-between"><span>Fixed Freight/Ins:</span> <span>{{ CONSTANTS.freightInsAssay }}%</span></div>
                    </div>
                </div>

                <div class="md:col-span-8">
                    <!-- Waterfall Chart -->
                    <div class="relative h-64 border-l border-b border-slate-300 pl-4 pb-4 flex items-end justify-between space-x-2 text-xs">
        

                        <WaterfallBar :items="[
                            { label: 'Paid Out', value:calculations.purchasePrice.value, percent: 25, color: 'red', height: 100 },
                           
                            ]"
                         />

                        
                        <!-- Bridge -->
                        <div class="w-1/6 flex flex-col justify-end space-y-1 mb-16 opacity-75">
                            <BridgeBar :value="calculations.minerBonusAmt.value" label="Bonus" />
                            <BridgeBar :value="calculations.discountAmt.value" label="Disc" />
                            <BridgeBar :value="calculations.freightAmt.value + calculations.assayLossAmt.value" label="Ops" />
                        </div>

                        <WaterfallBar :items="[
                            { label: 'Received', value:calculations.exportReceipt.value, percent: 25, color: 'green', height: (calculations.exportReceipt.value / calculations.purchasePrice.value) * 100 },
                           
                            ]"
                         />

                    </div>

                    <div class="grid grid-cols-2 gap-4 mt-6">
                        <StatCard label="Net Trading Loss per Oz" :value="formatCurrency(calculations.totalLossPerOz.value)" color="red" />
                        <StatCard label="Cost per $1 of Stability" :value="(calculations.lossPerUSD.value * 100).toFixed(1) + ' cents'" subtext="Trading loss per Dollar raised" color="amber" :highlight="true" />
                    </div>
                </div>
            </div>
        </div>

        <!-- PANEL 3: STERILISATION -->
        <div v-if="activeTab === 2" class="panel-container">
            <SectionHeader title="Liquidity & Sterilisation" subtitle="The hidden cost of printing money to buy gold." />
            <div class="bg-slate-900 text-white p-6 rounded-xl mb-6 flex justify-between items-center">
                <div>
                    <h3 class="text-lg font-bold mb-1">The "Iceberg" Model</h3>
                    <p class="text-slate-300 text-sm">While the trading loss happens once, sterilisation costs recur every year.</p>
                </div>
                <i class="fa-solid fa-icicles text-3xl text-cyan-300 ml-4"></i>
            </div>

            <div class="grid md:grid-cols-2 gap-8">
                <div class="space-y-6">
                    <RangeInput label="FX Intervention Size (USD)" v-model="state.interventionAmt" :min="10" :max="500" :step="10"
                        :centerLabel="'$' + state.interventionAmt + ' Million'" />
                    <RangeInput label="Policy Rate (OMO Cost)" v-model="state.policyRate" :min="10" :max="35" :step="0.5"
                        :centerLabel="state.policyRate + '%'" tooltip="Interest rate BoG pays to absorb excess Cedis." />
                    <RangeInput label="Holding Duration (Months)" v-model="state.duration" :min="1" :max="60" :step="1"
                        :centerLabel="state.duration + ' Months'" />
                </div>
                <div class="space-y-4">
                    <div class="p-4 bg-white border border-slate-200 rounded shadow-sm">
                        <div class="text-xs text-slate-500 uppercase">Step 1: Liquidity Created</div>
                        <div class="text-xl font-bold text-slate-800">₵{{ (calculations.liquidityInjected.value / 1000000000).toFixed(2) }} Billion</div>
                    </div>
                    <div class="p-4 bg-red-50 border border-red-200 rounded shadow-sm relative overflow-hidden">
                        <div class="text-xs text-red-500 uppercase">Step 2: Interest Cost (Annual)</div>
                        <div class="text-2xl font-bold text-red-700">₵{{ (calculations.annualInterestCostGHS.value / 1000000000).toFixed(2) }} Billion</div>
                        <div class="text-sm text-red-600 mt-1">(${{ (calculations.annualInterestCostUSD.value / 1000000).toFixed(1) }} Million USD)</div>
                        <i class="fa-solid fa-fire absolute -right-2 -bottom-4 text-6xl text-red-100 opacity-50"></i>
                    </div>
                    <InsightBox color="amber" title="Critical Insight">
                         The annual interest cost of holding these reserves ({{ state.policyRate }}%) often exceeds the trading loss.
                    </InsightBox>
                </div>
            </div>
            <!--hello-->
        </div>

        <!-- PANEL 4: TREADMILL -->
        <div v-if="activeTab === 3" class="panel-container">
            <SectionHeader title="The Treadmill Effect" subtitle="What happens when gold prices crash?" />
            
            <div class="flex justify-center space-x-4 mb-8">
                <button v-for="s in ['rise', 'flat', 'fall']" :key="s" @click="scenario = s"
                    class="px-4 py-2 rounded font-bold capitalize transition-all"
                    :class="scenario === s ? (s === 'fall' ? 'bg-red-600 text-white' : (s === 'rise' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white')) : 'bg-slate-200 text-slate-600'">
                    Price {{ s === 'rise' ? 'Rises (+10%)' : (s === 'fall' ? 'Crashes (-20%)' : 'Flat') }}
                </button>
            </div>

            <!-- Computed for Treadmill -->
            <!-- BUG FIX: We now use the actual Loss Per Oz from Panel 2 (calculations.totalLossPerOz) -->
            <div class="grid md:grid-cols-2 gap-8 items-center">
                <TreadmillVisual scenario="rise" :basePrice="4200" :fxNeed="100000000" :lossPerOz="calculations.totalLossPerOz.value" />
            </div>
        </div>

        <!-- PANEL 5: DRIVERS -->
        <div v-if="activeTab === 4" class="panel-container">
            <SectionHeader title="Who Really Drives the Cedi?" subtitle="Gold-for-Reserves is not the only variable." />
            <DriversPanel />
        </div>

        <!-- PANEL 6: POLICY -->
        <div v-if="activeTab === 5" class="panel-container">
             <SectionHeader title="What is the Optimal Policy?" subtitle="Choose a strategy to see the trade-offs." />
             <PolicyPanel />
        </div>

        <!-- Action Bar -->
        <div class="mt-8 flex justify-end no-print">
             <button @click="handlePrint" class="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded shadow flex items-center gap-2 text-sm transition">
                <i class="fa-solid fa-file-pdf"></i> Generate Policy Report
             </button>
        </div>
    </div>
  </div>
</template>



<style scoped>
.panel-container {
    animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>