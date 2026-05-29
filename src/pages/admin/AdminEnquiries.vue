<template>
  <AdminLayout>
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <!-- Page Header & Actions -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 class="text-lg font-bold text-gray-800">General Admission Enquiries</h2>
          <p class="text-xs text-gray-500 mt-1">
            Manage and contact prospective students who filled out the admission enquiry form.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button
            @click="exportToExcel"
            :disabled="filteredEnquiries.length === 0"
            class="px-4 py-2 text-xs font-medium text-green-700 hover:text-green-800 bg-green-50 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download Excel
          </button>
          <button
            @click="fetchEnquiries"
            class="px-4 py-2 text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <svg class="h-3.5 w-3.5 animate-spin-hover" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <!-- Search & Filters -->
      <div class="mb-6 flex flex-col sm:flex-row gap-4">
        <div class="relative flex-1">
          <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search by student name, phone, email, or course..."
            class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <!-- Month Filter Dropdown -->
        <div v-if="availableMonths.length > 1" class="w-full sm:w-48 flex-shrink-0">
          <select
            v-model="selectedMonth"
            class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all bg-white"
          >
            <option value="All Months">All Months</option>
            <option v-for="month in availableMonths.slice(1)" :key="month" :value="month">
              {{ month }}
            </option>
          </select>
        </div>
      </div>

      <!-- Content Area -->
      <!-- Loading State -->
      <div v-if="loading" class="py-12 flex flex-col items-center justify-center">
        <svg class="animate-spin h-8 w-8 text-blue-600 mb-3" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
        <span class="text-sm text-gray-500 font-medium">Fetching enquiries...</span>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredEnquiries.length === 0" class="py-16 text-center">
        <div class="h-16 w-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0l-3.586-3.586a2 2 0 00-2.828 0L16 16m-2-2l-1.586-1.586a2 2 0 00-2.828 0L8 14m0 0l-3.586-3.586a2 2 0 00-2.828 0L4 16" />
          </svg>
        </div>
        <h3 class="font-semibold text-gray-800 text-sm">No enquiries found</h3>
        <p class="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
          {{ searchQuery ? "Try adjusting your keywords to find what you're looking for." : "Enquiries submitted on the website will appear here." }}
        </p>
      </div>

      <!-- Table View -->
      <div v-else class="overflow-x-auto -mx-6">
        <table class="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr class="bg-gray-50 border-y border-gray-100">
              <th class="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student & Class</th>
              <th class="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Course Interest</th>
              <th class="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact Info</th>
              <th class="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Submitted</th>
              <th class="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Query Message</th>
              <th class="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="enquiry in filteredEnquiries"
              :key="enquiry.id"
              class="hover:bg-gray-50/50 transition-colors group"
            >
              <!-- Student Info -->
              <td class="px-6 py-4">
                <div class="font-semibold text-gray-800 text-sm">{{ enquiry.name }}</div>
                <div class="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md text-[10px] font-semibold border border-blue-100">
                  Class {{ enquiry.currentClass || 'N/A' }}
                </div>
              </td>

              <!-- Course Interest -->
              <td class="px-6 py-4">
                <span class="text-sm font-medium text-gray-700">{{ enquiry.course || 'N/A' }}</span>
              </td>

              <!-- Contact Info -->
              <td class="px-6 py-4">
                <div class="flex flex-col gap-1">
                  <!-- Phone -->
                  <a
                    :href="'tel:' + enquiry.phone"
                    class="text-sm text-gray-600 hover:text-blue-600 font-medium flex items-center gap-1.5 w-max"
                  >
                    <svg class="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {{ enquiry.phone }}
                  </a>
                  <!-- Email -->
                  <a
                    v-if="enquiry.email"
                    :href="'mailto:' + enquiry.email"
                    class="text-xs text-gray-400 hover:text-blue-600 flex items-center gap-1.5 w-max"
                  >
                    <svg class="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span class="truncate max-w-[150px]">{{ enquiry.email }}</span>
                  </a>
                  <span v-else class="text-[10px] text-gray-400 italic">No email provided</span>
                </div>
              </td>

              <!-- Date -->
              <td class="px-6 py-4 text-xs text-gray-500 font-medium">
                {{ formatDate(enquiry.createdAt) }}
              </td>

              <!-- Message Preview -->
              <td class="px-6 py-4 max-w-xs">
                <div class="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {{ enquiry.message || '—' }}
                </div>
                <button
                  v-if="enquiry.message && enquiry.message.length > 50"
                  @click="openDetails(enquiry)"
                  class="text-[10px] font-bold text-blue-600 hover:underline mt-1 block"
                >
                  Read full query
                </button>
              </td>

              <!-- Actions -->
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <!-- Details view button -->
                  <button
                    @click="openDetails(enquiry)"
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
                    @click="confirmDelete(enquiry)"
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

    <!-- Enquiry Details Modal -->
    <div
      v-if="selectedEnquiry"
      class="fixed inset-0 bg-black/55 z-55 flex items-center justify-center p-4 backdrop-blur-xs transition-opacity"
      @click.self="selectedEnquiry = null"
    >
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-5 text-white flex items-center justify-between">
          <div>
            <h3 class="font-bold text-base">Admission Enquiry Details</h3>
            <p class="text-xs text-blue-100 mt-0.5">Submitted on {{ formatDate(selectedEnquiry.createdAt, true) }}</p>
          </div>
          <button @click="selectedEnquiry = null" class="text-white/80 hover:text-white transition-colors">
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
              <span class="block text-sm font-semibold text-gray-800 mt-1">{{ selectedEnquiry.name }}</span>
            </div>
            <div>
              <span class="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Current Class</span>
              <span class="inline-flex items-center mt-1 px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-md text-xs font-semibold border border-blue-100">
                Class {{ selectedEnquiry.currentClass || 'N/A' }}
              </span>
            </div>
          </div>

          <!-- Course Interested -->
          <div class="pb-4 border-b border-gray-50">
            <span class="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Course Interest</span>
            <span class="block text-sm font-semibold text-gray-800 mt-1">{{ selectedEnquiry.course || 'N/A' }}</span>
          </div>

          <!-- School / College -->
          <div v-if="selectedEnquiry.school" class="pb-4 border-b border-gray-50">
            <span class="block text-xs font-semibold text-gray-400 uppercase tracking-wide">School / College</span>
            <span class="block text-sm font-medium text-gray-700 mt-1">{{ selectedEnquiry.school }}</span>
          </div>

          <!-- Contact Channels -->
          <div class="pb-4 border-b border-gray-50">
            <span class="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Contact Actions</span>
            <div class="flex flex-wrap gap-2.5">
              <!-- Call -->
              <a
                :href="'tel:' + selectedEnquiry.phone"
                class="flex items-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-100 text-blue-700 text-xs font-semibold rounded-xl transition-colors"
              >
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call: {{ selectedEnquiry.phone }}
              </a>

              <!-- Email -->
              <a
                v-if="selectedEnquiry.email"
                :href="'mailto:' + selectedEnquiry.email"
                class="flex items-center gap-1.5 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition-colors"
              >
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email: {{ selectedEnquiry.email }}
              </a>
            </div>
          </div>

          <!-- Message -->
          <div>
            <span class="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Student's Query Message</span>
            <div class="bg-gray-50 rounded-2xl p-4 border border-gray-100 mt-2 text-sm text-gray-700 leading-relaxed max-h-[180px] overflow-y-auto whitespace-pre-wrap">
              {{ selectedEnquiry.message || 'No enquiry message written. The student submitted this as a general request to contact them.' }}
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            @click="selectedEnquiry = null"
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
        <h3 class="font-bold text-gray-900 text-base mb-2">Delete Enquiry?</h3>
        <p class="text-sm text-gray-500 mb-6 leading-relaxed">
          Are you sure you want to permanently delete <strong class="text-gray-800">{{ deleteTarget.name }}</strong>'s admission enquiry record? This action cannot be undone.
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
import { getEnquiries, deleteEnquiry } from "../../services/firestoreService";
import { showSuccess, showError } from "../../components/common/ToastNotification.vue";

export default {
  name: "AdminEnquiries",
  components: { AdminLayout },
  data() {
    return {
      loading: true,
      enquiries: [],
      searchQuery: "",
      selectedMonth: "All Months",
      selectedEnquiry: null,
      deleteTarget: null,
      deleting: false,
    };
  },
  computed: {
    filteredEnquiries() {
      let list = this.enquiries;

      // Month filter
      if (this.selectedMonth && this.selectedMonth !== "All Months") {
        list = list.filter((item) => {
          if (!item.createdAt) return false;
          const date = item.createdAt instanceof Date ? item.createdAt : new Date(item.createdAt);
          const mStr = date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
          return mStr === this.selectedMonth;
        });
      }

      // Search keyword filter
      if (this.searchQuery.trim()) {
        const q = this.searchQuery.toLowerCase();
        list = list.filter(
          (item) =>
            item.name?.toLowerCase().includes(q) ||
            item.phone?.toLowerCase().includes(q) ||
            item.email?.toLowerCase().includes(q) ||
            item.course?.toLowerCase().includes(q) ||
            item.currentClass?.toLowerCase().includes(q)
        );
      }
      return list;
    },
    availableMonths() {
      const months = this.enquiries
        .map((item) => {
          if (!item.createdAt) return null;
          const date = item.createdAt instanceof Date ? item.createdAt : new Date(item.createdAt);
          if (isNaN(date.getTime())) return null;
          return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
        })
        .filter(Boolean);
      return ["All Months", ...new Set(months)];
    },
  },
  async created() {
    await this.fetchEnquiries();
  },
  methods: {
    async fetchEnquiries() {
      this.loading = true;
      try {
        this.enquiries = await getEnquiries();
      } catch (err) {
        showError("Failed to fetch enquiries", err.message);
      } finally {
        this.loading = false;
      }
    },
    openDetails(enquiry) {
      this.selectedEnquiry = enquiry;
    },
    confirmDelete(enquiry) {
      this.deleteTarget = enquiry;
    },
    async handleDelete() {
      if (!this.deleteTarget) return;
      this.deleting = true;
      try {
        await deleteEnquiry(this.deleteTarget.id);
        showSuccess("Enquiry deleted", "Record successfully removed.");
        this.enquiries = this.enquiries.filter((item) => item.id !== this.deleteTarget.id);
        if (this.selectedEnquiry?.id === this.deleteTarget.id) {
          this.selectedEnquiry = null;
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
    exportToExcel() {
      if (this.filteredEnquiries.length === 0) return;

      const headers = ["Student Name", "Class", "Course Interest", "Phone", "Email", "School", "Submission Date", "Query Message"];
      const rows = this.filteredEnquiries.map(item => [
        item.name || "",
        item.currentClass || "",
        item.course || "",
        item.phone || "",
        item.email || "",
        item.school || "",
        this.formatDate(item.createdAt, true),
        item.message || ""
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))
      ].join("\n");

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `manch_admission_enquiries_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showSuccess("Excel Exported", "Filtered enquiries downloaded successfully.");
    },
  },
};
</script>
