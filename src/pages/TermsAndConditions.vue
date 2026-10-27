<template>
  <div class="bg-gray-50/50 min-h-screen py-10 sm:py-16 print:py-0 print:bg-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 print:max-w-none print:p-0 print:m-0">
      <!-- Top Action Bar (Hidden in Print) -->
      <div class="flex items-center justify-between print:hidden">
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
          <button
            @click="printPolicy"
            class="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-700 hover:text-primary bg-white hover:bg-gray-50 border border-gray-300 px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer active:scale-95"
            title="Download or Print as Official PDF"
          >
            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      <!-- Main Terms & Refund Policy Document Card -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden print:shadow-none print:border-none print:rounded-none">
        <!-- Official Institutional Letterhead Header -->
        <div class="p-6 sm:p-10 border-b border-gray-200 text-center relative print:p-6 print:border-b-2 print:border-gray-800">
          <div class="flex justify-center mb-4">
            <img
              src="@/assets/manch_logo.jfif"
              alt="Manch Science Classes Logo"
              class="h-16 sm:h-20 w-auto object-contain print:h-16"
            />
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight uppercase print:text-2xl">
            Manch Science Classes
          </h1>
          <p class="text-xs sm:text-sm font-bold text-primary print:text-gray-700 tracking-wider mt-1 uppercase">
            (A Division of Pencilbox Education LLP)
          </p>

          <div class="mt-4 inline-block px-5 py-1.5 bg-blue-50 border border-blue-200/80 rounded-full text-xs font-bold text-blue-900 tracking-wider uppercase print:border print:border-gray-700 print:bg-gray-100">
            Terms, Conditions & Fees Refund Policy
          </div>

          <!-- Document Control Reference Bar (International Standard) -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6 pt-4 border-t border-gray-100 text-[11px] text-gray-500 print:border-t print:border-gray-300 print:text-[10px]">
            <div>
              <span class="block text-gray-400 font-medium">Document ID:</span>
              <strong class="text-gray-800 font-mono">MSC/POL/2026-27/01</strong>
            </div>
            <div>
              <span class="block text-gray-400 font-medium">Academic Session:</span>
              <strong class="text-gray-800">2026 – 2027</strong>
            </div>
            <div>
              <span class="block text-gray-400 font-medium">Admin Office:</span>
              <strong class="text-gray-800">Vasai & Nallasopara</strong>
            </div>
            <div>
              <span class="block text-gray-400 font-medium">Official Contact:</span>
              <strong class="text-gray-800">contact@manchclasses.in</strong>
            </div>
          </div>
        </div>

        <!-- Policy Body Content -->
        <div class="p-6 sm:p-10 space-y-7 text-gray-800 leading-relaxed text-sm sm:text-base print:p-6 print:space-y-6 print:text-xs">
          <!-- Preamble / Introduction -->
          <div class="bg-gray-50 p-4 sm:p-5 rounded-xl border border-gray-100 print:bg-transparent print:border print:border-gray-300 print:p-3 page-break-avoid">
            <p class="text-gray-700 leading-relaxed">
              At <strong>Manch Science Classes</strong> (A Division of Pencilbox Education LLP), we strive to deliver the highest caliber of coaching, mentorship, and educational resources. While our goal is to support every student toward their academic milestones, we recognize that circumstances may arise necessitating enrollment cancellation. This policy establishes a fair, transparent, and structured mechanism for admission withdrawal and fee refund disbursement.
            </p>
          </div>

          <!-- 1. Necessary Deductions -->
          <div class="page-break-avoid">
            <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-2.5 flex items-center gap-2 print:text-sm">
              <span class="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-bold print:border print:border-gray-400">1</span>
              Necessary Deductions:
            </h2>
            <div class="pl-2 sm:pl-8">
              <p class="text-gray-700">
                Upon cancellation of enrollment, necessary administrative and material deductions will be effected to cover non-recoverable commitments, including admission administrative fees, stationery, laboratory reservations, and printed study notes. The cumulative sum of these mandatory deductions will <strong>not exceed ₹10,000</strong>.
              </p>
            </div>
          </div>

          <!-- 2. Refund Schedule Table -->
          <div class="page-break-avoid">
            <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-2.5 flex items-center gap-2 print:text-sm">
              <span class="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-bold print:border print:border-gray-400">2</span>
              Refund Schedule (Calculated after necessary deductions):
            </h2>
            <div class="pl-2 sm:pl-8 space-y-2">
              <div class="overflow-x-auto rounded-xl border border-gray-200 print:border-collapse print:border print:border-gray-400 print:rounded-none">
                <table class="w-full text-left text-xs sm:text-sm print:text-[11px] border-collapse">
                  <thead class="bg-gray-100 text-gray-800 uppercase font-bold text-[11px] border-b border-gray-200 print:bg-gray-200 print:text-black">
                    <tr>
                      <th class="px-4 py-3 border-r border-gray-200 print:border-gray-400">Timeline of Cancellation</th>
                      <th class="px-4 py-3 border-r border-gray-200 print:border-gray-400 text-center">Refund Percentage</th>
                      <th class="px-4 py-3">Applicability & Terms</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 print:divide-gray-400">
                    <tr class="hover:bg-blue-50/40">
                      <td class="px-4 py-3 font-semibold text-gray-900 border-r border-gray-200 print:border-gray-400">
                        Within 15 days of taking admission
                      </td>
                      <td class="px-4 py-3 font-bold text-emerald-700 text-center text-sm sm:text-base print:text-xs border-r border-gray-200 print:border-gray-400">
                        90% Refund
                      </td>
                      <td class="px-4 py-3 text-gray-600 text-xs">
                        Calculated on remaining fees after deduction
                      </td>
                    </tr>
                    <tr class="hover:bg-blue-50/40">
                      <td class="px-4 py-3 font-semibold text-gray-900 border-r border-gray-200 print:border-gray-400">
                        Within 30 days of taking admission
                      </td>
                      <td class="px-4 py-3 font-bold text-blue-700 text-center text-sm sm:text-base print:text-xs border-r border-gray-200 print:border-gray-400">
                        70% Refund
                      </td>
                      <td class="px-4 py-3 text-gray-600 text-xs">
                        Calculated on remaining fees after deduction
                      </td>
                    </tr>
                    <tr class="hover:bg-blue-50/40">
                      <td class="px-4 py-3 font-semibold text-gray-900 border-r border-gray-200 print:border-gray-400">
                        Within 60 days of taking admission
                      </td>
                      <td class="px-4 py-3 font-bold text-amber-700 text-center text-sm sm:text-base print:text-xs border-r border-gray-200 print:border-gray-400">
                        50% Refund
                      </td>
                      <td class="px-4 py-3 text-gray-600 text-xs">
                        Calculated on remaining fees after deduction
                      </td>
                    </tr>
                    <tr class="hover:bg-red-50/30">
                      <td class="px-4 py-3 font-semibold text-gray-900 border-r border-gray-200 print:border-gray-400">
                        After 60 days of taking admission
                      </td>
                      <td class="px-4 py-3 font-bold text-rose-700 text-center text-sm sm:text-base print:text-xs border-r border-gray-200 print:border-gray-400">
                        0% Refund
                      </td>
                      <td class="px-4 py-3 text-gray-500 text-xs">
                        No refund claim admissible under institute terms
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- 3. Procedure to Request a Refund -->
          <div class="page-break-avoid">
            <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-2.5 flex items-center gap-2 print:text-sm">
              <span class="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-bold print:border print:border-gray-400">3</span>
              Procedure to Request a Refund:
            </h2>
            <div class="pl-2 sm:pl-8">
              <ol class="space-y-2 list-decimal list-inside text-gray-700">
                <li class="pl-1 leading-relaxed">
                  Submit a formal cancellation request via the <strong>Submit Refund Request Form</strong> button below, or in person at our administrative office, or via email to <a href="mailto:contact@manchclasses.in" class="text-primary hover:underline font-semibold print:text-black">contact@manchclasses.in</a>.
                </li>
                <li class="pl-1 leading-relaxed">
                  Provide verifiable student credentials: <strong>Student Full Name</strong>, <strong>Admission ID / Date</strong>, enrolled branch, and detailed reason for cancellation.
                </li>
                <li class="pl-1 leading-relaxed">
                  The accounts and central administrative registry will verify dates, fee receipts, and calculate the admissible refund according to the graduated schedule above.
                </li>
              </ol>
            </div>
          </div>

          <!-- 4. Important Notes & Disbursement -->
          <div class="page-break-avoid">
            <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-2.5 flex items-center gap-2 print:text-sm">
              <span class="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-bold print:border print:border-gray-400">4</span>
              Processing Timeline & Disbursement Terms:
            </h2>
            <div class="pl-2 sm:pl-8">
              <ul class="space-y-2 list-disc list-inside text-gray-700">
                <li class="pl-1">
                  Refund disbursements are processed within <strong>14 business days</strong> following formal verification and approval of the cancellation request.
                </li>
                <li class="pl-1">
                  Disbursements are executed strictly via the <strong>original payment method</strong> (bank account, UPI, or card) utilized during initial enrollment.
                </li>
              </ul>
            </div>
          </div>

          <!-- 5. Legal Governance & Amendment Rights -->
          <div class="page-break-avoid">
            <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-2.5 flex items-center gap-2 print:text-sm">
              <span class="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-bold print:border print:border-gray-400">5</span>
              Institutional Governance:
            </h2>
            <div class="pl-2 sm:pl-8">
              <p class="text-gray-600 text-xs italic bg-gray-50 border border-gray-200 p-3.5 rounded-xl print:bg-transparent print:border-gray-400 print:text-[10px]">
                Manch Science Classes reserves the prerogative to amend or revise these terms and conditions. All enrollments and refund requests are subject to the exclusive administrative jurisdiction of the registered offices in Vasai and Nallasopara (Palghar, Maharashtra).
              </p>
            </div>
          </div>

          <!-- Official Signatory Block (Visible in Print Only) -->
          <div class="hidden print:block pt-6 border-t-2 border-gray-800 page-break-avoid">
            <div class="grid grid-cols-2 gap-8 text-[11px]">
              <div>
                <p class="font-bold text-gray-900 uppercase">Issued By:</p>
                <p class="font-semibold text-gray-800 mt-1">Office of Admissions & Student Accounts</p>
                <p class="text-gray-600">Pencilbox Education LLP (Manch Science Classes)</p>
                <p class="text-gray-500 mt-3 font-mono">Date Printed: {{ printDate }}</p>
              </div>
              <div class="text-right">
                <p class="font-bold text-gray-900 uppercase">Authorized Institutional Signatory:</p>
                <div class="h-10 mt-2"></div>
                <p class="border-t border-gray-600 inline-block pt-1 font-semibold text-gray-800 min-w-[200px]">
                  Director / Registrar
                </p>
                <p class="text-gray-500 text-[10px]">Vasai & Nallasopara Administrative Centres</p>
              </div>
            </div>
          </div>

          <!-- Bottom CTA to open modal (The ONLY trigger to open the modal) -->
          <div class="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/90 p-5 rounded-2xl print:hidden">
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
  computed: {
    printDate() {
      return new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
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
  @page {
    size: A4 portrait;
    margin: 12mm 15mm 15mm 15mm;
  }

  body {
    background-color: #ffffff !important;
    color: #0f172a !important;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif !important;
  }

  .page-break-avoid {
    break-inside: avoid !important;
    page-break-inside: avoid !important;
  }

  table {
    border-collapse: collapse !important;
    width: 100% !important;
  }

  th,
  td {
    border: 1px solid #94a3b8 !important;
  }
}
</style>
