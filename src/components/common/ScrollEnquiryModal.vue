<template>
  <div v-if="!isAdminRoute" class="enquiry-modal-root">
    <!-- Floating WhatsApp Support Button (Bottom-Right, matching reference screenshot) -->
    <a
      href="https://wa.me/918830000914?text=Hello%20Manch%20Classes%2C%20I%20would%20like%20to%20enquire%20about%20admissions%20and%20courses."
      target="_blank"
      rel="noopener noreferrer"
      class="fixed bottom-5 left-5 sm:bottom-7 sm:left-7 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_30px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
      title="Chat on WhatsApp"
      aria-label="Chat on WhatsApp"
    >
      <svg class="w-7 h-7 fill-current" viewBox="0 0 24 24">
        <path
          d="M12.031 2C6.516 2 2.023 6.492 2.023 12.008c0 1.969.57 3.82 1.633 5.414L2 22l4.742-1.602a9.96 9.96 0 005.289 1.508c5.516 0 10.008-4.492 10.008-10.008C22.039 6.492 17.547 2 12.031 2zm0 18.258c-1.648 0-3.234-.477-4.602-1.375l-.328-.219-3.266 1.102 1.109-3.18-.219-.344a8.214 8.214 0 01-1.305-4.434c0-4.555 3.703-8.258 8.258-8.258 4.555 0 8.258 3.703 8.258 8.258 0 4.555-3.703 8.258-8.258 8.258zm4.844-6.195c-.266-.133-1.57-.773-1.813-.86-.242-.086-.422-.133-.602.133s-.695.86-.852 1.039-.312.203-.578.07c-.266-.133-1.125-.414-2.141-1.32-.789-.703-1.328-1.57-1.484-1.836-.156-.266-.016-.41.117-.543.121-.121.266-.312.398-.469s.176-.266.266-.445.043-.336-.023-.469-.602-1.453-.824-1.992c-.219-.523-.441-.453-.602-.461-.156-.008-.336-.008-.516-.008s-.469.066-.715.336c-.246.266-.941.922-.941 2.25s.965 2.613 1.098 2.793c.133.18 1.9 2.902 4.602 4.07 1.836.793 2.551.867 3.473.73.562-.082 1.727-.707 1.973-1.391.246-.684.246-1.27.172-1.391-.07-.121-.246-.199-.512-.332z"
        />
      </svg>
    </a>

    <!-- Modal Overlay -->
    <transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
        @keydown.esc="closeModal"
      >
        <!-- Dark Backdrop -->
        <div
          class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          @click="closeModal"
        ></div>

        <!-- Popup Card Box -->
        <div
          class="relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10 transform transition-all duration-300 scale-100 border border-gray-100 my-auto"
        >
          <!-- Red 'X' Close Button (matching reference image) -->
          <button
            @click="closeModal"
            class="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700 flex items-center justify-center transition-all duration-200 z-20 cursor-pointer active:scale-90"
            aria-label="Close Enquiry Form"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Top Brand Header -->
          <div class="pt-5 pb-3 px-5 sm:px-6 text-center">
            <!-- Manch Science Classes Logo -->
            <div class="flex items-center justify-center mb-2">
              <img
                src="@/assets/manch_logo.jfif"
                alt="Manch Science Classes"
                class="h-12 sm:h-14 w-auto object-contain"
              />
            </div>

            <!-- Title (Matching "Register Now For Enquiry") -->
            <h3 class="text-xl sm:text-2xl font-extrabold text-primary-dark tracking-tight">
              Register Now For Enquiry
            </h3>
            <p class="text-xs text-gray-500 mt-0.5">
              Get personalized counseling for JEE, NEET, MHT-CET & Foundations
            </p>
          </div>

          <!-- Card Content Body -->
          <div class="p-4 sm:p-5 pt-0">
            <!-- Success Confirmation Screen -->
            <div v-if="submitted" class="py-8 px-4 text-center">
              <div class="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3 shadow-sm">
                <svg class="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 class="text-lg font-bold text-gray-900 mb-1">
                Thank You, {{ submittedName }}!
              </h4>
              <p class="text-xs sm:text-sm text-gray-600 mb-5 leading-relaxed">
                Your admission enquiry has been submitted. Our academic counselor will call you back shortly.
              </p>
              <button
                @click="closeModal"
                class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-full text-sm transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Close
              </button>
            </div>

            <!-- Form Container with Inner Styled Graphic Background (matching reference screenshot) -->
            <div
              v-else
              class="relative rounded-2xl overflow-hidden p-4 sm:p-5 text-white shadow-inner bg-gradient-to-b from-primary-950 via-primary-900 to-primary-950 border border-primary-900/40"
            >
              <!-- Abstract Glow Elements in Background -->
              <div class="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl pointer-events-none"></div>
              <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-light/20 rounded-full blur-2xl pointer-events-none"></div>

              <!-- Error Alert -->
              <div
                v-if="errorMessage"
                class="mb-3 p-2 bg-red-500/20 border border-red-500/40 rounded-lg text-xs text-red-200 text-center"
              >
                {{ errorMessage }}
              </div>

              <form @submit.prevent="handleSubmit" class="relative z-10 space-y-3">
                <!-- 1. Name Input -->
                <div>
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="Name"
                    :disabled="loading"
                    class="w-full px-4 py-2.5 rounded-full bg-white text-gray-800 placeholder-gray-400 text-sm font-medium outline-none border border-transparent focus:border-primary-400 focus:ring-2 focus:ring-primary-400/30 transition-all shadow-sm"
                  />
                </div>

                <!-- 2. Select Nearest Branch -->
                <div>
                  <div class="relative">
                    <select
                      v-model="form.branch"
                      required
                      :disabled="loading"
                      class="w-full appearance-none px-4 py-2.5 rounded-full bg-white text-gray-800 text-sm font-medium outline-none border border-transparent focus:border-primary-400 focus:ring-2 focus:ring-primary-400/30 transition-all shadow-sm pr-9 cursor-pointer"
                      :class="{ 'text-gray-400': !form.branch }"
                    >
                      <option value="" disabled selected>Select our Nearest Branch</option>
                      <option value="Vasai East" class="text-gray-800">Vasai East (Agarwal Circle)</option>
                      <option value="Vasai West" class="text-gray-800">Vasai West (Manikpur)</option>
                      <option value="Nallasopara West" class="text-gray-800">Nallasopara West (Sriprastha)</option>
                    </select>
                    <!-- Chevron icon -->
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-gray-500">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- 3. Mobile Number -->
                <div>
                  <input
                    v-model="form.phone"
                    type="tel"
                    required
                    pattern="[6-9][0-9]{9}"
                    placeholder="Mobile"
                    title="Please enter a valid 10-digit mobile number"
                    :disabled="loading"
                    class="w-full px-4 py-2.5 rounded-full bg-white text-gray-800 placeholder-gray-400 text-sm font-medium outline-none border border-transparent focus:border-primary-400 focus:ring-2 focus:ring-primary-400/30 transition-all shadow-sm"
                  />
                </div>

                <!-- 4. Select Standard -->
                <div>
                  <div class="relative">
                    <select
                      v-model="form.currentClass"
                      required
                      :disabled="loading"
                      class="w-full appearance-none px-4 py-2.5 rounded-full bg-white text-gray-800 text-sm font-medium outline-none border border-transparent focus:border-primary-400 focus:ring-2 focus:ring-primary-400/30 transition-all shadow-sm pr-9 cursor-pointer"
                      :class="{ 'text-gray-400': !form.currentClass }"
                    >
                      <option value="" disabled selected>Select Standard</option>
                      <option value="8th" class="text-gray-800">8th Standard (Foundation)</option>
                      <option value="9th" class="text-gray-800">9th Standard (Foundation)</option>
                      <option value="10th" class="text-gray-800">10th Standard (SSC / CBSE)</option>
                      <option value="11th" class="text-gray-800">11th Science (JEE / NEET / CET)</option>
                      <option value="12th" class="text-gray-800">12th Science (JEE / NEET / CET)</option>
                      <option value="JEE / NEET Repeater" class="text-gray-800">JEE / NEET Repeater Batch</option>
                    </select>
                    <!-- Chevron icon -->
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-gray-500">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- 5. Comment Or Message -->
                <div>
                  <textarea
                    v-model="form.message"
                    rows="2"
                    placeholder="Comment Or Message"
                    :disabled="loading"
                    class="w-full px-4 py-2 rounded-2xl bg-white text-gray-800 placeholder-gray-400 text-sm font-medium outline-none border border-transparent focus:border-primary-400 focus:ring-2 focus:ring-primary-400/30 transition-all resize-none shadow-sm"
                  ></textarea>
                </div>

                <!-- 6. Submit Button (Matching "Request A Call Back") -->
                <div class="pt-1">
                  <button
                    type="submit"
                    :disabled="loading"
                    class="w-full py-3 px-5 rounded-full bg-white hover:bg-gray-100 text-primary-dark font-extrabold text-sm sm:text-base tracking-wide transition-all shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer border border-white/60"
                  >
                    <svg
                      v-if="loading"
                      class="h-4 w-4 animate-spin text-primary-dark"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    <span>{{ loading ? 'Submitting...' : 'Request A Call Back' }}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { submitEnquiry } from "../../services/firestoreService";
import { sendEnquiryEmail } from "../../services/emailService";

export default {
  name: "ScrollEnquiryModal",
  data() {
    return {
      isOpen: false,
      loading: false,
      submitted: false,
      submittedName: "",
      errorMessage: null,
      hasTriggeredOnScroll: false,
      scrollHandler: null,
      openEventListener: null,
      form: {
        name: "",
        phone: "",
        branch: "",
        currentClass: "",
        message: "",
      },
    };
  },
  computed: {
    isAdminRoute() {
      return this.$route.path.startsWith("/admin");
    },
  },
  mounted() {
    // Listen for custom trigger from any button across the app
    this.openEventListener = () => this.openModal();
    window.addEventListener("open-enquiry-modal", this.openEventListener);

    // Setup scroll listener to show modal when user scrolls down
    this.setupScrollListener();
  },
  beforeUnmount() {
    if (this.scrollHandler) {
      window.removeEventListener("scroll", this.scrollHandler);
    }
    if (this.openEventListener) {
      window.removeEventListener("open-enquiry-modal", this.openEventListener);
    }
  },
  methods: {
    setupScrollListener() {
      // Don't setup on admin routes
      if (this.isAdminRoute) return;

      // Check if user already dismissed or submitted enquiry in this session
      const alreadyDismissed = sessionStorage.getItem("manch_enquiry_dismissed");
      const alreadySubmitted = sessionStorage.getItem("manch_enquiry_submitted");

      if (alreadyDismissed || alreadySubmitted) {
        return;
      }

      this.scrollHandler = () => {
        if (this.hasTriggeredOnScroll || this.isOpen || this.isAdminRoute) return;

        // Trigger after user scrolls down 320px
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        if (scrollPosition > 320) {
          this.hasTriggeredOnScroll = true;
          // Small delay so it feels natural after scrolling
          setTimeout(() => {
            // Check if Navratri greeting is currently shown; if so, don't overlap
            const navratriOpen = document.querySelector(".navratri-celebration-container .modal-fade-enter-active, .navratri-celebration-container [aria-label='Close greeting']");
            if (!navratriOpen && !this.isAdminRoute) {
              this.openModal();
            }
          }, 600);
        }
      };

      window.addEventListener("scroll", this.scrollHandler, { passive: true });
    },
    openModal() {
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
      sessionStorage.setItem("manch_enquiry_dismissed", "true");
    },
    async handleSubmit() {
      this.loading = true;
      this.errorMessage = null;

      try {
        const payload = {
          name: this.form.name,
          phone: this.form.phone,
          branch: this.form.branch,
          currentClass: this.form.currentClass,
          course: `${this.form.currentClass} (${this.form.branch})`,
          message: this.form.message || `Branch interest: ${this.form.branch}, Standard: ${this.form.currentClass}`,
          source: "Scroll Enquiry Popup",
        };

        // Save to Firestore enquiries collection
        await submitEnquiry(payload);

        // Optimistically dispatch email notification
        try {
          await sendEnquiryEmail(payload);
        } catch (e) {
          console.warn("Email notification error (database save succeeded):", e);
        }

        this.submittedName = this.form.name;
        this.submitted = true;
        sessionStorage.setItem("manch_enquiry_submitted", "true");

        // Auto close after 3 seconds on success
        setTimeout(() => {
          if (this.submitted) {
            this.closeModal();
          }
        }, 3200);
      } catch (err) {
        console.error("Enquiry submission error:", err);
        this.errorMessage = "Failed to submit enquiry. Please check your network and try again.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>

