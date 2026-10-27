<template>
  <nav class="fixed top-0 left-0 w-full bg-white shadow-md z-50">
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

        <!-- Desktop & Tablet Menu -->
        <div class="hidden md:flex items-center space-x-3 lg:space-x-6 text-sm lg:text-base">
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
          <div class="relative group" @mouseleave="isTakeTestOpen = false">
            <button
              type="button"
              @click.stop="toggleTakeTest"
              class="flex items-center text-gray-600 hover:text-primary transition-colors duration-200 font-medium focus:outline-none py-2 cursor-pointer"
              :class="{ 'text-primary font-bold': isTakeTestOpen }"
            >
              <span>Take Test</span>
              <svg
                class="ml-1 h-4 w-4 transition-transform duration-200"
                :class="{ 'rotate-180': isTakeTestOpen, 'group-hover:rotate-180': true }"
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
              class="absolute right-0 mt-1 w-56 bg-white border border-gray-100 rounded-lg shadow-xl py-1.5 z-50 transition-all duration-200 transform origin-top-right"
              :class="[
                isTakeTestOpen
                  ? 'opacity-100 visible scale-100 pointer-events-auto'
                  : 'opacity-0 invisible scale-95 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:scale-100 group-hover:pointer-events-auto'
              ]"
            >
              <a
                href="https://manchiitjeeneet.exambro.app/auth/signIn"
                target="_blank"
                rel="noopener noreferrer"
                @click="closeDropdowns"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary font-medium transition-colors"
              >
                Online Test Portal
              </a>
              <div class="h-px bg-gray-100 my-1"></div>
              <a
                href="/manch-classes.apk"
                download
                @click="closeDropdowns"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary font-medium transition-colors"
              >
                Download Android App (APK)
              </a>
            </div>
          </div>

          <!-- PayFees Dropdown -->
          <div class="relative group" @mouseleave="isPayFeesOpen = false">
            <button
              type="button"
              @click.stop="togglePayFees"
              class="flex items-center text-gray-600 hover:text-primary transition-colors duration-200 font-medium focus:outline-none py-2 cursor-pointer"
              :class="{ 'text-primary font-bold': isPayFeesOpen }"
            >
              <span>PayFees</span>
              <svg
                class="ml-1 h-4 w-4 transition-transform duration-200"
                :class="{ 'rotate-180': isPayFeesOpen, 'group-hover:rotate-180': true }"
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
              class="absolute right-0 mt-1 w-56 bg-white border border-gray-100 rounded-lg shadow-xl py-1.5 z-50 transition-all duration-200 transform origin-top-right"
              :class="[
                isPayFeesOpen
                  ? 'opacity-100 visible scale-100 pointer-events-auto'
                  : 'opacity-0 invisible scale-95 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:scale-100 group-hover:pointer-events-auto'
              ]"
            >
              <a
                href="https://app.jodo.in/manch"
                target="_blank"
                rel="noopener noreferrer"
                @click="closeDropdowns"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary font-medium transition-colors"
              >
                Parent Login
              </a>
              <div class="h-px bg-gray-100 my-1"></div>
              <a
                href="https://dashboard.jodo.in/login?next=%2Fdashboard%3Ffilters%3DcGFnZT0lMkY%3D"
                target="_blank"
                rel="noopener noreferrer"
                @click="closeDropdowns"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary font-medium transition-colors"
              >
                Manch Login (Staff)
              </a>
            </div>
          </div>

          <router-link
            to="/admission"
            class="bg-secondary hover:bg-secondary-dark text-white px-3.5 lg:px-4 py-2 rounded-md font-semibold transition-colors duration-200 shadow-sm text-xs sm:text-sm lg:text-base whitespace-nowrap"
          >
            Admissions
          </router-link>
        </div>

        <!-- Mobile menu button -->
        <div class="flex items-center md:hidden">
          <button
            @click="toggleMobileMenu"
            class="text-gray-600 hover:text-primary focus:outline-none"
            aria-label="Toggle menu"
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
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "MainNavbar",
  data() {
    return {
      isMobileMenuOpen: false,
      isTakeTestOpen: false,
      isPayFeesOpen: false,
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
  watch: {
    $route() {
      this.closeDropdowns();
      this.closeMobileMenu();
    },
  },
  mounted() {
    this.handleOutsideClick = (e) => {
      if (!this.$el.contains(e.target)) {
        this.closeDropdowns();
      }
    };
    document.addEventListener("click", this.handleOutsideClick);
  },
  beforeUnmount() {
    if (this.handleOutsideClick) {
      document.removeEventListener("click", this.handleOutsideClick);
    }
  },
  methods: {
    toggleTakeTest() {
      this.isTakeTestOpen = !this.isTakeTestOpen;
      this.isPayFeesOpen = false;
    },
    togglePayFees() {
      this.isPayFeesOpen = !this.isPayFeesOpen;
      this.isTakeTestOpen = false;
    },
    closeDropdowns() {
      this.isTakeTestOpen = false;
      this.isPayFeesOpen = false;
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    },
  },
};
</script>
