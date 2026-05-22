<template>
  <div class="bg-gray-50/50 min-h-screen">
    <!-- Premium Header Hero Section -->
    <div
      class="relative bg-gradient-to-br from-primary-dark via-primary to-blue-800 py-20 text-white overflow-hidden"
    >
      <!-- Background Decorative Blur Rings -->
      <div
        class="absolute -top-24 -left-20 w-96 h-96 bg-primary-light/20 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute -bottom-24 -right-20 w-96 h-96 bg-secondary/15 rounded-full blur-3xl"
      ></div>

      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <span
          class="inline-block text-xs font-bold uppercase tracking-widest bg-white/10 text-secondary-light px-4 py-1.5 rounded-full mb-4 backdrop-blur-sm"
        >
          About Manch Science Classes
        </span>
        <h1
          class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-md"
        >
          Creating Innovators of Tomorrow
        </h1>
        <p
          class="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Nurturing curious minds with the knowledge, skills, and values to
          excel in competitive exams and shape a brighter future.
        </p>
      </div>
    </div>

    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-8 relative z-20"
    >
      <!-- Mission & Vision Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <!-- Mission Card -->
        <div
          class="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 p-8 md:p-10 flex flex-col justify-between group hover:-translate-y-1"
        >
          <div>
            <div
              class="inline-flex items-center justify-center p-3.5 bg-blue-50 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <!-- Target Icon -->
              <svg
                class="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p class="text-gray-600 leading-relaxed text-base">
              We simplify learning through innovation, a strong conceptual
              approach, and value-based education, building a solid foundation
              for academic excellence and lifelong success. Our goal is to
              nurture curious minds with the skills and knowledge to excel in
              competitive exams and beyond.
            </p>
          </div>
          <div class="h-2 w-16 bg-primary rounded-full mt-6"></div>
        </div>

        <!-- Vision Card -->
        <div
          class="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 p-8 md:p-10 flex flex-col justify-between group hover:-translate-y-1"
        >
          <div>
            <div
              class="inline-flex items-center justify-center p-3.5 bg-amber-50 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <!-- Eye / Telescope Icon -->
              <svg
                class="w-8 h-8 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p class="text-gray-600 leading-relaxed text-base">
              To be the nation’s largest and most valued coaching institute,
              built on trust and innovation. We are committed to transforming
              education, empowering students to turn their dreams into reality.
            </p>
          </div>
          <div class="h-2 w-16 bg-secondary rounded-full mt-6"></div>
        </div>
      </div>

      <!-- Core Values Section -->
      <div class="mb-20">
        <div class="text-center mb-12">
          <h2
            class="text-xs font-bold text-primary uppercase tracking-widest mb-2"
          >
            Our Core Values
          </h2>
          <h3 class="text-3xl font-extrabold text-gray-950 sm:text-4xl">
            The Pillars of Our Success
          </h3>
          <p class="mt-3 text-gray-500 max-w-2xl mx-auto">
            We are driven by deep principles that guide our academic practices,
            our mentoring, and our administrative ethics.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Value 1: Student Centric Approach -->
          <div
            class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div
                class="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h4 class="font-bold text-gray-900 text-lg mb-2">
                Student Centric
              </h4>
              <p class="text-gray-600 text-sm leading-relaxed">
                We place students' success and parental collaboration at the
                heart of our educational approach using feedback as a tool for
                progress.
              </p>
            </div>
          </div>

          <!-- Value 2: Empowering Educators -->
          <div
            class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-100 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div
                class="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center text-secondary mb-5 group-hover:bg-secondary group-hover:text-white transition-colors duration-300"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h4 class="font-bold text-gray-900 text-lg mb-2">
                Empowering Educators
              </h4>
              <p class="text-gray-600 text-sm leading-relaxed">
                We create a nurturing environment where teachers grow, innovate,
                and inspire excellence.
              </p>
            </div>
          </div>

          <!-- Value 3: Integrity & Ethics -->
          <div
            class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div
                class="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h4 class="font-bold text-gray-900 text-lg mb-2">
                Integrity & Ethics
              </h4>
              <p class="text-gray-600 text-sm leading-relaxed">
                We uphold honesty, fairness, and transparency in every aspect of
                learning and administration.
              </p>
            </div>
          </div>

          <!-- Value 4: Innovative & Evolving Education -->
          <div
            class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-100 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div
                class="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 mb-5 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4 class="font-bold text-gray-900 text-lg mb-2">
                Innovative Education
              </h4>
              <p class="text-gray-600 text-sm leading-relaxed">
                We adopt modern teaching methods and continuously refine our
                curriculum for excellence.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Founders' Note Section -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <!-- Image Section / Left Column (5 cols) -->
        <div class="lg:col-span-5 w-full">
          <div
            class="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 transition-all duration-300 hover:shadow-2xl"
          >
            <!-- Container keeping natural aspect ratio -->
            <div
              class="relative overflow-hidden rounded-2xl bg-gray-50 flex flex-col justify-between"
            >
              <!-- If image loads successfully -->
              <img
                v-if="!imageError"
                :src="foundersImg"
                @error="handleImageError"
                alt="Founders, Manch Science Classes"
                class="w-full h-auto rounded-xl shadow-sm object-contain"
              />
              <!-- Modern highly stylized SVG representation if image not yet placed or has error -->
              <div
                v-else
                class="w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 text-center text-white min-h-[320px] flex flex-col items-center justify-center relative overflow-hidden"
              >
                <div
                  class="absolute -top-12 -left-12 w-48 h-48 bg-primary/20 rounded-full blur-2xl"
                ></div>
                <div
                  class="absolute -bottom-12 -right-12 w-48 h-48 bg-secondary/20 rounded-full blur-2xl"
                ></div>

                <div
                  class="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center border border-white/20 mb-4 backdrop-blur-sm"
                >
                  <svg
                    class="w-10 h-10 text-secondary-light"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <span
                  class="text-xs uppercase tracking-widest text-secondary font-bold mb-2"
                  >Founders Portrait Placeholder</span
                >
                <p
                  class="text-xs text-gray-300 max-w-xs font-light leading-relaxed"
                >
                  Place your photo in the project assets: <br />
                  <code
                    class="bg-black/30 px-1.5 py-0.5 rounded text-white text-xs mt-1 inline-block"
                    >src/assets/founders.png</code
                  >
                </p>
              </div>
            </div>

            <!-- Optional subtle image caption -->
            <div
              class="text-center mt-3 pt-2 border-t border-gray-50"
              v-if="!imageError"
            >
              <p
                class="text-xs font-semibold text-gray-500 tracking-wider uppercase"
              >
                Founders
              </p>
            </div>
          </div>
        </div>

        <!-- Content Section / Right Column (7 cols) -->
        <div class="lg:col-span-7 w-full">
          <div
            class="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-12 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-2xl"
          >
            <div>
              <div class="flex items-center space-x-2 mb-6">
                <span class="h-px w-8 bg-secondary"></span>
                <span
                  class="text-sm font-bold text-secondary uppercase tracking-widest"
                  >Founders’ Note</span
                >
              </div>

              <!-- Styled blockquote look with custom quotation symbol -->
              <div class="relative">
                <!-- Large Elegant Quotes Background Symbol -->
                <span
                  class="absolute -top-10 -left-6 text-9xl text-gray-100 font-serif pointer-events-none select-none z-0"
                  >“</span
                >

                <div
                  class="relative z-10 space-y-6 text-gray-700 leading-relaxed text-base font-light"
                >
                  <p>
                    At
                    <strong class="font-semibold text-gray-900"
                      >Manch Science Classes</strong
                    >, we believe education is about building strong foundations
                    and inspiring a love for learning. Through conceptual
                    clarity, innovation, and a student-focused approach, we help
                    students excel in JEE, NEET, board exams, and beyond.
                  </p>
                  <p>
                    We strongly believe in
                    <span class="font-medium text-primary"
                      >experiential learning</span
                    >, where students learn through practical understanding and
                    real-world application of concepts. This approach enhances
                    curiosity, strengthens problem-solving abilities, improves
                    retention, and makes learning more engaging and meaningful.
                  </p>
                  <p
                    class="italic text-gray-600 font-normal border-l-4 border-secondary/50 pl-4 bg-gray-50/50 py-2"
                  >
                    With dedicated mentors, modern teaching methods, and values
                    of integrity and transparency, we strive to create the best
                    learning experience, shaping young minds for a brighter
                    future and
                    <strong class="font-bold text-gray-900"
                      >‘Creating Innovators of Tomorrow.’</strong
                    >
                  </p>
                </div>
              </div>
            </div>

            <!-- Signature block -->
            <div
              class="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between"
            >
              <div>
                <p class="text-lg font-bold text-gray-950">Founders</p>
                <p class="text-sm text-gray-500 font-medium">
                  Manch Science Classes
                </p>
              </div>
              <!-- Abstract gold/blue academic seal stamp decoration -->
              <div
                class="w-14 h-14 rounded-full border border-secondary-light/30 bg-amber-50/30 flex items-center justify-center text-secondary-dark"
              >
                <svg
                  class="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
  data() {
    return {
      foundersImg: new URL("../assets/founders.png", import.meta.url).href,
      imageError: false,
    };
  },
  methods: {
    handleImageError() {
      this.imageError = true;
    },
  },
};
</script>
