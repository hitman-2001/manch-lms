<template>
  <transition name="modal-backdrop">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      @keydown.esc="closeModal"
    >
      <!-- Dark Frosted Backdrop -->
      <div
        class="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
        @click="closeModal"
      ></div>

      <!-- Modal Card -->
      <div
        class="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 my-auto flex flex-col max-h-[90vh] transform transition-all duration-300 scale-100"
      >
        <!-- Modal Top Header -->
        <div class="px-5 sm:px-7 py-4 border-b border-gray-100 bg-gray-50/70 flex items-center justify-between flex-shrink-0">
          <div class="flex items-center gap-3">
            <img
              src="@/assets/manch_logo.jfif"
              alt="Manch Science Classes"
              class="h-9 sm:h-10 w-auto object-contain"
            />
            <div>
              <h3 class="text-sm sm:text-base font-extrabold text-gray-900 leading-tight">
                Admission Cancellation & Refund
              </h3>
              <p class="text-[11px] text-gray-500 hidden sm:block">
                Manch Science Classes • (A Division of Pencilbox Education LLP)
              </p>
            </div>
          </div>

          <button
            @click="closeModal"
            class="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-600 flex items-center justify-center transition-all cursor-pointer active:scale-95"
            aria-label="Close modal"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Stepper Progress Bar (Only shown before submission) -->
        <div v-if="!submitted" class="px-5 sm:px-7 pt-4 pb-3 bg-white border-b border-gray-100 flex-shrink-0">
          <div class="flex items-center justify-between text-xs mb-2">
            <span class="font-bold text-gray-800">
              Step {{ currentStep }} of 4:
              <span class="text-primary">{{ stepTitles[currentStep - 1] }}</span>
            </span>
            <span class="text-gray-400 font-medium">{{ Math.round((currentStep / 4) * 100) }}% Completed</span>
          </div>

          <!-- Progress Bar Track -->
          <div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div
              class="bg-gradient-to-r from-primary to-blue-600 h-full transition-all duration-300 rounded-full"
              :style="{ width: `${(currentStep / 4) * 100}%` }"
            ></div>
          </div>

          <!-- Mini Step Indicators -->
          <div class="grid grid-cols-4 gap-2 mt-3 text-[11px]">
            <button
              v-for="(title, idx) in stepTitles"
              :key="idx"
              @click="goToStep(idx + 1)"
              :disabled="idx + 1 > maxStepReached"
              class="text-left pb-1 border-b-2 transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
              :class="[
                currentStep === idx + 1
                  ? 'border-primary text-primary font-bold'
                  : currentStep > idx + 1
                  ? 'border-emerald-500 text-emerald-600 font-medium'
                  : 'border-transparent text-gray-400'
              ]"
            >
              <div class="flex items-center gap-1 truncate">
                <span v-if="currentStep > idx + 1">✓</span>
                <span v-else>{{ idx + 1 }}.</span>
                <span class="truncate">{{ title }}</span>
              </div>
            </button>
          </div>
        </div>

        <!-- Modal Body Content -->
        <div class="p-5 sm:p-7 overflow-y-auto flex-grow space-y-5">
          <!-- Success Screen -->
          <div v-if="submitted" class="py-8 text-center space-y-4">
            <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm animate-bounce">
              <svg class="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
              Request Received Successfully!
            </h3>
            <p class="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{{ form.parentName || form.studentName }}</strong>. Your cancellation and refund request for <strong>{{ form.studentName }}</strong> (ID: {{ form.studentId }}) has been recorded and dispatched to <strong>contact@manchclasses.in</strong>.
            </p>

            <div class="bg-gray-50 border border-gray-200/70 rounded-2xl p-4 max-w-md mx-auto text-left text-xs space-y-1.5 text-gray-700">
              <div class="flex justify-between">
                <span class="text-gray-400">Branch:</span>
                <span class="font-semibold">{{ form.branch }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Class & Course:</span>
                <span class="font-semibold">{{ form.currentClass }} ({{ form.courseEnrolled }})</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Total Fees Paid:</span>
                <span class="font-semibold text-emerald-700">₹{{ form.feesPaid }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Registered Mobile:</span>
                <span class="font-semibold">{{ form.phone }}</span>
              </div>
            </div>

            <p class="text-[11px] text-gray-400 max-w-sm mx-auto">
              Our accounts team will verify institute records and reach out within 2 to 3 business days.
            </p>

            <div class="pt-2">
              <button
                @click="closeModal"
                class="px-7 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>

          <!-- Step Forms -->
          <div v-else>
            <!-- Form Error Banner -->
            <div
              v-if="stepError"
              class="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2"
            >
              <svg class="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ stepError }}</span>
            </div>

            <!-- STEP 1: Student Information -->
            <transition name="step-fade" mode="out-in">
              <div v-if="currentStep === 1" key="step1" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <!-- Student Name -->
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">
                      Student's Full Name <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.studentName"
                      type="text"
                      placeholder="As per admission records"
                      class="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                    />
                  </div>

                  <!-- Admission ID -->
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">
                      Admission / Student ID <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.studentId"
                      type="text"
                      placeholder="e.g. MSC-2024-xxxx"
                      class="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                    />
                  </div>

                  <!-- Class -->
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">
                      Class / Standard <span class="text-red-500">*</span>
                    </label>
                    <select
                      v-model="form.currentClass"
                      class="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white"
                    >
                      <option value="" disabled selected>Select class</option>
                      <option v-for="cls in classOptions" :key="cls" :value="cls">{{ cls }}</option>
                    </select>
                  </div>

                  <!-- Board -->
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">
                      Board <span class="text-red-500">*</span>
                    </label>
                    <select
                      v-model="form.board"
                      class="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white"
                    >
                      <option value="" disabled selected>Select board</option>
                      <option value="SSC">SSC (State Board)</option>
                      <option value="CBSE">CBSE</option>
                      <option value="ICSE">ICSE</option>
                      <option value="HSC">HSC (11th/12th)</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <!-- Branch -->
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">
                      Branch Enrolled <span class="text-red-500">*</span>
                    </label>
                    <select
                      v-model="form.branch"
                      class="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white"
                    >
                      <option value="" disabled selected>Select branch</option>
                      <option value="Vasai East">Vasai East (Agarwal Circle)</option>
                      <option value="Vasai West">Vasai West (Manikpur)</option>
                      <option value="Nallasopara West">Nallasopara West (Sriprastha)</option>
                    </select>
                  </div>

                  <!-- Course / Batch -->
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">
                      Course / Batch <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.courseEnrolled"
                      type="text"
                      placeholder="e.g. 10th SSC / 12th JEE / NEET"
                      class="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                    />
                  </div>

                  <!-- Date of Admission -->
                  <div class="sm:col-span-2">
                    <label class="block text-xs font-bold text-gray-700 mb-1">
                      Date of Admission <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.admissionDate"
                      type="date"
                      class="w-full sm:w-1/2 px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white"
                    />
                  </div>
                </div>
              </div>

              <!-- STEP 2: Parent / Guardian Details -->
              <div v-else-if="currentStep === 2" key="step2" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <!-- Parent Name -->
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">
                      Parent / Guardian Full Name <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.parentName"
                      type="text"
                      placeholder="Enter parent full name"
                      class="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                    />
                  </div>

                  <!-- Relationship -->
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">
                      Relationship with Student <span class="text-red-500">*</span>
                    </label>
                    <select
                      v-model="form.relationship"
                      class="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white"
                    >
                      <option value="" disabled selected>Select relationship</option>
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Guardian">Guardian</option>
                    </select>
                  </div>

                  <!-- Mobile Number -->
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">
                      Registered Mobile Number <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.phone"
                      type="tel"
                      pattern="[6-9][0-9]{9}"
                      placeholder="10-digit mobile number"
                      class="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                    />
                  </div>

                  <!-- Email Address -->
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">
                      Email Address <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.email"
                      type="email"
                      placeholder="For updates & confirmation"
                      class="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                    />
                  </div>
                </div>

                <div class="p-3 bg-blue-50/50 rounded-xl border border-blue-100/70 text-[11px] text-gray-600">
                  ℹ️ Institute cancellation and refund updates will be communicated to this phone and email.
                </div>
              </div>

              <!-- STEP 3: Cancellation Details & Fees -->
              <div v-else-if="currentStep === 3" key="step3" class="space-y-4">
                <!-- Reason (No radio buttons per user request) -->
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">
                    Reason for Cancellation <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    v-model="form.cancellationReason"
                    rows="3"
                    placeholder="Please explain the reason for requesting admission cancellation / refund..."
                    class="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                  ></textarea>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <!-- Last Date Attended -->
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">
                      Last Date Attended / Expected <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.lastDateAttended"
                      type="date"
                      class="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white"
                    />
                  </div>

                  <!-- Total Fees Paid -->
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">
                      Total Fees Paid (₹) <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.feesPaid"
                      type="number"
                      min="0"
                      placeholder="Enter total amount paid"
                      class="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                    />
                  </div>

                  <!-- Refund Request Preference -->
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">
                      Are you requesting a refund? <span class="text-red-500">*</span>
                    </label>
                    <select
                      v-model="form.refundRequested"
                      class="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white"
                    >
                      <option value="Yes, I wish to request a refund">Yes, I wish to request a refund</option>
                      <option value="No, cancellation only">No, cancellation only</option>
                      <option value="I would like to know my refund eligibility">I would like to know my refund eligibility</option>
                    </select>
                  </div>

                  <!-- Payment Receipt / Ref -->
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">
                      Payment Receipt / Transaction ID <span class="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      v-model="form.paymentReference"
                      type="text"
                      placeholder="Receipt number or UPI / Jodo ID"
                      class="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                    />
                  </div>
                </div>

                <div class="p-3 bg-amber-50/70 rounded-xl border border-amber-200/60 text-[11px] text-amber-900 leading-relaxed">
                  <strong>Notice:</strong> Refund calculations follow institute schedule (90% within 15 days, 70% within 30 days, 50% within 60 days, 0% after 60 days, minus necessary deductions up to ₹10,000).
                </div>
              </div>

              <!-- STEP 4: Review & Consent -->
              <div v-else-if="currentStep === 4" key="step4" class="space-y-4">
                <div class="bg-gray-50 border border-gray-200/80 rounded-2xl p-4 text-xs space-y-2 text-gray-700">
                  <div class="font-bold text-gray-900 border-b border-gray-200 pb-1.5 flex justify-between items-center">
                    <span>Summary of Your Request</span>
                    <button @click="currentStep = 1" class="text-primary hover:underline font-semibold cursor-pointer">Edit</button>
                  </div>
                  <div class="grid grid-cols-2 gap-x-4 gap-y-1 pt-1">
                    <div><span class="text-gray-400">Student:</span> {{ form.studentName }}</div>
                    <div><span class="text-gray-400">Student ID:</span> {{ form.studentId }}</div>
                    <div><span class="text-gray-400">Branch:</span> {{ form.branch }}</div>
                    <div><span class="text-gray-400">Class & Board:</span> {{ form.currentClass }} ({{ form.board }})</div>
                    <div><span class="text-gray-400">Parent:</span> {{ form.parentName }} ({{ form.relationship }})</div>
                    <div><span class="text-gray-400">Mobile:</span> {{ form.phone }}</div>
                    <div><span class="text-gray-400">Fees Paid:</span> <strong class="text-gray-900">₹{{ form.feesPaid }}</strong></div>
                    <div><span class="text-gray-400">Refund Option:</span> {{ form.refundRequested }}</div>
                  </div>
                </div>

                <!-- 3 Consent Checkboxes -->
                <div class="space-y-2.5 text-xs text-gray-700 pt-1">
                  <label class="flex items-start gap-2.5 cursor-pointer">
                    <input
                      v-model="form.consentAccuracy"
                      type="checkbox"
                      class="mt-0.5 h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                    />
                    <span>I confirm that I am the parent / authorized guardian and that the information submitted is accurate. <span class="text-red-500">*</span></span>
                  </label>

                  <label class="flex items-start gap-2.5 cursor-pointer">
                    <input
                      v-model="form.consentVerification"
                      type="checkbox"
                      class="mt-0.5 h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                    />
                    <span>I understand that cancellation and any refund are subject to verification and institute terms. <span class="text-red-500">*</span></span>
                  </label>

                  <label class="flex items-start gap-2.5 cursor-pointer">
                    <input
                      v-model="form.consentContact"
                      type="checkbox"
                      class="mt-0.5 h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                    />
                    <span>I authorize Manch Science Classes to contact me regarding this request. <span class="text-red-500">*</span></span>
                  </label>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- Modal Bottom Sticky Actions (Only when not submitted) -->
        <div v-if="!submitted" class="px-5 sm:px-7 py-3.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between flex-shrink-0">
          <div>
            <button
              v-if="currentStep > 1"
              @click="prevStep"
              class="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
            >
              Back
            </button>
            <button
              v-else
              @click="closeModal"
              class="px-4 py-2 text-gray-500 hover:text-gray-700 text-xs sm:text-sm font-medium cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-[11px] text-gray-400 hidden sm:inline">
              Sends to: <strong>contact@manchclasses.in</strong>
            </span>

            <button
              v-if="currentStep < 4"
              @click="nextStep"
              class="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>Next</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button
              v-else
              @click="submitFinalRequest"
              :disabled="loading"
              class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <svg
                v-if="loading"
                class="h-4 w-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              <span>{{ loading ? 'Submitting...' : 'Submit Request' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { submitRefundRequest } from "../../services/firestoreService";
import { sendRefundRequestEmail } from "../../services/emailService";

export default {
  name: "RefundRequestModal",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      currentStep: 1,
      maxStepReached: 1,
      loading: false,
      submitted: false,
      stepError: null,
      stepTitles: ["Student Info", "Parent Details", "Cancellation & Fees", "Review & Consent"],
      classOptions: [
        "8th Standard",
        "9th Standard",
        "10th Standard",
        "11th Science",
        "12th Science",
        "NEET Repeater",
        "JEE Repeater",
        "MHT-CET Crash Course",
      ],
      form: {
        studentName: "",
        studentId: "",
        currentClass: "",
        board: "",
        branch: "",
        courseEnrolled: "",
        admissionDate: "",
        parentName: "",
        relationship: "",
        phone: "",
        email: "",
        cancellationReason: "",
        lastDateAttended: "",
        feesPaid: "",
        refundRequested: "Yes, I wish to request a refund",
        paymentReference: "",
        consentAccuracy: false,
        consentVerification: false,
        consentContact: false,
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit("update:modelValue", false);
    },
    goToStep(step) {
      if (step <= this.maxStepReached) {
        this.stepError = null;
        this.currentStep = step;
      }
    },
    validateStep1() {
      if (!this.form.studentName.trim()) return "Please enter the student's full name.";
      if (!this.form.studentId.trim()) return "Please enter the admission or student ID.";
      if (!this.form.currentClass) return "Please select the class or standard.";
      if (!this.form.board) return "Please select the education board.";
      if (!this.form.branch) return "Please select the enrolled branch.";
      if (!this.form.courseEnrolled.trim()) return "Please enter the enrolled course or batch.";
      if (!this.form.admissionDate) return "Please specify the date of admission.";
      return null;
    },
    validateStep2() {
      if (!this.form.parentName.trim()) return "Please enter the parent/guardian name.";
      if (!this.form.relationship) return "Please select relationship with the student.";
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(this.form.phone.trim())) return "Please enter a valid 10-digit mobile number starting with 6-9.";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.form.email.trim())) return "Please enter a valid email address.";
      return null;
    },
    validateStep3() {
      if (!this.form.cancellationReason.trim()) return "Please explain the reason for cancellation.";
      if (!this.form.lastDateAttended) return "Please specify the last date attended or expected.";
      if (!this.form.feesPaid || Number(this.form.feesPaid) <= 0) return "Please enter the total fees paid (numeric amount).";
      return null;
    },
    nextStep() {
      this.stepError = null;
      let error = null;

      if (this.currentStep === 1) error = this.validateStep1();
      else if (this.currentStep === 2) error = this.validateStep2();
      else if (this.currentStep === 3) error = this.validateStep3();

      if (error) {
        this.stepError = error;
        return;
      }

      this.currentStep++;
      if (this.currentStep > this.maxStepReached) {
        this.maxStepReached = this.currentStep;
      }
    },
    prevStep() {
      this.stepError = null;
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    async submitFinalRequest() {
      this.stepError = null;
      if (!this.form.consentAccuracy || !this.form.consentVerification || !this.form.consentContact) {
        this.stepError = "Please check all 3 declaration checkboxes to confirm consent before submitting.";
        return;
      }

      this.loading = true;

      try {
        const payload = {
          ...this.form,
          submittedAt: new Date().toISOString(),
        };

        // 1. Save to Firestore
        await submitRefundRequest(payload);

        // 2. Dispatch email to contact@manchclasses.in
        try {
          await sendRefundRequestEmail(payload);
        } catch (emailErr) {
          console.warn("Email dispatch error (database record saved):", emailErr);
        }

        this.submitted = true;
      } catch (err) {
        console.error("Refund request submission error:", err);
        this.stepError = "Failed to submit request. Please check your network or contact contact@manchclasses.in directly.";
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
      this.form = {
        studentName: "",
        studentId: "",
        currentClass: "",
        board: "",
        branch: "",
        courseEnrolled: "",
        admissionDate: "",
        parentName: "",
        relationship: "",
        phone: "",
        email: "",
        cancellationReason: "",
        lastDateAttended: "",
        feesPaid: "",
        refundRequested: "Yes, I wish to request a refund",
        paymentReference: "",
        consentAccuracy: false,
        consentVerification: false,
        consentContact: false,
      };
      this.currentStep = 1;
      this.maxStepReached = 1;
      this.submitted = false;
      this.stepError = null;
    },
  },
};
</script>

<style scoped>
.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
  transition: opacity 0.25s ease;
}
.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
  opacity: 0;
}

.step-fade-enter-active,
.step-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.step-fade-enter-from {
  opacity: 0;
  transform: translateX(12px);
}
.step-fade-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}
</style>

