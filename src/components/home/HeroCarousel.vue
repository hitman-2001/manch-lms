<template>
  <section
    class="admissions-hero relative isolate overflow-hidden border-b border-primary-200/60 py-8 sm:py-10 xl:py-12"
    aria-labelledby="home-title"
  >
    <div class="relative mx-auto grid w-full max-w-[1440px] items-center gap-7 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.7fr] lg:gap-9 lg:px-8 xl:px-12">
      <div class="max-w-xl">
        <p class="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-dark">
          <span class="h-2 w-2 rounded-full bg-secondary" aria-hidden="true"></span>
          Admissions at Manch
        </p>
        <h1 id="home-title" class="text-3xl font-bold leading-[1.15] tracking-tight text-primary-950 sm:text-4xl lg:text-[2.75rem] xl:text-5xl">
          Your next chapter<br class="hidden lg:block" /> starts with <span class="text-primary-dark">the right guidance.</span>
        </h1>
        <p class="mt-4 max-w-lg text-base leading-7 text-slate-600 xl:text-lg xl:leading-8">
          Prepare for JEE, NEET, MHT-CET and school boards with Manch Science Classes. Let's find the right course for you.
        </p>
        <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <router-link to="/admission" class="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-md shadow-primary-900/10 transition-colors hover:bg-primary-dark xl:text-base">
            Enquire for Admission
            <svg class="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </router-link>
          <router-link to="/courses" class="inline-flex min-h-12 items-center justify-center rounded-xl border border-primary-200 bg-white/70 px-5 py-3 text-sm font-semibold text-primary-dark transition-colors hover:bg-white xl:text-base">
            Explore Courses
          </router-link>
        </div>
        <div class="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          <span class="text-slate-600">Have a question?</span>
          <a href="tel:+918830000914" class="inline-flex min-h-11 items-center rounded font-semibold text-primary-dark underline decoration-primary-300 underline-offset-4 hover:decoration-primary-dark">Call 883 0000 914</a>
        </div>
      </div>

      <div
        class="banner-panel min-w-0 rounded-2xl border border-white/80 p-2.5 sm:p-3"
        aria-label="Manch Science Classes highlights"
        aria-roledescription="carousel"
        role="region"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
      >
      <div class="relative aspect-[1812/868] overflow-hidden rounded-xl border border-primary-200/60 bg-primary-100 shadow-sm">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none"
          :class="index === activeDot ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'"
          :aria-hidden="index !== activeDot"
          role="group"
          aria-roledescription="slide"
          :aria-label="(index + 1) + ' of ' + slides.length"
        >
          <img
            :src="slide.image"
            class="h-full w-full object-contain"
            :alt="'Manch Science Classes banner ' + (index + 1)"
            width="1812"
            height="868"
            :fetchpriority="index === 0 ? 'high' : 'auto'"
            decoding="async"
          />
        </div>
      </div>

      <div class="mt-1 flex flex-wrap items-center justify-center gap-x-3 sm:justify-between">
        <div class="flex items-center justify-center gap-0.5" aria-label="Choose a banner">
          <button
            v-for="(slide, index) in slides"
            :key="'dot-' + index"
            type="button"
            @click="goToSlide(index)"
            class="flex h-11 w-4 cursor-pointer items-center justify-center rounded sm:w-5"
            :aria-label="'Go to banner ' + (index + 1)"
            :aria-current="activeDot === index ? 'true' : undefined"
          >
            <span
              class="h-1.5 rounded-full transition-all motion-reduce:transition-none"
              :class="activeDot === index ? 'w-4 bg-primary-dark' : 'w-1.5 bg-primary-400/70'"
            ></span>
          </button>
        </div>
        <div class="flex items-center gap-1">
          <button type="button" @click="prev" class="carousel-control" aria-label="Previous banner">
            <svg class="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            @click="toggleAutoPlay"
            class="carousel-control carousel-playback"
            :aria-label="isPaused ? 'Resume banner slideshow' : 'Pause banner slideshow'"
          >
            <svg class="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="isPaused" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5l11 7-11 7V5z" />
              <path v-else stroke-linecap="round" stroke-width="2" d="M9 5v14M15 5v14" />
            </svg>
          </button>
          <button type="button" @click="next" class="carousel-control" aria-label="Next banner">
            <svg class="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroCarousel",
  data() {
    return {
      activeDot: 0,
      isPaused: false,
      interval: null,
      touchStartX: 0,
      touchEndX: 0,
      slides: [
        {
          image: new URL("../../assets/carousel/slide1.jpg?v=5", import.meta.url).href,
        },
        {
          image: new URL("../../assets/carousel/slide2.jpg?v=5", import.meta.url).href,
        },
        {
          image: new URL("../../assets/carousel/slide3.jpg?v=5", import.meta.url).href,
        },
        {
          image: new URL("../../assets/carousel/slide4.jpg?v=5", import.meta.url).href,
        },
        {
          image: new URL("../../assets/carousel/slide5.jpg?v=5", import.meta.url).href,
        },
        {
          image: new URL("../../assets/carousel/slide6.jpg?v=5", import.meta.url).href,
        },
        {
          image: new URL("../../assets/carousel/slide7.jpg?v=5", import.meta.url).href,
        },
        {
          image: new URL("../../assets/carousel/slide8.jpg?v=5", import.meta.url).href,
        },
        {
          image: new URL("../../assets/carousel/slide9.jpg?v=5", import.meta.url).href,
        },
        {
          image: new URL("../../assets/carousel/slide10.jpg?v=5", import.meta.url).href,
        },
        {
          image: new URL("../../assets/carousel/slide11.jpg?v=5", import.meta.url).href,
        },
        {
          image: new URL("../../assets/carousel/slide12.jpg?v=5", import.meta.url).href,
        },
      ],
    };
  },
  mounted() {
    this.startAutoPlay();
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
  },
  beforeUnmount() {
    this.stopAutoPlay();
    document.removeEventListener("visibilitychange", this.handleVisibilityChange);
  },
  methods: {
    toggleAutoPlay() {
      this.isPaused = !this.isPaused;
      this.startAutoPlay();
    },
    next() {
      this.activeDot = (this.activeDot + 1) % this.slides.length;
      this.startAutoPlay();
    },
    prev() {
      this.activeDot =
        (this.activeDot - 1 + this.slides.length) % this.slides.length;
      this.startAutoPlay();
    },
    goToSlide(index) {
      this.activeDot = index;
      this.startAutoPlay();
    },
    startAutoPlay() {
      this.stopAutoPlay();
      if (this.isPaused || document.hidden || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      this.interval = setInterval(() => {
        this.activeDot = (this.activeDot + 1) % this.slides.length;
      }, 3500);
    },
    stopAutoPlay() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
    handleVisibilityChange() {
      if (document.hidden) {
        this.stopAutoPlay();
      } else {
        this.startAutoPlay();
      }
    },
    handleTouchStart(e) {
      if (e.changedTouches && e.changedTouches[0]) {
        this.touchStartX = e.changedTouches[0].screenX;
      }
    },
    handleTouchEnd(e) {
      if (e.changedTouches && e.changedTouches[0]) {
        this.touchEndX = e.changedTouches[0].screenX;
        const diff = this.touchStartX - this.touchEndX;
        if (diff > 45) {
          this.next(); // swipe left -> next
        } else if (diff < -45) {
          this.prev(); // swipe right -> prev
        }
      }
    },
  },
};
</script>

<style scoped>
.admissions-hero {
  background: linear-gradient(115deg, var(--color-primary-50) 0%, color-mix(in srgb, var(--color-primary-100) 65%, var(--color-primary-50)) 48%, var(--color-primary-200) 100%);
}
.admissions-hero::before {
  content: "";
  position: absolute;
  width: 42rem;
  height: 42rem;
  right: -16rem;
  top: -24rem;
  border: 1px solid color-mix(in srgb, var(--color-primary) 15%, transparent);
  border-radius: 50%;
  box-shadow: 0 0 0 4rem color-mix(in srgb, var(--color-primary) 4%, transparent), 0 0 0 8rem color-mix(in srgb, var(--color-primary) 3%, transparent);
  pointer-events: none;
  z-index: -1;
}
.banner-panel {
  background: linear-gradient(145deg, rgb(255 255 255 / 65%), color-mix(in srgb, var(--color-primary-300) 35%, transparent));
  box-shadow: 0 16px 40px -24px color-mix(in srgb, var(--color-primary-800) 45%, transparent);
}
.carousel-control {
  display: inline-flex;
  width: 2.75rem;
  height: 2.75rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  color: var(--color-primary-dark);
  cursor: pointer;
  transition: background-color 150ms;
}
.carousel-control:hover {
  background: var(--color-primary-100);
}
@media (prefers-reduced-motion: reduce) {
  .carousel-control { transition: none; }
  .carousel-playback { display: none; }
}
</style>
