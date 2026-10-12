<template>
  <nav class="fixed top-0 left-0 w-full bg-white shadow-md z-50 transition-all duration-300">
    <!-- Navratri Festive Announcement Ribbon -->
    <div
      v-if="showNavratriRibbon"
      class="bg-gradient-to-r from-red-700 via-amber-600 to-rose-700 text-white text-[11px] sm:text-xs py-1.5 px-3 sm:px-6 flex items-center justify-between border-b border-amber-300/30 shadow-inner"
    >
      <div class="flex items-center gap-2 mx-auto sm:mx-0 overflow-hidden">
        <span class="animate-bounce">🪔</span>
        <span class="font-bold text-amber-200">शुभ नवरात्रि!</span>
        <span class="hidden sm:inline text-white/95 font-medium">Manch Classes wishes you and your family a blessed Navratri!</span>
        <span class="inline sm:hidden text-white/95 font-medium">Happy Navratri from Manch Classes!</span>
        <button
          @click="triggerNavratriCelebration"
          class="ml-2 inline-flex items-center gap-1 bg-amber-300 hover:bg-amber-200 text-red-950 font-bold px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] shadow hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>Celebrate</span>
          <span>✨</span>
        </button>
      </div>
      <button
        @click="dismissNavratriRibbon"
        class="text-white/80 hover:text-white p-0.5 rounded-full hover:bg-white/10 transition-colors ml-2 flex-shrink-0 cursor-pointer"
        title="Dismiss announcement"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-20">
        <div class="flex items-center">
          <router-link to="/" class="flex-shrink-0 flex items-center py-1">
            <img
              src="@/assets/manch_logo.jfif"
              alt="Manch Science Classes"
              class="h-16 w-auto"
            />
          </router-link>
        </div>
        <!-- src="@/assets/logo.svg" -->

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="text-gray-600 hover:text-primary transition-colors duration-200 font-medium"
            active-class="text-primary font-bold"
          >
            {{ link.name }}
          </router-link>

          <!-- Take Test Dropdown -->
          <div class="relative group">
            <button
              class="flex items-center text-gray-600 hover:text-primary transition-colors duration-200 font-medium focus:outline-none py-2"
            >
              <span>Take Test</span>
              <svg
                class="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div
              class="absolute right-0 mt-1 w-56 bg-white border border-gray-100 rounded-lg shadow-xl py-1.5 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform scale-95 group-hover:scale-100 origin-top-right"
            >
              <a
                href="https://manchiitjeeneet.exambro.app/auth/signIn"
                target="_blank"
                rel="noopener noreferrer"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary font-medium transition-colors"
              >
                Online Test Portal
              </a>
              <div class="h-px bg-gray-100 my-1"></div>
              <a
                href="/manch-classes.apk"
                download
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary font-medium transition-colors"
              >
                Download Android App (APK)
              </a>
            </div>
          </div>

          <!-- PayFees Dropdown -->
          <div class="relative group">
            <button
              class="flex items-center text-gray-600 hover:text-primary transition-colors duration-200 font-medium focus:outline-none py-2"
            >
              <span>PayFees</span>
              <svg
                class="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div
              class="absolute right-0 mt-1 w-56 bg-white border border-gray-100 rounded-lg shadow-xl py-1.5 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform scale-95 group-hover:scale-100 origin-top-right"
            >
              <a
                href="https://app.jodo.in/manch"
                target="_blank"
                rel="noopener noreferrer"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary font-medium transition-colors"
              >
                Parent Login
              </a>
              <div class="h-px bg-gray-100 my-1"></div>
              <a
                href="https://dashboard.jodo.in/login?next=%2Fdashboard%3Ffilters%3DcGFnZT0lMkY%3D"
                target="_blank"
                rel="noopener noreferrer"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary font-medium transition-colors"
              >
                Manch Login (Staff)
              </a>
            </div>
          </div>

          <!-- Festive Navratri Celebration Button -->
          <button
            @click="triggerNavratriCelebration"
            class="hidden lg:flex items-center gap-1.5 bg-gradient-to-r from-amber-500/10 via-rose-500/15 to-amber-500/10 hover:from-amber-500/25 hover:to-rose-500/30 text-amber-800 border border-amber-400/50 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
            title="Celebrate Navratri with Manch Classes"
          >
            <span class="animate-pulse">🪔</span>
            <span>Shubh Navratri</span>
            <span class="text-amber-500">✨</span>
          </button>

          <router-link
            to="/admission"
            class="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-md font-semibold transition-colors duration-200 shadow-sm"
          >
            Admissions
          </router-link>
        </div>

        <!-- Mobile menu button -->
        <div class="flex items-center md:hidden">
          <button
            @click="toggleMobileMenu"
            class="text-gray-600 hover:text-primary focus:outline-none"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                v-if="!isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="isMobileMenuOpen" class="md:hidden bg-white border-t">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          @click="closeMobileMenu"
          class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-blue-50 rounded-md"
          active-class="text-primary bg-blue-50 font-bold"
        >
          {{ link.name }}
        </router-link>

        <!-- Take Test Mobile Links -->
        <div class="border-t border-gray-100 pt-2 mt-2">
          <div
            class="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1"
          >
            Take Test
          </div>
          <a
            href="https://manchiitjeeneet.exambro.app/auth/signIn"
            target="_blank"
            rel="noopener noreferrer"
            @click="closeMobileMenu"
            class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-blue-50 rounded-md"
          >
            Online Test Portal
          </a>
          <a
            href="/manch-classes.apk"
            download
            @click="closeMobileMenu"
            class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-blue-50 rounded-md"
          >
            Download Android App (APK)
          </a>
        </div>

        <!-- PayFees Mobile Links -->
        <div class="border-t border-gray-100 pt-2 mt-2">
          <div
            class="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1"
          >
            PayFees
          </div>
          <a
            href="https://app.jodo.in/manch"
            target="_blank"
            rel="noopener noreferrer"
            @click="closeMobileMenu"
            class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-blue-50 rounded-md"
          >
            Parent Login
          </a>
          <a
            href="https://dashboard.jodo.in/login?next=%2Fdashboard%3Ffilters%3DcGFnZT0lMkY%3D"
            target="_blank"
            rel="noopener noreferrer"
            @click="closeMobileMenu"
            class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-blue-50 rounded-md"
          >
            Manch Login (Staff)
          </a>
        </div>

        <router-link
          to="/admission"
          @click="closeMobileMenu"
          class="block w-full text-left px-3 py-2 text-base font-medium bg-secondary text-white rounded-md mt-2 text-center"
        >
          Admissions
        </router-link>

        <!-- Navratri Mobile Celebration Button -->
        <button
          @click="triggerNavratriCelebrationMobile"
          class="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 text-white font-bold text-sm shadow-md mt-2 active:scale-95 transition-all cursor-pointer"
        >
          <span>🪔</span>
          <span>Shubh Navratri Wishes</span>
          <span>✨</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "MainNavbar",
  data() {
    return {
      showNavratriRibbon: sessionStorage.getItem('manch_navratri_ribbon_dismissed') !== 'true',
      isMobileMenuOpen: false,
      navLinks: [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Courses", path: "/courses" },
        { name: "Faculty", path: "/faculty" },
        { name: "Study Material", path: "/study-material" },
        { name: "Gallery", path: "/gallery" },
        { name: "Results", path: "/results" },
      ],
    };
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    },
    triggerNavratriCelebration() {
      window.dispatchEvent(new CustomEvent('open-navratri-celebration'));
    },
    triggerNavratriCelebrationMobile() {
      this.closeMobileMenu();
      window.dispatchEvent(new CustomEvent('open-navratri-celebration'));
    },
    dismissNavratriRibbon() {
      this.showNavratriRibbon = false;
      sessionStorage.setItem('manch_navratri_ribbon_dismissed', 'true');
    },
  },
};
</script>
