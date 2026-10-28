<template>
  <section class="py-16 md:py-24 bg-white border-t border-slate-200/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
        <div class="max-w-2xl">
          <span class="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary bg-primary-50/80 px-3.5 py-1.5 rounded-full mb-3 border border-primary-100">
            Hall of Fame
          </span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Celebrating Our <span class="text-primary">Top Scorers</span>
          </h2>
          <p class="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Consistent preparation and veteran guidance produce extraordinary results year after year. Meet a few of our stellar achievers.
          </p>
        </div>

        <div>
          <router-link
            to="/results"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs sm:text-sm tracking-wide shadow-sm hover:shadow-md transition-all group"
          >
            <span>View All Year Results</span>
            <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </router-link>
        </div>
      </div>

      <!-- Ranker Cards Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        <div
          v-for="(topper, idx) in toppers"
          :key="idx"
          class="bg-gradient-to-b from-slate-50 to-white rounded-2xl p-5 border border-slate-200/70 shadow-xs hover:shadow-xl hover:shadow-primary-900/5 hover:-translate-y-1.5 transition-all duration-300 text-center flex flex-col justify-between group"
        >
          <div>
            <!-- Exam Badge -->
            <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase mb-3 bg-primary-50 text-primary border border-primary-100">
              {{ topper.exam }}
            </span>

            <!-- Score -->
            <div class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1 group-hover:text-primary transition-colors">
              {{ topper.score }}
            </div>
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
              Percentile
            </div>

            <!-- Student Name -->
            <h3 class="text-sm font-bold text-slate-900 leading-snug line-clamp-1 mb-1">
              {{ topper.name }}
            </h3>
          </div>

          <!-- Branch -->
          <div class="pt-3 border-t border-slate-100 text-[11px] font-medium text-slate-500">
            {{ topper.branch }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ToppersPreview",
  data() {
    return {
      toppers: [
        { name: "Aayush Pandit", score: "99.61%", exam: "MHT-CET", branch: "Vasai Center" },
        { name: "Hitesh Choudhary", score: "99.00%", exam: "MHT-CET", branch: "Vasai Center" },
        { name: "Prisha Gupta", score: "97.65%", exam: "MHT-CET", branch: "Vasai Center" },
        { name: "Shivansh Malviya", score: "96.99%", exam: "MHT-CET", branch: "Vasai Center" },
        { name: "Omkar Myana", score: "96.27%", exam: "MHT-CET", branch: "Vasai Center" },
        { name: "Ashok Choudhary", score: "96.14%", exam: "MHT-CET", branch: "Nallasopara Center" }
      ]
    };
  }
};
</script>

