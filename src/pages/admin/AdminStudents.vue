<template>
  <AdminLayout>
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <!-- Page Header & Actions -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 class="text-lg font-bold text-gray-800">Registered Students Log</h2>
          <p class="text-xs text-gray-500 mt-1">
            View and manage students who submitted their details to access/download study materials.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button
            @click="exportToExcel"
            :disabled="filteredStudents.length === 0"
            class="px-4 py-2 text-xs font-medium text-green-700 hover:text-green-800 bg-green-50 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download Excel
          </button>
          <button
            @click="fetchStudents"
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
            placeholder="Search by student name, phone, school, or class..."
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
        <span class="text-sm text-gray-500 font-medium">Fetching students list...</span>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredStudents.length === 0" class="py-16 text-center">
        <div class="h-16 w-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <h3 class="font-semibold text-gray-800 text-sm">No registered students found</h3>
        <p class="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
          {{ searchQuery ? "Try adjusting your search criteria." : "Students unlocking study materials will show up here." }}
        </p>
      </div>

      <!-- Table View -->
      <div v-else class="overflow-x-auto -mx-6">
        <table class="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr class="bg-gray-50 border-y border-gray-100">
              <th class="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student Name</th>
              <th class="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Standard / Class</th>
              <th class="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">School / College</th>
              <th class="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Mobile Number</th>
              <th class="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Registered On</th>
              <th class="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="student in filteredStudents"
              :key="student.id"
              class="hover:bg-gray-50/50 transition-colors group"
            >
              <!-- Student Name -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                    {{ getInitial(student.name) }}
                  </div>
                  <div class="font-semibold text-gray-800 text-sm">{{ student.name }}</div>
                </div>
              </td>

              <!-- Class -->
              <td class="px-6 py-4">
                <span class="inline-flex items-center px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-md text-xs font-semibold border border-blue-100">
                  Class {{ student.standard || 'N/A' }}
                </span>
              </td>

              <!-- School -->
              <td class="px-6 py-4">
                <span class="text-sm font-medium text-gray-700 truncate max-w-[200px] block" :title="student.school">
                  {{ student.school || '—' }}
                </span>
              </td>

              <!-- Phone -->
              <td class="px-6 py-4">
                <a
                  :href="'tel:' + student.phone"
                  class="text-sm text-gray-600 hover:text-blue-600 font-medium flex items-center gap-1.5 w-max"
                >
                  <svg class="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {{ student.phone }}
                </a>
              </td>

              <!-- Date -->
              <td class="px-6 py-4 text-xs text-gray-500 font-medium">
                {{ formatDate(student.createdAt) }}
              </td>

              <!-- Actions -->
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <!-- Delete -->
                  <button
                    @click="confirmDelete(student)"
                    class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                    title="Delete student log"
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

    <!-- Delete Confirmation Modal -->
    <div
      v-if="deleteTarget"
      class="fixed inset-0 bg-black/55 z-55 flex items-center justify-center p-4 backdrop-blur-xs"
    >
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
        <h3 class="font-bold text-gray-900 text-base mb-2">Delete Student Log?</h3>
        <p class="text-sm text-gray-500 mb-6 leading-relaxed">
          Are you sure you want to permanently delete registered student <strong class="text-gray-800">{{ deleteTarget.name }}</strong>? This will revoke their local device clearance if wiped.
        </p>
        <div class="flex gap-3">
          <button
            @click="deleteTarget = null"
            :disabled="deleting"
            class="flex-1 py-2.5 border border-gray-200 hover:bg-gray-50 rounded-xl text-sm font-semibold text-gray-700 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            @click="handleDelete"
            :disabled="deleting"
            class="flex-1 py-2.5 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
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
import { getStudents, deleteStudent } from "../../services/firestoreService";
import { showSuccess, showError } from "../../components/common/ToastNotification.vue";

export default {
  name: "AdminStudents",
  components: { AdminLayout },
  data() {
    return {
      loading: true,
      students: [],
      searchQuery: "",
      selectedMonth: "All Months",
      deleteTarget: null,
      deleting: false,
    };
  },
  computed: {
    filteredStudents() {
      let list = this.students;

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
            item.school?.toLowerCase().includes(q) ||
            item.standard?.toLowerCase().includes(q)
        );
      }
      return list;
    },
    availableMonths() {
      const months = this.students
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
    await this.fetchStudents();
  },
  methods: {
    async fetchStudents() {
      this.loading = true;
      try {
        this.students = await getStudents();
      } catch (err) {
        showError("Failed to fetch students log", err.message);
      } finally {
        this.loading = false;
      }
    },
    confirmDelete(student) {
      this.deleteTarget = student;
    },
    async handleDelete() {
      if (!this.deleteTarget) return;
      this.deleting = true;
      try {
        await deleteStudent(this.deleteTarget.id);
        showSuccess("Student log deleted", "Record successfully removed.");
        this.students = this.students.filter((item) => item.id !== this.deleteTarget.id);
        this.deleteTarget = null;
      } catch (err) {
        showError("Failed to delete student log", err.message);
      } finally {
        this.deleting = false;
      }
    },
    formatDate(dateVal) {
      if (!dateVal) return "—";
      const date = dateVal instanceof Date ? dateVal : new Date(dateVal);
      if (isNaN(date.getTime())) return "—";

      return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    },
    getInitial(name) {
      return (name || "S").charAt(0).toUpperCase();
    },
    exportToExcel() {
      if (this.filteredStudents.length === 0) return;

      const headers = ["Student Name", "Standard / Class", "School / College", "Phone Number", "Registration Date"];
      const rows = this.filteredStudents.map(item => [
        item.name || "",
        item.standard || "",
        item.school || "",
        item.phone || "",
        this.formatDate(item.createdAt)
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))
      ].join("\n");

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `manch_registered_students_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showSuccess("Excel Exported", "Filtered student records downloaded successfully.");
    },
  },
};
</script>
