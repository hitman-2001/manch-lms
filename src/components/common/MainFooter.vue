<template>
  <footer
    class="bg-[#0a0f1a] text-white pt-12 md:pt-16 pb-8 border-t border-gray-800/50"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 mb-10 md:mb-12"
      >
        <!-- Brand Section (Col 3) -->
        <div class="lg:col-span-3 space-y-5 md:space-y-6">
          <router-link
            to="/"
            class="bg-black p-2.5 inline-block rounded-xl shadow-2xl border border-gray-800 hover:border-primary transition-all duration-300"
          >
            <img
              src="@/assets/header-icon.png"
              alt="Manch Science Classes"
              class="h-10 md:h-12 lg:h-14 w-auto"
            />
          </router-link>
          <p
            class="text-gray-400 text-xs md:text-sm leading-relaxed pr-0 md:pr-4"
          >
            Nurturing Creative Innovators of Tomorrow. We provide an interactive
            learning environment focused on academic excellence and well-rounded
            growth.
          </p>
          <div class="pt-2">
            <a
              href="https://www.instagram.com/manchclasses?igsh=MXJxbjI3YjU5aXp4YQ=="
              target="_blank"
              class="group flex items-center gap-3 w-fit bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full transition-all duration-300"
            >
              <span
                class="p-1.5 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]"
              >
                <svg
                  class="h-3.5 w-3.5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  />
                </svg>
              </span>
              <span
                class="text-[11px] md:text-xs font-semibold text-gray-300 group-hover:text-white transition-colors"
                >Instagram</span
              >
            </a>
          </div>
        </div>

        <!-- Links Section (Col 2) -->
        <div class="lg:col-span-2">
          <h3
            class="text-[11px] md:text-xs font-bold text-white uppercase tracking-[0.2em] mb-5 md:mb-8 border-l-2 border-primary pl-3"
          >
            Navigation
          </h3>
          <ul
            class="grid grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-3.5 text-[12px] md:text-[13px] text-gray-400"
          >
            <li>
              <router-link
                to="/about"
                class="hover:text-primary transition-colors flex items-center gap-2 group"
                ><span
                  class="h-px w-0 bg-primary group-hover:w-3 transition-all"
                ></span
                >About Us</router-link
              >
            </li>
            <li>
              <router-link
                to="/courses"
                class="hover:text-primary transition-colors flex items-center gap-2 group"
                ><span
                  class="h-px w-0 bg-primary group-hover:w-3 transition-all"
                ></span
                >Our Courses</router-link
              >
            </li>
            <li>
              <router-link
                to="/faculty"
                class="hover:text-primary transition-colors flex items-center gap-2 group"
                ><span
                  class="h-px w-0 bg-primary group-hover:w-3 transition-all"
                ></span
                >Our Faculty</router-link
              >
            </li>
            <li>
              <router-link
                to="/results"
                class="hover:text-primary transition-colors flex items-center gap-2 group"
                ><span
                  class="h-px w-0 bg-primary group-hover:w-3 transition-all"
                ></span
                >Results</router-link
              >
            </li>
            <li>
              <router-link
                to="/study-material"
                class="hover:text-primary transition-colors flex items-center gap-2 group"
                ><span
                  class="h-px w-0 bg-primary group-hover:w-3 transition-all"
                ></span
                >Resources</router-link
              >
            </li>
            <li>
              <router-link
                to="/admission"
                class="text-secondary font-bold flex items-center gap-2 group"
                ><span
                  class="h-px w-0 bg-secondary group-hover:w-3 transition-all"
                ></span
                >Admissions</router-link
              >
            </li>
          </ul>
        </div>

        <!-- Branches Section (Col 7) -->
        <div class="lg:col-span-7">
          <h3
            class="text-[11px] md:text-xs font-bold text-white uppercase tracking-[0.2em] mb-5 md:mb-8 border-l-2 border-secondary pl-3"
          >
            Our Branches
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <!-- Vasai East -->
            <div class="space-y-2 md:space-y-3">
              <div class="flex items-center gap-2 text-secondary">
                <svg
                  class="h-3.5 w-3.5 md:h-4 md:w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
                <span
                  class="text-[11px] md:text-xs font-bold uppercase tracking-wider"
                  >Vasai East</span
                >
              </div>
              <p
                class="text-[11px] md:text-[12px] text-gray-400 leading-relaxed font-medium"
              >
                Office no. 8,7,6,5,4,2,1, Vimal Accord, Near fire brigade,
                Agarwal Circle, Vasai East, Palghar 401208.
              </p>
            </div>
            <!-- Vasai West -->
            <div class="space-y-2 md:space-y-3">
              <div class="flex items-center gap-2 text-secondary">
                <svg
                  class="h-3.5 w-3.5 md:h-4 md:w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
                <span
                  class="text-[11px] md:text-xs font-bold uppercase tracking-wider"
                  >Vasai West</span
                >
              </div>
              <p
                class="text-[11px] md:text-[12px] text-gray-400 leading-relaxed font-medium"
              >
                Office no. 302, D'Almeida Landmark, Manikpur, Near Hanuman
                Mandir, Vasai West 401202.
              </p>
            </div>
            <!-- Nallasopara West -->
            <div class="space-y-2 md:space-y-3">
              <div class="flex items-center gap-2 text-secondary">
                <svg
                  class="h-3.5 w-3.5 md:h-4 md:w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
                <span
                  class="text-[11px] md:text-xs font-bold uppercase tracking-wider"
                  >Nallasopara</span
                >
              </div>
              <p
                class="text-[11px] md:text-[12px] text-gray-400 leading-relaxed font-medium"
              >
                Office no. 1-6, first floor, Kartikiya paradise, Road no. 2,
                Sriprastha, Nallasopara West.
              </p>
            </div>
          </div>

          <!-- Bottom Contact Bar -->
          <div
            class="mt-6 md:mt-8 pt-6 border-t border-gray-800/50 flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-x-10 sm:gap-y-3"
          >
            <a
              href="tel:+918830000914"
              class="flex items-center gap-2.5 text-[12px] md:text-[13px] text-gray-300 hover:text-secondary transition-colors"
            >
              <svg
                class="h-4 w-4 text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +91 8830000914
            </a>
            <a
              href="mailto:contact@manchclasses.com"
              class="flex items-center gap-2.5 text-[12px] md:text-[13px] text-gray-300 hover:text-secondary transition-colors"
            >
              <svg
                class="h-4 w-4 text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              contact@manchclasses.com
            </a>
          </div>
        </div>
      </div>

      <div
        class="pt-6 md:pt-8 border-t border-gray-800/50 flex flex-col justify-center items-center gap-4 text-[10px] md:text-[11px] text-gray-500 font-semibold tracking-wider uppercase text-center"
      >
        <p>
          &copy; {{ new Date().getFullYear() }} Manch Science Classes.
          Intelligence meets Innovation.
        </p>
        <!-- <div class="flex gap-6 md:gap-8 text-[10px]">
          <a href="#" class="hover:text-white transition-colors">Privacy</a>
          <a href="#" class="hover:text-white transition-colors">Terms</a>
        </div> -->
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "MainFooter",
};
</script>
