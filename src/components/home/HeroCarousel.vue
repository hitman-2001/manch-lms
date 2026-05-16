<template>
  <div class="relative bg-[#0a0f1a] h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px] overflow-hidden mt-4 md:mt-0" @mouseenter="stopAutoPlay" @mouseleave="startAutoPlay">
    <!-- Carousel Track -->
    <div 
      class="whitespace-nowrap h-full" 
      :class="{ 'transition-transform duration-1000 cubic-bezier(0.4, 0, 0.2, 1)': !isSnapping }"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      @transitionend="handleTransitionEnd"
    >
      <div v-for="(slide, index) in displaySlides" :key="index" class="inline-block w-full h-full relative group">
        <!-- Blurred Background Layer -->
        <div class="absolute inset-0 overflow-hidden">
          <img :src="slide.image" class="w-full h-full object-cover blur-2xl scale-110 opacity-30" alt="" aria-hidden="true" />
          <div class="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/40 via-transparent to-[#0a0f1a]/80"></div>
        </div>

        <!-- Main Poster Image -->
        <div class="relative w-full h-full flex items-center justify-center p-1 sm:p-4 md:p-8 lg:p-12">
          <img 
            :src="slide.image" 
            class="max-w-full max-h-full object-contain shadow-2xl rounded-xl transition-transform duration-700 group-hover:scale-[1.02]" 
            alt="Carousel Slide" 
          />
        </div>
      </div>
    </div>

    <!-- Carousel Controls -->
    <button @click="prev" class="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 rounded-full p-3 text-white z-20 transition-all duration-300 group/btn">
      <svg class="w-6 h-6 md:w-8 md:h-8 transition-transform group-hover/btn:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
    </button>
    <button @click="next" class="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 rounded-full p-3 text-white z-20 transition-all duration-300 group/btn">
      <svg class="w-6 h-6 md:w-8 md:h-8 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
    </button>

    <!-- Navigation Dots -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
      <button v-for="(slide, index) in slides" :key="'dot'+index" 
        @click="goToSlide(index)"
        class="group relative py-2"
      >
        <div :class="['h-1.5 rounded-full transition-all duration-500', activeDot === index ? 'w-8 bg-white' : 'w-2 bg-white/30 group-hover:bg-white/50']"></div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroCarousel',
  data() {
    return {
      currentSlide: 1,
      isSnapping: false,
      interval: null,
      slides: [
        { image: new URL('../../assets/carousel/slide1.png', import.meta.url).href },
        { image: new URL('../../assets/carousel/slide2.png', import.meta.url).href },
        { image: new URL('../../assets/carousel/slide3.png', import.meta.url).href },
        { image: new URL('../../assets/carousel/slide4.png', import.meta.url).href },
        { image: new URL('../../assets/carousel/slide5.png', import.meta.url).href }
      ]
    }
  },
  computed: {
    displaySlides() {
      if (this.slides.length === 0) return [];
      return [
        this.slides[this.slides.length - 1],
        ...this.slides,
        this.slides[0]
      ];
    },
    activeDot() {
      if (this.currentSlide === 0) return this.slides.length - 1;
      if (this.currentSlide > this.slides.length) return 0;
      return this.currentSlide - 1;
    }
  },
  methods: {
    next() {
      if (this.isSnapping) return;
      this.currentSlide++;
    },
    prev() {
      if (this.isSnapping) return;
      this.currentSlide--;
    },
    goToSlide(index) {
      if (this.isSnapping) return;
      this.currentSlide = index + 1;
    },
    handleTransitionEnd() {
      if (this.currentSlide >= this.displaySlides.length - 1) {
        this.isSnapping = true;
        this.currentSlide = 1;
        this.$nextTick(() => {
          setTimeout(() => { this.isSnapping = false; }, 50);
        });
      }
      else if (this.currentSlide <= 0) {
        this.isSnapping = true;
        this.currentSlide = this.slides.length;
        this.$nextTick(() => {
          setTimeout(() => { this.isSnapping = false; }, 50);
        });
      }
    },
    startAutoPlay() {
      this.stopAutoPlay();
      this.interval = setInterval(this.next, 3000);
    },
    stopAutoPlay() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    }
  },
  mounted() {
    this.startAutoPlay();
  },
  beforeUnmount() {
    this.stopAutoPlay();
  }
}
</script>
