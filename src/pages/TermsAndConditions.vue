<template>
  <div class="bg-gray-50/50 min-h-screen py-10 sm:py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <!-- Top Action Bar -->
      <div class="flex items-center justify-between">
        <router-link
          to="/"
          class="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </router-link>

        <div class="flex items-center gap-3">
          <!-- Button that opens the top-level Refund Request Modal -->
          <button
            @click="openModal"
            class="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white bg-primary hover:bg-primary-dark px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95 print:hidden"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Request Refund Online</span>
          </button>

          <button
            @click="printPolicy"
            class="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-primary bg-white border border-gray-200 px-3 py-2 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer print:hidden"
          >
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Print</span>
          </button>
        </div>
      </div>

      <!-- Quick Action Callout Card (No need to scroll down) -->
      <div class="bg-gradient-to-r from-blue-900 via-primary-dark to-blue-800 text-white rounded-2xl p-6 sm:p-7 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden border border-blue-700/50">
        <div>
          <span class="inline-block px-2.5 py-0.5 bg-white/15 rounded-full text-[11px] font-bold uppercase tracking-wider text-blue-200 mb-1.5">
            Online Cancellation & Refund Portal
          </span>
          <h2 class="text-lg sm:text-xl font-extrabold text-white">
            Need to Request Admission Cancellation?
          </h2>
          <p class="text-xs sm:text-sm text-blue-100 mt-0.5 max-w-xl">
            You don't need to visit the branch in person. Submit your request through our official 4-step cancellation portal.
          </p>
        </div>

        <button
          @click="openModal"
          class="flex-shrink-0 px-5 py-3 bg-white hover:bg-gray-100 text-primary-dark font-extrabold rounded-xl text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-95 flex items-center gap-2"
        >
          <span>Open Refund Form</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      <!-- Main Terms & Refund Policy Card -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden print:shadow-none print:border-none">
        <!-- Official Header -->
        <div class="p-6 sm:p-10 border-b border-gray-100 text-center relative">
          <div class="flex justify-center mb-4">
            <img
              src="@/assets/manch_logo.jfif"
              alt="Manch Science Classes Logo"
              class="h-16 sm:h-20 w-auto object-contain"
            />
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Manch Science Classes
          </h1>
          <p class="text-sm font-semibold text-primary mt-1">
            (A Division of Pencilbox Education LLP)
          </p>
          <div class="inline-block mt-3 px-4 py-1 bg-amber-50 border border-amber-200/60 rounded-full text-xs font-bold text-amber-800 tracking-wider uppercase">
            Terms, Conditions & Fees Refund Policy
          </div>
        </div>

        <!-- Terms Body Content -->
        <div class="p-6 sm:p-10 space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base">
          <!-- Introduction -->
          <p class="text-gray-600 bg-gray-50 p-4 sm:p-5 rounded-xl border border-gray-100 leading-relaxed">
            At <strong>Manch Science Classes</strong>, we strive to provide the best educational experience for our students. However, we understand that sometimes circumstances change, and you may need to cancel your enrollment. Our refund policy is designed to be fair, transparent, and structured.
          </p>

          <!-- 1. Necessary Deductions -->
          <div>
            <h2 class="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span class="w-7 h-7 rounded-lg bg-blue-50 text-primary flex items-center justify-center text-sm font-bold">1</span>
              Necessary Deductions:
            </h2>
            <div class="pl-2 sm:pl-9">
              <p class="text-gray-700">
                Upon cancellation, necessary deductions will be made for admission fees, stationery, and printed study notes. The total amount for these deductions will <strong>not exceed ₹10,000</strong>.
              </p>
            </div>
          </div>

          <!-- 2. Refund Schedule -->
          <div>
            <h2 class="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span class="w-7 h-7 rounded-lg bg-blue-50 text-primary flex items-center justify-center text-sm font-bold">2</span>
              Refund Schedule (after necessary deductions):
            </h2>
            <div class="pl-2 sm:pl-9 space-y-3">
              <div class="overflow-x-auto rounded-xl border border-gray-200 shadow-xs">
                <table class="w-full text-left text-sm">
                  <thead class="bg-gray-50 text-gray-700 uppercase font-semibold text-xs border-b border-gray-200">
                    <tr>
                      <th class="px-5 py-3.5">Cancellation Timeline</th>
                      <th class="px-5 py-3.5">Refund Percentage</th>
                      <th class="px-5 py-3.5">Applicability</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100">
                    <tr class="hover:bg-blue-50/40 transition-colors">
                      <td class="px-5 py-3.5 font-medium text-gray-900">Within 15 days of taking admission</td>
                      <td class="px-5 py-3.5 font-bold text-emerald-600 text-base">90% Refund</td>
                      <td class="px-5 py-3.5 text-gray-500 text-xs">After necessary deductions</td>
                    </tr>
                    <tr class="hover:bg-blue-50/40 transition-colors">
                      <td class="px-5 py-3.5 font-medium text-gray-900">Within 30 days of taking admission</td>
                      <td class="px-5 py-3.5 font-bold text-blue-600 text-base">70% Refund</td>
                      <td class="px-5 py-3.5 text-gray-500 text-xs">After necessary deductions</td>
                    </tr>
                    <tr class="hover:bg-blue-50/40 transition-colors">
                      <td class="px-5 py-3.5 font-medium text-gray-900">Within 60 days of taking admission</td>
                      <td class="px-5 py-3.5 font-bold text-amber-600 text-base">50% Refund</td>
                      <td class="px-5 py-3.5 text-gray-500 text-xs">After necessary deductions</td>
                    </tr>
                    <tr class="hover:bg-red-50/40 transition-colors">
                      <td class="px-5 py-3.5 font-medium text-gray-900">After 60 days of taking admission</td>
                      <td class="px-5 py-3.5 font-bold text-rose-600 text-base">0% Refund</td>
                      <td class="px-5 py-3.5 text-gray-500 text-xs">No refund applicable</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- 3. Procedure to Request a Refund -->
          <div>
            <h2 class="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span class="w-7 h-7 rounded-lg bg-blue-50 text-primary flex items-center justify-center text-sm font-bold">3</span>
              Procedure to Request a Refund:
            </h2>
            <div class="pl-2 sm:pl-9">
              <ol class="space-y-2 list-decimal list-inside text-gray-700">
                <li class="pl-1 leading-relaxed">
                  Submit a cancellation request directly through our
                  <button @click="openModal" class="text-primary hover:underline font-bold inline-flex items-center gap-1 cursor-pointer">
                    online refund request form
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>,
                  or email our administrative desk (<a href="mailto:contact@manchclasses.in" class="text-primary hover:underline font-medium">contact@manchclasses.in</a>).
                </li>
                <li class="pl-1 leading-relaxed">
                  Include your <strong>Student Name</strong>, <strong>Admission ID / Date</strong>, and <strong>Reason for Cancellation</strong>.
                </li>
                <li class="pl-1 leading-relaxed">
                  Our administrative and accounts team will process your request and calculate the refund amount based on the policy outlined above.
                </li>
              </ol>
            </div>
          </div>

          <!-- 4. Important Notes -->
          <div>
            <h2 class="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span class="w-7 h-7 rounded-lg bg-blue-50 text-primary flex items-center justify-center text-sm font-bold">4</span>
              Important Notes:
            </h2>
            <div class="pl-2 sm:pl-9">
              <ul class="space-y-2 list-disc list-inside text-gray-700">
                <li class="pl-1">
                  Refunds will be processed within <strong>14 business days</strong> of receiving the formal cancellation request.
                </li>
                <li class="pl-1">
                  All approved refunds will be issued strictly via the <strong>original payment method</strong> used during enrollment.
                </li>
              </ul>
            </div>
          </div>

          <!-- Bottom CTA to open modal -->
          <div class="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/80 p-5 rounded-2xl print:hidden">
            <div>
              <h3 class="font-bold text-gray-900 text-sm">Ready to submit a request?</h3>
              <p class="text-xs text-gray-500">Takes less than 2 minutes to fill out.</p>
            </div>
            <button
              @click="openModal"
              class="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm hover:shadow transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
            >
              <span>Submit Refund Request Form</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          <!-- Amendment Right Notice -->
          <div class="pt-2">
            <p class="text-xs text-gray-500 italic bg-amber-50/60 border border-amber-200/50 p-4 rounded-xl text-center">
              Manch Science Classes reserves the right to amend these terms and conditions at any time. Please review regularly to stay informed of any updates.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Stepped, High-End Refund Request Modal Dialog -->
    <RefundRequestModal v-model="isModalOpen" />
  </div>
</template>

<script>
import RefundRequestModal from "../components/common/RefundRequestModal.vue";

export default {
  name: "TermsAndConditions",
  components: {
    RefundRequestModal,
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  mounted() {
    // If URL has #apply or #form, open the modal automatically
    if (window.location.hash === "#apply" || window.location.hash === "#form" || window.location.hash === "#refund-form-section") {
      this.isModalOpen = true;
    }
  },
  methods: {
    printPolicy() {
      window.print();
    },
    openModal() {
      this.isModalOpen = true;
    },
  },
};
</script>

<style scoped>
@media print {
  body {
    background-color: white !important;
  }
}
</style>
