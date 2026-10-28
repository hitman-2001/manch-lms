<template>
  <section class="bg-slate-50/80 border-y border-slate-200/70 py-10 md:py-14">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/60">
        <!-- Stat 1 -->
        <div class="flex flex-col items-center text-center px-2 sm:px-4 py-2 sm:py-0">
          <div class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight tabular-nums mb-1">
            99.61<span class="text-primary text-2xl sm:text-3xl font-bold">%ile</span>
          </div>
          <p class="text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wider mb-0.5">
            Top MHT-CET Score
          </p>
          <span class="text-[11px] text-slate-500 font-medium">State Board & Entrance Rankers</span>
        </div>

        <!-- Stat 2 -->
        <div class="flex flex-col items-center text-center px-2 sm:px-4 pt-4 sm:pt-0">
          <div class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight tabular-nums mb-1">
            50<span class="text-secondary text-2xl sm:text-3xl font-bold">+</span>
          </div>
          <p class="text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wider mb-0.5">
            NEET Selections
          </p>
          <span class="text-[11px] text-slate-500 font-medium">Top Government Medical Seats</span>
        </div>

        <!-- Stat 3 -->
        <div class="flex flex-col items-center text-center px-2 sm:px-4 pt-4 sm:pt-0">
          <div class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight tabular-nums mb-1">
            100<span class="text-primary text-2xl sm:text-3xl font-bold">+</span>
          </div>
          <p class="text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wider mb-0.5">
            JEE Main & Adv
          </p>
          <span class="text-[11px] text-slate-500 font-medium">IITs, NITs & Premier Institutes</span>
        </div>

        <!-- Stat 4 -->
        <div class="flex flex-col items-center text-center px-2 sm:px-4 pt-4 sm:pt-0">
          <div class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight tabular-nums mb-1">
            15<span class="text-secondary text-2xl sm:text-3xl font-bold">+</span>
          </div>
          <p class="text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wider mb-0.5">
            Years of Trust
          </p>
          <span class="text-[11px] text-slate-500 font-medium">Vasai East • Vasai West • Nallasopara</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "StatsSection",
};
</script>
