<template>
  <section
    class="testimonials-section relative isolate overflow-hidden bg-gradient-to-b from-white via-primary-50/30 to-white py-16 sm:py-24 border-t border-slate-200/60"
    aria-labelledby="testimonials-heading"
    @keydown.left="prevTestimonial"
    @keydown.right="nextTestimonial"
  >
    <!-- Background Concentric Circular Orbital Effect -->
    <div class="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden" aria-hidden="true">
      <!-- Ambient Radial Color Glow -->
      <div class="absolute w-[680px] h-[680px] rounded-full bg-gradient-to-tr from-primary-400/10 via-primary-200/15 to-secondary-light/10 blur-3xl transform -translate-y-12"></div>
      
      <!-- Concentric Orbital SVG Rings -->
      <svg class="absolute w-[980px] h-[980px] text-primary-200/40" viewBox="0 0 980 980" fill="none">
        <circle cx="490" cy="490" r="190" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 6" class="animate-orbit-slow" />
        <circle cx="490" cy="490" r="320" stroke="currentColor" stroke-width="1" opacity="0.6" />
        <circle cx="490" cy="490" r="450" stroke="currentColor" stroke-width="1.2" stroke-dasharray="6 8" class="animate-orbit-reverse" opacity="0.4" />
      </svg>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-200/80 text-primary-dark text-xs font-bold uppercase tracking-widest mb-4 shadow-xs">
          <span class="inline-flex items-center justify-center w-4 h-4 rounded-full bg-secondary-light text-primary-950 font-black text-[10px]" aria-hidden="true">★</span>
          <span>Voices of Success</span>
        </div>

        <h2 id="testimonials-heading" class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Loved by Students, <span class="text-primary-dark">Trusted by Parents</span>
        </h2>
        
        <p class="mt-3.5 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Hear firsthand from students and families about their real learning journey, personal guidance, and memorable moments at Manch Science Classes.
        </p>

        <!-- Star summary banner -->
        <div class="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-slate-600">
          <div class="flex items-center gap-1 text-amber-400">
            <svg v-for="star in 5" :key="star" class="w-4 h-4 fill-current drop-shadow-xs" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span class="font-bold text-slate-900">5.0 / 5.0 Rating</span>
          <span class="text-slate-300">•</span>
          <span class="font-medium text-slate-600">Verified Reviews</span>
          <span class="text-slate-300">•</span>
          <button
            type="button"
            @click="toggleViewMode"
            class="font-semibold text-primary-dark underline decoration-primary-300 underline-offset-4 hover:decoration-primary-dark transition-colors cursor-pointer"
          >
            {{ isGridView ? 'Back to Circular Orbit' : 'View All 8 Reviews' }}
          </button>
        </div>
      </div>

      <!-- VIEW MODE 1: CIRCULAR SPOTLIGHT VIEW -->
      <div
        v-if="!isGridView"
        class="relative max-w-4xl mx-auto"
        @mouseenter="pauseAutoplay"
        @mouseleave="resumeAutoplay"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
      >
        <!-- Circular Avatar Track (Orbital Student Selector) -->
        <div class="circular-avatar-track mb-8 sm:mb-10 px-2">
          <div class="flex items-center justify-start sm:justify-center gap-3 sm:gap-4 overflow-x-auto py-3 no-scrollbar" role="tablist" aria-label="Select student testimonial">
            <button
              v-for="(item, idx) in testimonials"
              :key="idx"
              type="button"
              role="tab"
              :aria-selected="idx === currentIndex"
              :aria-label="'View testimonial by ' + item.author"
              @click="selectTestimonial(idx)"
              class="group relative flex flex-col items-center flex-shrink-0 transition-transform duration-300 focus:outline-none"
            >
              <!-- Circular Avatar Container with Circular SVG Progress Ring when active -->
              <div
                class="relative w-13 h-13 sm:w-15 sm:h-15 rounded-full flex items-center justify-center transition-all duration-300"
                :class="idx === currentIndex ? 'scale-110 shadow-lg shadow-primary-500/25 ring-2 ring-primary ring-offset-2 ring-offset-white' : 'opacity-70 hover:opacity-100 hover:scale-105'"
              >
                <!-- Circular Autoplay Progress SVG Ring (Active Item Only) -->
                <svg
                  v-if="idx === currentIndex && !isPaused"
                  class="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] text-primary -rotate-90 pointer-events-none"
                  viewBox="0 0 64 64"
                >
                  <circle
                    cx="32"
                    cy="32"
                    r="29"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    class="transition-all duration-100 ease-linear"
                    :stroke-dasharray="progressCircumference"
                    :stroke-dashoffset="progressOffset"
                  />
                </svg>

                <!-- Avatar Circle with Custom Initials Gradient -->
                <div
                  class="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-inner"
                  :class="item.bgGradient"
                >
                  {{ item.avatarText }}
                </div>
              </div>

              <!-- Compact Student First Name -->
              <span
                class="mt-2 text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-colors duration-200"
                :class="idx === currentIndex ? 'text-primary-dark font-bold' : 'text-slate-500 group-hover:text-slate-700'"
              >
                {{ item.shortName }}
              </span>
            </button>
          </div>
        </div>

        <!-- Featured Circular Testimonial Spotlight Card -->
        <div class="relative">
          <transition name="fade-slide" mode="out-in">
            <div
              :key="currentIndex"
              class="relative bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/90 shadow-xl shadow-slate-900/5 overflow-hidden transition-all duration-300"
            >
              <!-- Ambient Subtle Circular Watermark -->
              <div class="pointer-events-none absolute -right-16 -top-16 w-48 h-48 rounded-full border border-primary-100/60 opacity-60" aria-hidden="true"></div>
              <div class="pointer-events-none absolute -right-8 -top-8 w-32 h-32 rounded-full border border-primary-200/50 opacity-40" aria-hidden="true"></div>

              <!-- Top Row: Quote Icon + Rating + Tag -->
              <div class="flex items-center justify-between gap-4 mb-6 sm:mb-8">
                <!-- Circular Quote Emblem -->
                <div class="flex items-center gap-3">
                  <div class="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary-50 border border-primary-200/70 text-primary flex items-center justify-center shadow-xs flex-shrink-0" aria-hidden="true">
                    <svg class="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <div>
                    <span class="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary-dark bg-primary-50 px-2.5 py-1 rounded-full border border-primary-100">
                      {{ currentItem.tag }}
                    </span>
                  </div>
                </div>

                <!-- 5 Golden Stars Badge -->
                <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50/80 border border-amber-200/60 text-amber-500 text-xs font-bold">
                  <div class="flex items-center gap-0.5">
                    <svg v-for="star in 5" :key="star" class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span class="text-slate-800 font-bold ml-1">5.0</span>
                </div>
              </div>

              <!-- Testimonial Quote Body -->
              <blockquote class="text-slate-800 text-sm sm:text-base lg:text-lg leading-relaxed sm:leading-loose font-normal italic mb-8 sm:mb-10 selection:bg-primary-100">
                “{{ currentItem.quote }}”
              </blockquote>

              <!-- Bottom Author Profile Bar -->
              <div class="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div class="flex items-center gap-3.5">
                  <div
                    class="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-sm shadow-sm flex-shrink-0 ring-2 ring-white"
                    :class="currentItem.bgGradient"
                  >
                    {{ currentItem.avatarText }}
                  </div>
                  <div>
                    <h3 class="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {{ currentItem.author }}
                    </h3>
                    <p class="text-xs sm:text-sm text-slate-500 font-medium">
                      {{ currentItem.role }}
                      <span v-if="currentItem.subRole" class="text-slate-400"> • {{ currentItem.subRole }}</span>
                    </p>
                  </div>
                </div>

                <!-- Verified Badge -->
                <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                  <svg class="w-3.5 h-3.5 fill-current text-emerald-600" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span>Verified Feedback</span>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- Circular Navigation Controls & Dots -->
        <div class="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <!-- Step Counter -->
          <div class="text-xs font-semibold text-slate-500 tracking-wider order-2 sm:order-1">
            <span class="text-primary-dark font-bold text-sm">{{ formattedIndex }}</span>
            <span class="text-slate-300 mx-1.5">/</span>
            <span>0{{ testimonials.length }}</span>
          </div>

          <!-- Circular Navigation Dots -->
          <div class="flex items-center gap-2 order-1 sm:order-2" aria-label="Testimonial slider pagination">
            <button
              v-for="(_, dotIdx) in testimonials"
              :key="'dot-' + dotIdx"
              type="button"
              :aria-label="'Go to testimonial ' + (dotIdx + 1)"
              @click="selectTestimonial(dotIdx)"
              class="h-2.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none"
              :class="dotIdx === currentIndex ? 'w-8 bg-primary-dark' : 'w-2.5 bg-slate-200 hover:bg-slate-300'"
            ></button>
          </div>

          <!-- Circular Buttons: Previous, Autoplay Pause/Play, Next -->
          <div class="flex items-center gap-2 order-3">
            <button
              type="button"
              @click="prevTestimonial"
              class="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-primary-dark hover:border-primary-300 shadow-xs flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer focus:outline-none"
              aria-label="Previous testimonial"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <!-- Autoplay Toggle Button -->
            <button
              type="button"
              @click="toggleAutoPlay"
              class="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-primary-dark shadow-xs flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer focus:outline-none"
              :aria-label="isPaused ? 'Resume auto-rotating testimonials' : 'Pause auto-rotating testimonials'"
            >
              <svg v-if="isPaused" class="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <svg v-else class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            </button>

            <button
              type="button"
              @click="nextTestimonial"
              class="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-primary-dark hover:border-primary-300 shadow-xs flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer focus:outline-none"
              aria-label="Next testimonial"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- VIEW MODE 2: MINIMAL GRID VIEW (ALL 8 STORIES) -->
      <div v-else class="mt-8 transition-all duration-300">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div
            v-for="(item, idx) in testimonials"
            :key="'grid-' + idx"
            class="bg-white rounded-2xl md:rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:shadow-primary-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <!-- Header: Stars + Tag -->
              <div class="flex items-center justify-between gap-2 mb-4">
                <div class="flex items-center gap-1 text-amber-400">
                  <svg v-for="star in 5" :key="star" class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span class="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-primary-dark bg-primary-50 px-2.5 py-0.5 rounded-full border border-primary-100/70">
                  {{ item.tag }}
                </span>
              </div>

              <!-- Quote Body -->
              <p class="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal italic mb-6">
                “{{ item.quote }}”
              </p>
            </div>

            <!-- Author Footer -->
            <div class="pt-4 border-t border-slate-100 flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-xs"
                :class="item.bgGradient"
              >
                {{ item.avatarText }}
              </div>
              <div class="min-w-0">
                <h4 class="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  {{ item.author }}
                </h4>
                <p class="text-[11px] font-medium text-slate-500 truncate">
                  {{ item.role }} <span v-if="item.subRole">• {{ item.subRole }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 text-center">
          <button
            type="button"
            @click="toggleViewMode"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary-200 bg-white text-primary-dark text-xs sm:text-sm font-semibold hover:bg-primary-50 transition-colors shadow-xs"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Switch to Circular Orbit View
          </button>
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
      currentIndex: 0,
      isPaused: false,
      isGridView: false,
      autoPlayTimer: null,
      progressTimer: null,
      progress: 0,
      slideDurationMs: 6000,
      progressIntervalMs: 50,
      touchStartX: 0,
      touchEndX: 0,
      testimonials: [
        {
          author: "Sandeep Chaudhary",
          shortName: "Sandeep",
          role: "Science Student",
          subRole: "Foundation Batch",
          tag: "Inspire Event Attendee",
          avatarText: "SC",
          bgGradient: "bg-gradient-to-br from-blue-500 to-indigo-600",
          quote:
            "Manch Science Classes is an excellent coaching institute for science students. The teachers explain concepts in a simple and easy-to-understand way, making learning enjoyable. They give personal attention to every student, conduct regular tests, and clear doubts patiently. The study material is well-organized and very helpful for exam preparation. I highly recommend Manch Science Classes to anyone looking to build a strong foundation in science. Inspire mai mza aagya!"
        },
        {
          author: "Ruturaj Kashinath Pawar",
          shortName: "Ruturaj",
          role: "Student, Batch: 9th SBA 1",
          subRole: "Parent: Suman Pawar",
          tag: "9th SBA 1 Batch",
          avatarText: "RP",
          bgGradient: "bg-gradient-to-br from-indigo-500 to-purple-600",
          quote:
            "Being a 9th-grade student in the SBA 1 batch at Manch Science Classes (Vasai East), I can confidently say this is one of the best coaching institutes in the area. The teachers explain complex Science and Mathematics concepts in a very simple, step-by-step manner so everyone in class gets a solid grasp on the basics. They give personal attention to clearing individual doubts, and the regular chapter tests keep us well-prepared for our school exams. The study notes provided are extremely helpful for quick revision before tests. On top of great teaching, the environment here is awesome—we get to take breaks, grab snacks, eat together, and bond with batchmates, which keeps the learning environment stress-free and fun! Highly recommended for any 9th or 10th-grade student looking to build a strong foundation! This is the best classes ever I have seen. Love you manch classes 😘"
        },
        {
          author: "Netra",
          shortName: "Netra",
          role: "Student",
          subRole: "Inspire Participant",
          tag: "Inspire Event Attendee",
          avatarText: "N",
          bgGradient: "bg-gradient-to-br from-cyan-500 to-blue-600",
          quote:
            "The teachers are very kind and pure hearted. Not only do they teach but also let the kids have fun. They put their whole hearts into teaching. They also have marvellous events. Like inspire, which we are attending right now. We all are having a lot of fun. The classes have the newest technology. If you want to have some wonderful amount of fun as well as good studies. You should definitely join this classes. Manch people! You did an excellent job building this place. The memories we hold here cannot be compared in any way with anything. The energy is un compared as well."
        },
        {
          author: "Bhargavi Dukhande",
          shortName: "Bhargavi",
          role: "Student",
          subRole: "Concept Clarity & Doubts",
          tag: "Academic Excellence",
          avatarText: "BD",
          bgGradient: "bg-gradient-to-br from-teal-500 to-emerald-600",
          quote:
            "I really like studying at Manch Classes. The teachers explain everything in a simple way and clear all our doubts patiently. I feel it is much better than the home tuition class I went to last year because I understand the topics more easily here. The atmosphere is friendly and motivating, and I enjoy coming to class. Thank you, Manch Classes, for helping me learn better."
        },
        {
          author: "Isha Rajpurhoit",
          shortName: "Isha",
          role: "PCMB Student",
          subRole: "Inspire Participant",
          tag: "PCMB Batch • Inspire Event",
          avatarText: "IR",
          bgGradient: "bg-gradient-to-br from-pink-500 to-rose-600",
          quote:
            "Brooooo, if you want to join the best PCMB coaching, you can join this classes for sure, all the teachers and staff are very charming and kind also specially my all time favorites kapil sir... nd I was also one joining the best event 🎀 called inspire."
        },
        {
          author: "Dhruva Suryavanshi",
          shortName: "Dhruva",
          role: "Student",
          subRole: "Exam Prep & Guidance",
          tag: "Board & Entrance Exams",
          avatarText: "DS",
          bgGradient: "bg-gradient-to-br from-amber-500 to-orange-600",
          quote:
            "Manch science classes is the best classes because they have helped us to get great results in our exam and supported us in this time. The staff is best. And teachers are really great with amazing experience which helped us to understand the concept clearly. I recommend this classes. Thank you so much."
        },
        {
          author: "Prathamesh Jadhav",
          shortName: "Prathamesh",
          role: "Student",
          subRole: "Parent: Asitkumar Jadhav",
          tag: "New Admission",
          avatarText: "PJ",
          bgGradient: "bg-gradient-to-br from-violet-500 to-indigo-600",
          quote:
            "Hi Prathamesh here. I am studying in Manch Science Classes and have joined this year. The teachers are very excellent in teaching."
        },
        {
          author: "Dharmendra Singh",
          shortName: "Dharmendra",
          role: "Parent",
          subRole: "Cyber Sparks",
          tag: "Parent Review",
          avatarText: "DS",
          bgGradient: "bg-gradient-to-br from-emerald-500 to-teal-700",
          quote:
            "I am absolutely delighted with the Manch class that my daughter is attending this year. The class is engaging, well-structured, and has made a significant positive impact on her learning experience. The teaching methods are innovative, and the atmosphere is very supportive. My daughter is excited to attend every session, and I can see her growing academically and personally. Highly recommend it! From-cyber sparks"
        }
      ]
    };
  },
  computed: {
    currentItem() {
      return this.testimonials[this.currentIndex];
    },
    formattedIndex() {
      return this.currentIndex + 1 < 10
        ? `0${this.currentIndex + 1}`
        : `${this.currentIndex + 1}`;
    },
    progressCircumference() {
      // 2 * PI * r (where r = 29)
      return 2 * Math.PI * 29;
    },
    progressOffset() {
      const fraction = this.progress / 100;
      return this.progressCircumference * (1 - fraction);
    }
  },
  mounted() {
    this.startTimers();
  },
  beforeUnmount() {
    this.clearTimers();
  },
  methods: {
    startTimers() {
      this.clearTimers();
      this.progress = 0;
      const stepIncrement = (this.progressIntervalMs / this.slideDurationMs) * 100;

      this.progressTimer = setInterval(() => {
        if (!this.isPaused && !this.isGridView) {
          this.progress += stepIncrement;
          if (this.progress >= 100) {
            this.progress = 0;
            this.nextTestimonial();
          }
        }
      }, this.progressIntervalMs);
    },
    clearTimers() {
      if (this.progressTimer) {
        clearInterval(this.progressTimer);
        this.progressTimer = null;
      }
    },
    selectTestimonial(idx) {
      this.currentIndex = idx;
      this.progress = 0;
    },
    nextTestimonial() {
      this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
      this.progress = 0;
    },
    prevTestimonial() {
      this.currentIndex =
        (this.currentIndex - 1 + this.testimonials.length) %
        this.testimonials.length;
      this.progress = 0;
    },
    toggleAutoPlay() {
      this.isPaused = !this.isPaused;
    },
    pauseAutoplay() {
      this.isPaused = true;
    },
    resumeAutoplay() {
      this.isPaused = false;
    },
    toggleViewMode() {
      this.isGridView = !this.isGridView;
      if (this.isGridView) {
        this.pauseAutoplay();
      } else {
        this.resumeAutoplay();
        this.progress = 0;
      }
    },
    handleTouchStart(e) {
      this.touchStartX = e.changedTouches[0].screenX;
    },
    handleTouchEnd(e) {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    },
    handleSwipe() {
      const deltaX = this.touchEndX - this.touchStartX;
      if (Math.abs(deltaX) > 40) {
        if (deltaX < 0) {
          this.nextTestimonial();
        } else {
          this.prevTestimonial();
        }
      }
    }
  }
};
</script>

<style scoped>
/* Smooth circular transition between cards */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-12px) scale(0.98);
}

/* Hide scrollbar for neat horizontal scroll */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Circular Background Animations */
@keyframes orbitSlow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes orbitReverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

.animate-orbit-slow {
  transform-origin: center;
  animation: orbitSlow 60s linear infinite;
}

.animate-orbit-reverse {
  transform-origin: center;
  animation: orbitReverse 80s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .animate-orbit-slow,
  .animate-orbit-reverse {
    animation: none;
  }
}
</style>
