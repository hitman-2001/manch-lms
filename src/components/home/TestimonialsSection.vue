<template>
  <section class="py-16 md:py-24 bg-slate-50/70 border-t border-slate-200/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-14 md:mb-18">
        <span class="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary bg-primary-50/80 px-3.5 py-1.5 rounded-full mb-3 border border-primary-100">
          Voices of Success
        </span>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
          Trusted by <span class="text-primary">Students & Parents</span>
        </h2>
        <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
          Real feedback from students and families who achieved their competitive exam dreams through Manch's guidance.
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <div
          v-for="(item, idx) in testimonials"
          :key="idx"
          class="bg-white rounded-2xl md:rounded-3xl p-7 border border-slate-200/70 shadow-xs hover:shadow-xl hover:shadow-primary-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <!-- Star Rating -->
            <div class="flex items-center gap-1 text-amber-400 mb-5">
              <svg v-for="star in 5" :key="star" class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>

            <!-- Quote Text -->
            <p class="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal italic mb-6">
              "{{ item.quote }}"
            </p>
          </div>

          <!-- Author Info -->
          <div class="flex items-center gap-3 pt-4 border-t border-slate-100">
            <div class="w-10 h-10 rounded-full bg-primary-100/70 text-primary font-black flex items-center justify-center text-sm flex-shrink-0">
              {{ item.avatarText }}
            </div>
            <div>
              <h4 class="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                {{ item.author }}
              </h4>
              <p class="text-[11px] font-medium text-slate-500 mt-0.5">
                {{ item.role }} • {{ item.course }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "TestimonialsSection",
  data() {
    return {
      testimonials: [
        {
          quote: "The personalized doubt solving desk at Manch made all the difference. Faculty members were always approachable, and the chapter DPPs helped me secure 99.61 percentile in MHT-CET.",
          author: "Aayush Pandit",
          role: "Top Ranker",
          course: "MHT-CET Batch",
          avatarText: "AP"
        },
        {
          quote: "As parents, we appreciated the transparency in performance updates. The teachers genuinely care about every child's conceptual understanding rather than merely pushing marks.",
          author: "Mr. Anil Choudhary",
          role: "Parent",
          course: "JEE Advanced Batch",
          avatarText: "AC"
        },
        {
          quote: "Manch's NCERT decoding sessions and full-length simulated mock tests gave me the exact exam temperament needed for competitive entrance. Best coaching institute in Vasai.",
          author: "Prisha Gupta",
          role: "Top Ranker",
          course: "Medical / MHT-CET",
          avatarText: "PG"
        }
      ]
    };
  }
};
</script>

