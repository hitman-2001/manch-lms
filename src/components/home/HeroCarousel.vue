<template>
  <div
    class="relative bg-[#0a0f1a] h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px] overflow-hidden mt-4 md:mt-0 flex items-center justify-center"
    @mouseenter="stopAutoPlay"
    @mouseleave="startAutoPlay"
  >
    <!-- Blurred Background Layer -->
    <div class="absolute inset-0 overflow-hidden z-0">
      <img
        v-if="slides.length > 0"
        :src="slides[activeDot].image"
        class="w-full h-full object-cover blur-[40px] scale-125 opacity-40 transition-all duration-1000 ease-in-out"
        alt=""
        aria-hidden="true"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/50 via-[#0a0f1a]/20 to-[#0a0f1a]/90"
      ></div>
    </div>

    <!-- Carousel Track -->
    <div
      class="relative w-full h-full max-w-[1400px] mx-auto flex items-center justify-center z-10 perspective-[1200px]"
    >
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="absolute top-0 bottom-0 py-6 md:py-12 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-center w-full max-w-[85%] sm:max-w-[70%] md:max-w-[55%] lg:max-w-[45%] xl:max-w-[40%]"
        :style="getSlideStyle(index)"
        @click="goToSlide(index)"
      >
        <div
          class="relative w-full h-full flex items-center justify-center cursor-pointer group"
        >
          <img
            :src="slide.image"
            class="max-w-full max-h-full object-contain rounded-2xl md:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700"
            :class="
              index === activeDot
                ? 'group-hover:scale-[1.02] ring-1 ring-white/20 brightness-100'
                : 'brightness-[0.4] opacity-80'
            "
            alt="Carousel Slide"
          />
        </div>
      </div>
    </div>

    <!-- Carousel Controls -->
    <button
      @click="prev"
      class="absolute left-2 sm:left-4 md:left-8 lg:left-12 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/25 border border-white/20 rounded-full p-2 md:p-3 lg:p-4 text-white z-30 transition-all duration-300 shadow-xl group/btn"
      aria-label="Previous Slide"
    >
      <svg
        class="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 transition-transform group-hover/btn:-translate-x-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2.5"
          d="M15 19l-7-7 7-7"
        ></path>
      </svg>
    </button>
    <button
      @click="next"
      class="absolute right-2 sm:right-4 md:right-8 lg:right-12 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/25 border border-white/20 rounded-full p-2 md:p-3 lg:p-4 text-white z-30 transition-all duration-300 shadow-xl group/btn"
      aria-label="Next Slide"
    >
      <svg
        class="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 transition-transform group-hover/btn:translate-x-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2.5"
          d="M9 5l7 7-7 7"
        ></path>
      </svg>
    </button>

    <!-- Navigation Dots -->
    <div
      class="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3 z-30"
    >
      <button
        v-for="(slide, index) in slides"
        :key="'dot' + index"
        @click="goToSlide(index)"
        class="group relative py-2 px-1 focus:outline-none"
        aria-label="Go to slide"
      >
        <div
          :class="[
            'h-1.5 md:h-2 rounded-full transition-all duration-500 shadow-sm',
            activeDot === index
              ? 'w-8 md:w-10 bg-white'
              : 'w-2 md:w-2.5 bg-white/40 group-hover:bg-white/70',
          ]"
        ></div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroCarousel",
  data() {
    return {
      activeDot: 0,
      interval: null,
      windowWidth: window.innerWidth,
      slides: [
        {
          image: new URL("../../assets/carousel/slide1.png", import.meta.url)
            .href,
        },
        {
          image: new URL("../../assets/carousel/slide2.png", import.meta.url)
            .href,
        },
        {
          image: new URL("../../assets/carousel/slide3.png", import.meta.url)
            .href,
        },
        {
          image: new URL("../../assets/carousel/slide4.png", import.meta.url)
            .href,
        },
        {
          image: new URL("../../assets/carousel/slide5.png", import.meta.url)
            .href,
        },
      ],
    };
  },
  mounted() {
    this.startAutoPlay();
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    this.stopAutoPlay();
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    next() {
      this.activeDot = (this.activeDot + 1) % this.slides.length;
    },
    prev() {
      this.activeDot =
        (this.activeDot - 1 + this.slides.length) % this.slides.length;
    },
    goToSlide(index) {
      this.activeDot = index;
    },
    getSlideStyle(index) {
      let diff = index - this.activeDot;
      const len = this.slides.length;

      // Handle wrap around for infinite circular feel
      if (diff > Math.floor(len / 2)) {
        diff -= len;
      } else if (diff < -Math.floor(len / 2)) {
        diff += len;
      }

      const isMobile = this.windowWidth < 768;

      let translateX = 0;
      let scale = 1;
      let opacity = 1;
      let zIndex = 10 - Math.abs(diff);
      let pointerEvents = "auto";

      if (diff === 0) {
        // Active center slide
        translateX = "0%";
        scale = 1;
        opacity = 1;
      } else if (diff === 1) {
        // Right slide
        translateX = isMobile ? "105%" : "65%";
        scale = isMobile ? 0.9 : 0.85;
        opacity = isMobile ? 0 : 0.7;
        if (isMobile) pointerEvents = "none";
      } else if (diff === -1) {
        // Left slide
        translateX = isMobile ? "-105%" : "-65%";
        scale = isMobile ? 0.9 : 0.85;
        opacity = isMobile ? 0 : 0.7;
        if (isMobile) pointerEvents = "none";
      } else {
        // Hidden slides (further out)
        translateX =
          diff > 0
            ? isMobile
              ? "200%"
              : "120%"
            : isMobile
              ? "-200%"
              : "-120%";
        scale = 0.7;
        opacity = 0;
        pointerEvents = "none";
      }

      return {
        transform: `translateX(${translateX}) scale(${scale})`,
        zIndex,
        opacity,
        pointerEvents,
      };
    },
    startAutoPlay() {
      this.stopAutoPlay();
      this.interval = setInterval(this.next, 2000);
    },
    stopAutoPlay() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
  },
};
</script>
