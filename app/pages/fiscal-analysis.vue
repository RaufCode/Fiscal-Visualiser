<template>
  <div class="bg-white text-gray-800">
    <!-- Container -->
    <div class="max-w-4xl mx-auto px-6 py-16 leading-relaxed">

      <!-- Title -->
      <header class="mb-12">
        <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
          De-Katanomising Africa’s Mineral Fiscal Policy Through DPI Tech
        </h1>
        <p class="text-lg text-gray-600">
          From static royalties to sovereign intelligence in the age of critical minerals.
        </p>
      </header>

      <!-- INTRO -->
      <section class="prose prose-lg max-w-none mb-16">
        <h2>Introduction: The Myth of Abundance and the Reality of Data</h2>

        <p>
          As concerns over global warming force a shift to battery technologies, a new class of
          <strong>critical minerals</strong> — such as lithium, cobalt, and rare earths — has taken center stage.
          For West Africa, historically tied to “older” minerals like gold and bauxite, this transition
          is a make-or-break moment.
        </p>

        <p>
          Yet, the region is locked into a pernicious <strong>“myth of 30%”</strong>, which suggests that the continent
          holds a third of the world's resources and needs only to wait for global demand to knock.
          The truth is that much of the continent is seriously starved of the essential industrial minerals
          needed for structural economic transformation.
        </p>

        <p>
          This abundance mindset obscures a precarious reality: the continent is <em>data-poor</em> in an era
          where geological intelligence is the primary currency of exploration. African governments often
          sell exploration licenses like lottery tickets without knowing the odds of winning, while foreign
          entities utilize AI and “mirror geology” to extract value from African data to de-risk investments elsewhere.
        </p>

        <p>
          Furthermore, the fiscal instruments used to capture value — static royalties and manual tax assessments —
          suffer from <strong>“Katanomics”</strong>: a structural fracture between political ambition, policy design,
          and execution. Bridging this gap requires <strong>Sovereign Intelligence</strong> and the deployment of
          <strong>Digital Public Infrastructure (DPI)</strong>.
        </p>
      </section>

      <!-- CASE STUDY -->
      <section class="prose prose-lg max-w-none mb-16">
        <h2>The Ewoyaa Case: Katanomics in Action</h2>

        <p>
          The Ewoyaa Lithium Project in Ghana serves as a prime case study. Unlike the established gold sector,
          lithium is a <em>greenfield regulatory space</em>. The political narrative of “historic value capture”
          collided with the operational reality of the developer, Atlantic Lithium, a junior explorer navigating
          the “Valley of Death” between discovery and production.
        </p>

        <p>
          The state’s initial negotiation for a fixed 10% royalty was jettisoned without any credible account,
          despite vibrant political debate — a classic symptom of the katanomic syndrome in which political voice
          does not translate into policy accountability.
        </p>

        <p>
          The subsequent renegotiated 5% base royalty rate failed to account for extreme price volatility
          (lithium prices swung from $500 to $6,000/ton in two years) or the metal’s complex chemistry-economics.
          Unsurprisingly, it was greeted with civil uproar.
        </p>

        <p>
          Eventually, a sliding-scale mechanism was introduced. While pragmatic, this shift was presented
          without serious fiscal modelling, betraying the need for rigorous, data-backed sensitivity analysis.
          What Ghana received instead was a fiat outcome — a situation begging for <strong>de-katanomisation</strong>.
        </p>
      </section>

      <!-- INTERACTIVE ANALYSIS -->
      <section class="mb-20">
        <h2 class="text-3xl font-bold text-gray-900 mb-6">
          Interactive Fiscal Analysis: Deconstructing the “Government Take”
        </h2>

        <p class="text-lg text-gray-700 mb-10 max-w-3xl">
          De-katanomisation means moving beyond headline numbers to model the
          <strong>Effective Government Take</strong> under real operating conditions.
        </p>

        <!-- WEDGE 1 -->
        <div class="mb-10">
          <h3 class="text-xl font-semibold mb-3">
            Scenario A: Base Royalty (5%), Fixed AISC Costs
          </h3>
          <div class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-500">
            <FiscalWedge
                title="Scenario A"
                :baseRoyalty="0.05"
                :royaltyBands="[
                    { price: 1500, rate: 0.05 },
                    { price: 2500, rate: 0.07 },
                    { price: 3000, rate: 0.10 },
                    { price: 4000, rate: 0.12 }
                ]"
                aiscMode="fixed"
                :useSmoothing="false"
                />

          </div>
        </div>

        <!-- WEDGE 2 -->
        <div class="mb-10">
          <h3 class="text-xl font-semibold mb-3">
            Scenario B: Higher Base Royalty (10%), Fixed AISC Costs
          </h3>
          <div class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-500">
           <FiscalWedge
            title="Scenario A"
            :baseRoyalty="0.10"
            :royaltyBands="[
                { price: 1500, rate: 0.05 },
                { price: 2500, rate: 0.07 },
                { price: 3000, rate: 0.10 },
                { price: 4000, rate: 0.12 }
            ]"
            aiscMode="fixed"
            :useSmoothing="false"
            />

          </div>
        </div>

        <!-- COST BASE -->
        <div class="prose prose-lg max-w-none mb-10">
          <h3>Cost Base: All-In Sustaining Costs (AISC)</h3>
          <p>
            Royalty rates do not exist in a vacuum. The All-In Sustaining Cost determines
            project survivability. In inflationary environments or complex geology,
            even modest royalties can become punitive.
          </p>
        </div>

        <!-- WEDGE 3 -->
        <div class="mb-10">
          <h3 class="text-xl font-semibold mb-3">
            Scenario C: Base Royalty (5%), Variable AISC Costs
          </h3>
          <div class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-500">
            <FiscalWedge
                title="Scenario C: Base Royalty (5%), Variable AISC Costs"
                :baseRoyalty="0.05"
                aiscMode="variable"
                :useSmoothing="false"
                :volume="500000"
                :price="3050"
                :royaltyBands="[
                    { price: 1500, rate: 0.05 },
                    { price: 2500, rate: 0.07 },
                    { price: 3000, rate: 0.10 },
                    { price: 4000, rate: 0.12 }
                ]"
                />

          </div>
        </div>

        <!-- WEDGE 4 -->
        <div class="mb-10">
          <h3 class="text-xl font-semibold mb-3">
            Scenario D: Higher Base Royalty (10%), Variable AISC Costs
          </h3>
          <div class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-500">
           <FiscalWedge
                title="Scenario D: Higher Base Royalty (10%), Variable AISC Costs"
                :baseRoyalty="0.10"
                aiscMode="variable"
                :useSmoothing="false"
                :volume="500000"
                :price="3050"
                :royaltyBands="[
                    { price: 1500, rate: 0.05 },
                    { price: 2500, rate: 0.07 },
                    { price: 3000, rate: 0.10 },
                    { price: 4000, rate: 0.12 }
                ]"
                />

          </div>
        </div>

        <!-- CLIFF EFFECT -->
        <div class="prose prose-lg max-w-none mb-10">
          <h3>Solving the “Cliff Effect” with Smoothing</h3>
          <p>
            Step-based royalty systems create perverse incentives. When rates jump abruptly,
            operators may suppress invoice prices to remain in a lower bracket.
          </p>
          <p>
            A smoothed sliding scale — using continuous interpolation — eliminates this incentive
            by ensuring that higher prices always yield higher net profit.
          </p>
        </div>

        <!-- WEDGE 5 -->
        <div>
          <h3 class="text-xl font-semibold mb-3">
            Scenario E: Smoothed Royalty, Fixed AISC Costs
          </h3>
          <div class="border-2 border-dashed border-green-300 bg-green-50 rounded-xl p-6 text-center text-green-700">
           <FiscalWedge
            title="Scenario E: Smoothed Royalty, Fixed AISC Costs"
            :baseRoyalty="0.05"
            aiscMode="fixed"
            :useSmoothing="true"
            :volume="500000"
            :price="3050"
            :royaltyBands="[
                { price: 1500, rate: 0.05 },
                { price: 2500, rate: 0.07 },
                { price: 3000, rate: 0.10 },
                { price: 4000, rate: 0.12 }
            ]"
            />

          </div>
        </div>
      </section>

      <!-- DIGITAL GAZETTE -->
      <section class="prose prose-lg max-w-none mb-16">
        <h2>Operationalizing Policy: The Digital Gazette</h2>

        <p>
          Superior models are useless if administrative machinery cannot implement them.
          We propose the <strong>Digital Gazette</strong> — mining codes expressed as
          computable regulatory logic rather than static PDFs.
        </p>

        <p>
          This creates an immutable audit trail and allows civil society, analysts,
          and journalists to run simulations and audit fiscal regimes in real time.
        </p>
      </section>

      <!-- DATA SOVEREIGNTY -->
      <section class="prose prose-lg max-w-none mb-16">
        <h2>Data Sovereignty and the Enterprise Marketplace</h2>

        <p>
          By mandating machine-readable geological data uploads with QA/QC metadata,
          the state asserts ownership over its geological IP.
        </p>

        <p>
          A mineral data marketplace can track the downstream value of data, ensuring
          that original data producers are compensated when discoveries occur.
        </p>
      </section>

      <!-- FELDSPAR -->
      <section class="prose prose-lg max-w-none mb-16">
        <h2>The Feldspar Pilot: A Sandbox for Reform</h2>

        <p>
          Feldspar — a byproduct of lithium mining — offers a low-stakes sandbox
          to test Digital Gazettes, smoothed royalties, and cross-border data rails.
        </p>
      </section>

      <!-- CONCLUSION -->
      <section class="prose prose-lg max-w-none">
        <h2>Conclusion: From Resource Nationalism to Smart Sovereignty</h2>

        <p>
          The strategic game is not won by shouting louder at the negotiating table,
          but by owning the data, knowing the odds, and automating value capture.
        </p>

        <p class="font-semibold">
          Read the full whitepaper here:
        </p>
      </section>

    </div>
  </div>
</template>
