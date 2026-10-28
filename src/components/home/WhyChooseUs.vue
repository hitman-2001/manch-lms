<template>
  <section class="py-16 md:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-14 md:mb-18">
        <span class="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary bg-primary-50/80 px-3.5 py-1.5 rounded-full mb-3 border border-primary-100">
          The Manch Advantage
        </span>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
          Engineered for <span class="text-primary">Serious Aspirants</span>
        </h2>
        <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
          A proven pedagogical system combining veteran faculty, rigorous testing, and personalized attention to turn potential into top percentile ranks.
        </p>
      </div>

      <!-- 4 Pillars Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <!-- Pillar 1 -->
        <div class="group bg-slate-50/70 hover:bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 hover:border-primary-200/80 shadow-xs hover:shadow-xl hover:shadow-primary-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-primary-100/70 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2.5 tracking-tight">
              Concept-First Pedagogy
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Deep focus on fundamental theory, derivations, and multi-concept problem solving rather than superficial shortcuts.
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-slate-200/60 flex items-center text-xs font-semibold text-primary">
            <span>Learn with clarity</span>
            <svg class="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        <!-- Pillar 2 -->
        <div class="group bg-slate-50/70 hover:bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 hover:border-primary-200/80 shadow-xs hover:shadow-xl hover:shadow-primary-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-amber-100/70 text-secondary-dark flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2.5 tracking-tight">
              Daily 1-on-1 Doubt Desk
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Dedicated evening faculty sessions where students resolve every numerical doubt and concept barrier individually.
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-slate-200/60 flex items-center text-xs font-semibold text-secondary-dark">
            <span>Zero doubt backlog</span>
            <svg class="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        <!-- Pillar 3 -->
        <div class="group bg-slate-50/70 hover:bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 hover:border-primary-200/80 shadow-xs hover:shadow-xl hover:shadow-primary-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-primary-100/70 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2.5 tracking-tight">
              Rigorous Test Analytics
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Weekly chapter DPPs, full-syllabus simulated exam series, and deep error analysis to continuously boost speed and accuracy.
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-slate-200/60 flex items-center text-xs font-semibold text-primary">
            <span>Continuous assessment</span>
            <svg class="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        <!-- Pillar 4 -->
        <div class="group bg-slate-50/70 hover:bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 hover:border-primary-200/80 shadow-xs hover:shadow-xl hover:shadow-primary-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2.5 tracking-tight">
              Small Batches & Mentorship
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Controlled student-to-teacher ratio ensuring every child is known, closely tracked, and guided with transparent parent updates.
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-slate-200/60 flex items-center text-xs font-semibold text-emerald-700">
            <span>Personalized care</span>
            <svg class="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "WhyChooseUs",
};
</script>

