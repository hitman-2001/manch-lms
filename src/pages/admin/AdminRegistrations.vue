<template>
  <AdminLayout>
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <!-- Page Header & Actions -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 class="text-lg font-bold text-gray-800">MSAT Scholarship Registrations</h2>
          <p class="text-xs text-gray-500 mt-1">
            Manage registrations for the Manch Scholarship Admission Test (MSAT).
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button
            @click="fetchRegistrations"
            class="px-4 py-2 text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <svg class="h-3.5 w-3.5 animate-spin-hover" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <!-- Search & Filters -->
      <div class="mb-6">
        <div class="relative">
          <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search by student name, phone, email, school, or class..."
            class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <!-- Content Area -->
      <!-- Loading State -->
      <div v-if="loading" class="py-12 flex flex-col items-center justify-center">
        <svg class="animate-spin h-8 w-8 text-blue-600 mb-3" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
        <span class="text-sm text-gray-500 font-medium">Fetching registrations...</span>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredRegistrations.length === 0" class="py-16 text-center">
        <div class="h-16 w-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        <h3 class="font-semibold text-gray-800 text-sm">No MSAT registrations found</h3>
        <p class="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
          {{ searchQuery ? "Try adjusting your keywords to find what you're looking for." : "MSAT registrations submitted on the website will appear here." }}
        </p>
      </div>

      <!-- Table View -->
      <div v-else class="overflow-x-auto -mx-6">
        <table class="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr class="bg-gray-50 border-y border-gray-100">
              <th class="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student Name & Class</th>
              <th class="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">School / College</th>
              <th class="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact Info</th>
              <th class="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Preferred Exam Date</th>
              <th class="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Registered On</th>
              <th class="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="reg in filteredRegistrations"
              :key="reg.id"
              class="hover:bg-gray-50/50 transition-colors group"
            >
              <!-- Student Name -->
              <td class="px-6 py-4">
                <div class="font-semibold text-gray-800 text-sm flex items-center gap-1.5">
                  {{ reg.name }}
                  <span class="inline-block h-2 w-2 rounded-full bg-blue-500" title="MSAT Registered"></span>
                </div>
                <div class="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md text-[10px] font-semibold border border-blue-100">
                  Class {{ reg.currentClass || 'N/A' }}
                </div>
              </td>

              <!-- School -->
              <td class="px-6 py-4">
                <span class="text-sm font-medium text-gray-700 block truncate max-w-[200px]" :title="reg.school">
                  {{ reg.school || '—' }}
                </span>
              </td>

              <!-- Contact Info -->
              <td class="px-6 py-4">
                <div class="flex flex-col gap-1">
                  <!-- Phone -->
                  <a
                    :href="'tel:' + reg.phone"
                    class="text-sm text-gray-600 hover:text-blue-600 font-medium flex items-center gap-1.5 w-max"
                  >
                    <svg class="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {{ reg.phone }}
                  </a>
                  <!-- Email -->
                  <a
                    v-if="reg.email"
                    :href="'mailto:' + reg.email"
                    class="text-xs text-gray-400 hover:text-blue-600 flex items-center gap-1.5 w-max"
                  >
                    <svg class="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span class="truncate max-w-[150px]">{{ reg.email }}</span>
                  </a>
                  <span v-else class="text-[10px] text-gray-400 italic">No email provided</span>
                </div>
              </td>

              <!-- Preferred Date -->
              <td class="px-6 py-4">
                <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-800 rounded-lg text-xs font-semibold border border-amber-200">
                  <svg class="h-3.5 w-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ formatPreferredDate(reg.preferredDate) }}
                </span>
              </td>

              <!-- Date -->
              <td class="px-6 py-4 text-xs text-gray-500 font-medium">
                {{ formatDate(reg.createdAt) }}
              </td>

              <!-- Actions -->
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <!-- Details view button -->
                  <button
                    @click="openDetails(reg)"
                    class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                    title="View details"
                  >
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>

                  <!-- Delete -->
                  <button
                    @click="confirmDelete(reg)"
                    class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    title="Delete record"
                  >
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Registration Details Modal -->
    <div
      v-if="selectedRegistration"
      class="fixed inset-0 bg-black/55 z-55 flex items-center justify-center p-4 backdrop-blur-xs transition-opacity"
      @click.self="selectedRegistration = null"
    >
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-blue-700 to-indigo-700 px-6 py-5 text-white flex items-center justify-between">
          <div>
            <h3 class="font-bold text-base">MSAT Scholarship Registration</h3>
            <p class="text-xs text-blue-100 mt-0.5">Registered on {{ formatDate(selectedRegistration.createdAt, true) }}</p>
          </div>
          <button @click="selectedRegistration = null" class="text-white/80 hover:text-white transition-colors">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-5">
          <!-- Student & Class -->
          <div class="grid grid-cols-2 gap-4 pb-4 border-b border-gray-50">
            <div>
              <span class="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Student Name</span>
              <span class="block text-sm font-semibold text-gray-800 mt-1">{{ selectedRegistration.name }}</span>
            </div>
            <div>
              <span class="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Current Class</span>
              <span class="inline-flex items-center mt-1 px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-md text-xs font-semibold border border-blue-100">
                Class {{ selectedRegistration.currentClass || 'N/A' }}
              </span>
            </div>
          </div>

          <!-- School / College -->
          <div class="pb-4 border-b border-gray-50">
            <span class="block text-xs font-semibold text-gray-400 uppercase tracking-wide">School Name</span>
            <span class="block text-sm font-semibold text-gray-800 mt-1">{{ selectedRegistration.school || 'N/A' }}</span>
          </div>

          <!-- Preferred Exam Date -->
          <div class="pb-4 border-b border-gray-50">
            <span class="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Preferred Exam Date</span>
            <span class="inline-flex items-center gap-1.5 mt-1 px-2.5 py-1 bg-amber-50 text-amber-800 rounded-lg text-xs font-semibold border border-amber-200">
              <svg class="h-3.5 w-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ formatPreferredDate(selectedRegistration.preferredDate) }}
            </span>
          </div>

          <!-- Contact Channels -->
          <div>
            <span class="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Outreach Actions</span>
            <div class="flex flex-wrap gap-2.5">
              <!-- Call -->
              <a
                :href="'tel:' + selectedRegistration.phone"
                class="flex items-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-100 text-blue-700 text-xs font-semibold rounded-xl transition-colors"
              >
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call: {{ selectedRegistration.phone }}
              </a>

              <!-- Email -->
              <a
                v-if="selectedRegistration.email"
                :href="'mailto:' + selectedRegistration.email"
                class="flex items-center gap-1.5 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition-colors"
              >
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email: {{ selectedRegistration.email }}
              </a>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            @click="selectedRegistration = null"
            class="px-5 py-2 bg-white hover:bg-gray-100 border border-gray-200 text-sm font-semibold text-gray-700 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="deleteTarget"
      class="fixed inset-0 bg-black/55 z-55 flex items-center justify-center p-4 backdrop-blur-xs"
    >
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
        <h3 class="font-bold text-gray-900 text-base mb-2">Delete Registration?</h3>
        <p class="text-sm text-gray-500 mb-6 leading-relaxed">
          Are you sure you want to permanently delete MSAT Registration for <strong class="text-gray-800">{{ deleteTarget.name }}</strong>? This will remove it from database logs.
        </p>
        <div class="flex gap-3">
          <button
            @click="deleteTarget = null"
            :disabled="deleting"
            class="flex-1 py-2.5 border border-gray-200 hover:bg-gray-50 rounded-xl text-sm font-semibold text-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="handleDelete"
            :disabled="deleting"
            class="flex-1 py-2.5 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <svg v-if="deleting" class="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            {{ deleting ? "Deleting..." : "Confirm Delete" }}
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from "../../components/admin/AdminLayout.vue";
import { getRegistrations, deleteRegistration } from "../../services/firestoreService";
import { showSuccess, showError } from "../../components/common/ToastNotification.vue";

export default {
  name: "AdminRegistrations",
  components: { AdminLayout },
  data() {
    return {
      loading: true,
      registrations: [],
      searchQuery: "",
      selectedRegistration: null,
      deleteTarget: null,
      deleting: false,
    };
  },
  computed: {
    filteredRegistrations() {
      if (!this.searchQuery.trim()) {
        return this.registrations;
      }
      const q = this.searchQuery.toLowerCase();
      return this.registrations.filter(
        (item) =>
          item.name?.toLowerCase().includes(q) ||
          item.phone?.toLowerCase().includes(q) ||
          item.email?.toLowerCase().includes(q) ||
          item.school?.toLowerCase().includes(q) ||
          item.currentClass?.toLowerCase().includes(q)
      );
    },
  },
  async created() {
    await this.fetchRegistrations();
  },
  methods: {
    async fetchRegistrations() {
      this.loading = true;
      try {
        this.registrations = await getRegistrations();
      } catch (err) {
        showError("Failed to fetch registrations", err.message);
      } finally {
        this.loading = false;
      }
    },
    openDetails(reg) {
      this.selectedRegistration = reg;
    },
    confirmDelete(reg) {
      this.deleteTarget = reg;
    },
    async handleDelete() {
      if (!this.deleteTarget) return;
      this.deleting = true;
      try {
        await deleteRegistration(this.deleteTarget.id);
        showSuccess("Registration deleted", "MSAT record successfully removed.");
        this.registrations = this.registrations.filter((item) => item.id !== this.deleteTarget.id);
        if (this.selectedRegistration?.id === this.deleteTarget.id) {
          this.selectedRegistration = null;
        }
        this.deleteTarget = null;
      } catch (err) {
        showError("Failed to delete record", err.message);
      } finally {
        this.deleting = false;
      }
    },
    formatDate(dateVal, showTime = false) {
      if (!dateVal) return "—";
      const date = dateVal instanceof Date ? dateVal : new Date(dateVal);
      if (isNaN(date.getTime())) return "—";

      const options = { year: "numeric", month: "short", day: "numeric" };
      if (showTime) {
        options.hour = "2-digit";
        options.minute = "2-digit";
      }
      return date.toLocaleDateString("en-US", options);
    },
    formatPreferredDate(dateStr) {
      if (!dateStr) return "Not chosen";
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    },
  },
};
</script>
