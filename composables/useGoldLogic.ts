
export const useGoldLogic = () => {
    // --- Constants ---
    const CONSTANTS = {
        exchangeRate: 11.42, // GHS to USD
        offtakerDiscount: 1.25, // %
        freightInsAssay: 0.6, // %
    };

    // --- State ---
    // Using useState for SSR-safe global state if needed, or ref for local
    const state = useState('goldState', () => ({
        goldVol: 250000,
        goldPrice: 4200,
        fxTarget: 100, // Millions
        bonus: 1.5,
        assayLoss: 0.5,
        interventionAmt: 100, // Millions
        policyRate: 22,
        duration: 12,
    }));

    // --- Computed Logic ---
    
    // Panel 1: Basic Loop
    const revenue = computed(() => (state.value.goldVol * state.value.goldPrice) / 1000000); // Millions
    const fundingShare = computed(() => Math.min((revenue.value / state.value.fxTarget) * 100, 100));
    const cediInjection = computed(() => (revenue.value * 1000000 * CONSTANTS.exchangeRate) / 1000000000); // Billions

    // Panel 2: Losses (The Core Pricing Engine)
    const marketPrice = computed(() => state.value.goldPrice);
    const minerBonusAmt = computed(() => marketPrice.value * (state.value.bonus / 100));
    const purchasePrice = computed(() => marketPrice.value + minerBonusAmt.value);
    
    const discountAmt = computed(() => marketPrice.value * (CONSTANTS.offtakerDiscount / 100));
    const freightAmt = computed(() => marketPrice.value * (CONSTANTS.freightInsAssay / 100));
    const assayLossAmt = computed(() => marketPrice.value * (state.value.assayLoss / 100));
    
    const exportReceipt = computed(() => marketPrice.value - discountAmt.value - freightAmt.value - assayLossAmt.value);
    const totalLossPerOz = computed(() => purchasePrice.value - exportReceipt.value);
    const lossPerUSD = computed(() => totalLossPerOz.value / exportReceipt.value);

    // Panel 3: Sterilisation
    const liquidityInjected = computed(() => state.value.interventionAmt * 1000000 * CONSTANTS.exchangeRate);
    const annualInterestCostGHS = computed(() => liquidityInjected.value * (state.value.policyRate / 100));
    const periodInterestCostGHS = computed(() => annualInterestCostGHS.value * (state.value.duration / 12));
    const annualInterestCostUSD = computed(() => annualInterestCostGHS.value / CONSTANTS.exchangeRate);

    // Helper for formatting
    const formatCurrency = (val: number, currency = '$') => {
        return `${currency}${val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    };

    return {
        CONSTANTS,
        state,
        calculations: {
            revenue,
            fundingShare,
            cediInjection,
            purchasePrice,
            minerBonusAmt,
            discountAmt,
            freightAmt,
            assayLossAmt,
            exportReceipt,
            totalLossPerOz, // Exposed for Panel 4
            lossPerUSD,
            liquidityInjected,
            annualInterestCostGHS,
            periodInterestCostGHS,
            annualInterestCostUSD
        },
        formatCurrency
    };
};