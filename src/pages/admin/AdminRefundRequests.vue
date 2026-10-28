<template>
  <AdminLayout>
    <div class="space-y-4">
      <!-- Minimal Page Header -->
      <div class="bg-white rounded-2xl shadow-xs border border-gray-200/80 p-4 sm:p-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h2 class="text-base sm:text-lg font-bold text-gray-900">Refund Requests</h2>
            <p class="text-xs text-gray-500 mt-0.5">
              Review cancellation requests and track refund workflow.
            </p>
          </div>
          <div class="flex items-center gap-2 self-start sm:self-auto">
            <button
              @click="exportToExcel"
              :disabled="filteredRequests.length === 0"
              class="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 disabled:opacity-50 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              <span>Export</span>
            </button>
            <button
              @click="fetchRefundRequests"
              class="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <svg
                class="h-3.5 w-3.5"
                :class="{ 'animate-spin': loading }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              <span>Refresh</span>
            </button>
          </div>
        </div>

        <!-- Minimal Status Filter Tabs -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 mb-4 text-xs scrollbar-none">
          <button
            v-for="status in statusTabs"
            :key="status.key"
            @click="selectedStatus = status.key"
            class="px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap"
            :class="[
              selectedStatus === status.key
                ? 'bg-primary text-white shadow-xs font-semibold'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            ]"
          >
            {{ status.label }}
            <span
              class="ml-1 px-1.5 py-0.2 rounded-full text-[10px]"
              :class="selectedStatus === status.key ? 'bg-white/25 text-white' : 'bg-gray-200/70 text-gray-700'"
            >
              {{ status.count }}
            </span>
          </button>
        </div>

        <!-- Search & Month Controls -->
        <div class="flex flex-col sm:flex-row gap-2.5 pt-1">
          <div class="relative flex-1">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search by student, ID, phone, email, course..."
              class="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm outline-none focus:bg-white focus:border-primary-500 transition-all"
            />
          </div>

          <div v-if="availableMonths.length > 1" class="w-full sm:w-44 flex-shrink-0">
            <select
              v-model="selectedMonth"
              class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm outline-none focus:bg-white focus:border-primary-500 transition-all bg-white"
            >
              <option value="All Months">All Months</option>
              <option v-for="month in availableMonths.slice(1)" :key="month" :value="month">
                {{ month }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Main Content Container -->
      <div class="bg-white rounded-2xl shadow-xs border border-gray-200/80 overflow-hidden">
        <!-- Loading State -->
        <div v-if="loading" class="py-16 flex flex-col items-center justify-center">
          <svg class="animate-spin h-7 w-7 text-primary-dark mb-2" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          <span class="text-xs text-gray-500 font-medium">Loading requests...</span>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredRequests.length === 0" class="py-16 text-center px-4">
          <div class="h-12 w-12 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-3 text-gray-400">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-800 text-sm">No refund requests found</h3>
          <p class="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
            {{ searchQuery || selectedStatus !== 'All' ? 'Try adjusting your search or status filter.' : 'When students submit refund requests, they will show up here.' }}
          </p>
        </div>

        <!-- 1. Mobile Cards View (< md) -->
        <div v-else class="md:hidden divide-y divide-gray-100">
          <div
            v-for="item in filteredRequests"
            :key="item.id"
            class="p-4 space-y-3 hover:bg-gray-50/50 transition-colors"
          >
            <div class="flex items-start justify-between gap-2">
              <div>
                <h3 class="text-sm font-bold text-gray-900 leading-snug">{{ item.studentName }}</h3>
                <p class="text-[11px] text-gray-500 mt-0.5">
                  <span class="font-mono font-semibold">#{{ item.studentId }}</span>
                  <span> • </span>
                  <span>{{ item.currentClass }}</span>
                  <span v-if="item.branch"> ({{ item.branch }})</span>
                </p>
              </div>

              <!-- Status selector on mobile -->
              <select
                :value="item.status || 'Pending'"
                @change="handleStatusChange(item, $event.target.value)"
                class="px-2 py-0.5 text-[11px] font-semibold rounded-full border outline-none cursor-pointer"
                :class="statusBadgeClasses(item.status || 'Pending')"
              >
                <option value="Pending">Pending</option>
                <option value="In Review">In Review</option>
                <option value="Approved">Approved</option>
                <option value="Refunded">Refunded</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div class="flex items-center justify-between text-xs text-gray-600 bg-gray-50 p-2.5 rounded-xl">
              <div>
                <span class="text-gray-400 text-[10px] block">Fees Claimed</span>
                <span class="font-bold text-gray-900 text-sm">₹{{ Number(item.feesPaid || 0).toLocaleString('en-IN') }}</span>
              </div>
              <div class="text-right">
                <span class="text-gray-400 text-[10px] block">Submitted</span>
                <span class="text-gray-600">{{ formatDate(item.createdAt) }}</span>
              </div>
            </div>

            <div class="flex items-center justify-between gap-2 pt-1">
              <a
                v-if="item.phone"
                :href="'tel:' + item.phone"
                class="text-xs text-primary-dark font-semibold flex items-center gap-1"
              >
                📞 {{ item.phone }}
              </a>
              <span v-else class="text-xs text-gray-400">{{ item.parentName }}</span>

              <div class="flex items-center gap-1.5">
                <button
                  @click="openDetails(item)"
                  class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-semibold transition-colors"
                >
                  View Details
                </button>
                <button
                  @click="confirmDelete(item)"
                  class="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  title="Delete"
                >
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Desktop & Tablet Clean Minimal Table (md:block) -->
        <div v-if="filteredRequests.length > 0" class="hidden md:block overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50/80 border-b border-gray-100 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                <th class="px-5 py-3">Student</th>
                <th class="px-5 py-3">Parent</th>
                <th class="px-5 py-3">Reason</th>
                <th class="px-5 py-3">Fees</th>
                <th class="px-5 py-3">Status</th>
                <th class="px-5 py-3">Date</th>
                <th class="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-xs">
              <tr
                v-for="item in filteredRequests"
                :key="item.id"
                class="hover:bg-gray-50/70 transition-colors"
              >
                <!-- Student -->
                <td class="px-5 py-3.5">
                  <div class="font-semibold text-gray-900 text-sm leading-snug">{{ item.studentName }}</div>
                  <div class="text-[11px] text-gray-500 mt-0.5">
                    <span class="font-mono font-medium text-gray-600">#{{ item.studentId }}</span>
                    <span> • </span>
                    <span>{{ item.currentClass }}</span>
                    <span v-if="item.branch"> • {{ item.branch }}</span>
                  </div>
                </td>

                <!-- Parent -->
                <td class="px-5 py-3.5 whitespace-nowrap">
                  <div class="font-medium text-gray-800">{{ item.parentName }}</div>
                  <a
                    v-if="item.phone"
                    :href="'tel:' + item.phone"
                    class="text-[11px] text-primary-dark hover:underline block mt-0.5"
                  >
                    {{ item.phone }}
                  </a>
                </td>

                <!-- Reason (Compact 1-liner with trigger) -->
                <td class="px-5 py-3.5 max-w-[200px]">
                  <div class="text-gray-600 truncate" :title="item.cancellationReason">
                    {{ item.cancellationReason || '—' }}
                  </div>
                  <button
                    @click="openDetails(item)"
                    class="text-[10px] font-bold text-gray-400 hover:text-primary-dark mt-0.5 block"
                  >
                    View details
                  </button>
                </td>

                <!-- Fees -->
                <td class="px-5 py-3.5 whitespace-nowrap">
                  <div class="font-bold text-gray-900 text-sm">
                    ₹{{ Number(item.feesPaid || 0).toLocaleString('en-IN') }}
                  </div>
                  <div v-if="item.paymentReference && item.paymentReference !== 'N/A'" class="text-[10px] text-gray-400 font-mono mt-0.5">
                    {{ item.paymentReference }}
                  </div>
                </td>

                <!-- Status Selector -->
                <td class="px-5 py-3.5 whitespace-nowrap">
                  <select
                    :value="item.status || 'Pending'"
                    @change="handleStatusChange(item, $event.target.value)"
                    class="px-2.5 py-1 text-xs font-semibold rounded-full border outline-none cursor-pointer transition-colors"
                    :class="statusBadgeClasses(item.status || 'Pending')"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Review">In Review</option>
                    <option value="Approved">Approved</option>
                    <option value="Refunded">Refunded</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>

                <!-- Date -->
                <td class="px-5 py-3.5 text-gray-500 whitespace-nowrap">
                  {{ formatDate(item.createdAt) }}
                </td>

                <!-- Actions -->
                <td class="px-5 py-3.5 text-right whitespace-nowrap">
                  <div class="flex items-center justify-end gap-1">
                    <button
                      @click="openDetails(item)"
                      class="p-1.5 text-gray-400 hover:text-primary-dark hover:bg-primary-50 rounded-lg transition-colors cursor-pointer"
                      title="View Full Details"
                    >
                      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      @click="confirmDelete(item)"
                      class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete"
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
    </div>

    <!-- Minimal Details Modal -->
    <div
      v-if="selectedRequest"
      class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs transition-opacity overflow-y-auto"
      @click.self="selectedRequest = null"
    >
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden border border-gray-200 my-6 animate-in fade-in zoom-in-95 duration-150">
        <!-- Modal Header -->
        <div class="bg-gray-900 px-5 sm:px-6 py-4 text-white flex items-center justify-between">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="font-bold text-base">{{ selectedRequest.studentName }}</h3>
              <span class="px-2 py-0.5 bg-white/15 rounded text-[11px] font-mono font-medium">
                #{{ selectedRequest.studentId }}
              </span>
            </div>
            <p class="text-xs text-gray-400 mt-0.5">Submitted {{ formatDate(selectedRequest.createdAt, true) }}</p>
          </div>
          <button @click="selectedRequest = null" class="text-gray-400 hover:text-white p-1">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-5 sm:p-6 space-y-5 text-xs max-h-[75vh] overflow-y-auto">
          <!-- Status Selector Bar -->
          <div class="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between">
            <span class="text-gray-600 font-medium">Workflow Status:</span>
            <select
              :value="selectedRequest.status || 'Pending'"
              @change="handleStatusChange(selectedRequest, $event.target.value)"
              class="px-3 py-1 font-bold rounded-lg border outline-none bg-white cursor-pointer"
              :class="statusBadgeClasses(selectedRequest.status || 'Pending')"
            >
              <option value="Pending">Pending</option>
              <option value="In Review">In Review</option>
              <option value="Approved">Approved</option>
              <option value="Refunded">Refunded</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <!-- Student & Academic -->
          <div>
            <h4 class="font-bold text-gray-400 uppercase tracking-wider text-[10px] mb-2">Student & Academic Details</h4>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 bg-gray-50/70 p-3.5 rounded-xl">
              <div>
                <span class="text-gray-400 block text-[10px]">Student Name</span>
                <span class="font-semibold text-gray-800">{{ selectedRequest.studentName }}</span>
              </div>
              <div>
                <span class="text-gray-400 block text-[10px]">Class & Board</span>
                <span class="font-semibold text-gray-800">{{ selectedRequest.currentClass }} ({{ selectedRequest.board }})</span>
              </div>
              <div>
                <span class="text-gray-400 block text-[10px]">Branch</span>
                <span class="font-semibold text-gray-800">{{ selectedRequest.branch }}</span>
              </div>
              <div class="col-span-2">
                <span class="text-gray-400 block text-[10px]">Enrolled Course</span>
                <span class="font-semibold text-gray-800">{{ selectedRequest.courseEnrolled }}</span>
              </div>
              <div>
                <span class="text-gray-400 block text-[10px]">Admission Date</span>
                <span class="font-semibold text-gray-800">{{ selectedRequest.admissionDate || 'N/A' }}</span>
              </div>
            </div>
          </div>

          <!-- Parent Contact -->
          <div>
            <h4 class="font-bold text-gray-400 uppercase tracking-wider text-[10px] mb-2">Parent / Guardian Contact</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-gray-50/70 p-3.5 rounded-xl">
              <div>
                <span class="text-gray-400 block text-[10px]">Parent Name</span>
                <span class="font-semibold text-gray-800">{{ selectedRequest.parentName }} ({{ selectedRequest.relationship }})</span>
              </div>
              <div>
                <span class="text-gray-400 block text-[10px]">Mobile Phone</span>
                <a :href="'tel:' + selectedRequest.phone" class="font-semibold text-primary-dark hover:underline">
                  {{ selectedRequest.phone }}
                </a>
              </div>
              <div>
                <span class="text-gray-400 block text-[10px]">Email Address</span>
                <a :href="'mailto:' + selectedRequest.email" class="font-semibold text-primary-dark hover:underline truncate block">
                  {{ selectedRequest.email || 'N/A' }}
                </a>
              </div>
            </div>
          </div>

          <!-- Fees & Cancellation -->
          <div>
            <h4 class="font-bold text-gray-400 uppercase tracking-wider text-[10px] mb-2">Financials & Cancellation Reason</h4>
            <div class="bg-gray-50/70 p-3.5 rounded-xl space-y-2.5">
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 pb-2 border-b border-gray-200">
                <div>
                  <span class="text-gray-400 block text-[10px]">Total Fees Paid</span>
                  <span class="text-sm font-bold text-gray-900">₹{{ selectedRequest.feesPaid }}</span>
                </div>
                <div>
                  <span class="text-gray-400 block text-[10px]">Last Date Attended</span>
                  <span class="font-semibold text-gray-800">{{ selectedRequest.lastDateAttended || 'N/A' }}</span>
                </div>
                <div>
                  <span class="text-gray-400 block text-[10px]">Payment Reference</span>
                  <span class="font-mono text-gray-700">{{ selectedRequest.paymentReference || 'N/A' }}</span>
                </div>
              </div>

              <div>
                <span class="text-gray-400 block text-[10px] mb-1">Reason for Cancellation:</span>
                <p class="text-gray-800 bg-white p-3 rounded-lg border border-gray-200 leading-relaxed whitespace-pre-line">
                  {{ selectedRequest.cancellationReason || 'No reason provided.' }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="bg-gray-50 px-5 sm:px-6 py-3 border-t border-gray-200 flex items-center justify-between">
          <a
            v-if="selectedRequest.phone"
            :href="'tel:' + selectedRequest.phone"
            class="px-3 py-1.5 bg-primary-50 text-primary-dark hover:bg-primary-100 rounded-lg text-xs font-semibold"
          >
            📞 Call Parent
          </a>
          <button
            @click="selectedRequest = null"
            class="px-4 py-1.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-xs font-semibold cursor-pointer ml-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Minimal Delete Confirmation Modal -->
    <div
      v-if="deleteTarget"
      class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
      @click.self="deleteTarget = null"
    >
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-sm p-5 text-center">
        <h3 class="font-bold text-gray-900 text-sm mb-1">Delete Request?</h3>
        <p class="text-xs text-gray-500 mb-4">
          Delete refund request for <strong>{{ deleteTarget.studentName }}</strong>?
        </p>
        <div class="flex items-center gap-2">
          <button
            @click="deleteTarget = null"
            class="flex-1 py-2 border border-gray-200 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="handleDelete"
            :disabled="deleting"
            class="flex-1 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white rounded-xl text-xs font-bold"
          >
            {{ deleting ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from "../../components/admin/AdminLayout.vue";
import {
  getRefundRequests,
  updateRefundRequestStatus,
  deleteRefundRequest,
} from "../../services/firestoreService";
import { showSuccess, showError } from "../../components/common/ToastNotification.vue";

export default {
  name: "AdminRefundRequests",
  components: { AdminLayout },
  data() {
    return {
      loading: true,
      refundRequests: [],
      searchQuery: "",
      selectedStatus: "All",
      selectedMonth: "All Months",
      selectedRequest: null,
      deleteTarget: null,
      deleting: false,
    };
  },
  computed: {
    statusTabs() {
      const all = this.refundRequests.length;
      const pending = this.countByStatus("Pending");
      const inReview = this.countByStatus("In Review");
      const approved = this.countByStatus("Approved");
      const refunded = this.countByStatus("Refunded");
      const rejected = this.countByStatus("Rejected");

      return [
        { key: "All", label: "All", count: all },
        { key: "Pending", label: "Pending", count: pending },
        { key: "In Review", label: "In Review", count: inReview },
        { key: "Approved", label: "Approved", count: approved },
        { key: "Refunded", label: "Refunded", count: refunded },
        { key: "Rejected", label: "Rejected", count: rejected },
      ];
    },
    filteredRequests() {
      let list = this.refundRequests;

      // Status filter
      if (this.selectedStatus && this.selectedStatus !== "All") {
        list = list.filter((item) => (item.status || "Pending") === this.selectedStatus);
      }

      // Month filter
      if (this.selectedMonth && this.selectedMonth !== "All Months") {
        list = list.filter((item) => {
          if (!item.createdAt) return false;
          const date = item.createdAt instanceof Date ? item.createdAt : new Date(item.createdAt);
          const mStr = date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
          return mStr === this.selectedMonth;
        });
      }

      // Search keyword
      if (this.searchQuery.trim()) {
        const q = this.searchQuery.toLowerCase();
        list = list.filter(
          (item) =>
            item.studentName?.toLowerCase().includes(q) ||
            item.studentId?.toLowerCase().includes(q) ||
            item.parentName?.toLowerCase().includes(q) ||
            item.phone?.toLowerCase().includes(q) ||
            item.email?.toLowerCase().includes(q) ||
            item.branch?.toLowerCase().includes(q) ||
            item.courseEnrolled?.toLowerCase().includes(q) ||
            item.currentClass?.toLowerCase().includes(q)
        );
      }
      return list;
    },
    availableMonths() {
      const months = this.refundRequests
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
    await this.fetchRefundRequests();
  },
  methods: {
    countByStatus(status) {
      return this.refundRequests.filter((item) => (item.status || "Pending") === status).length;
    },
    async fetchRefundRequests() {
      this.loading = true;
      try {
        this.refundRequests = await getRefundRequests();
      } catch (err) {
        showError("Failed to fetch refund requests", err.message);
      } finally {
        this.loading = false;
      }
    },
    statusBadgeClasses(status) {
      switch (status) {
        case "Pending":
          return "bg-amber-50 text-amber-700 border-amber-200/80";
        case "In Review":
          return "bg-primary-50 text-primary-dark border-primary-200/80";
        case "Approved":
          return "bg-purple-50 text-purple-700 border-purple-200/80";
        case "Refunded":
          return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
        case "Rejected":
          return "bg-red-50 text-red-700 border-red-200/80";
        default:
          return "bg-gray-50 text-gray-700 border-gray-200";
      }
    },
    async handleStatusChange(item, newStatus) {
      const oldStatus = item.status || "Pending";
      item.status = newStatus;
      if (this.selectedRequest && this.selectedRequest.id === item.id) {
        this.selectedRequest.status = newStatus;
      }

      try {
        await updateRefundRequestStatus(item.id, newStatus);
        showSuccess("Status Updated", `${item.studentName} is now ${newStatus}.`);
      } catch (err) {
        item.status = oldStatus;
        if (this.selectedRequest && this.selectedRequest.id === item.id) {
          this.selectedRequest.status = oldStatus;
        }
        showError("Failed to update status", err.message);
      }
    },
    openDetails(item) {
      this.selectedRequest = item;
    },
    confirmDelete(item) {
      this.deleteTarget = item;
    },
    async handleDelete() {
      if (!this.deleteTarget) return;
      this.deleting = true;
      try {
        await deleteRefundRequest(this.deleteTarget.id);
        showSuccess("Deleted", "Refund record removed.");
        this.refundRequests = this.refundRequests.filter((item) => item.id !== this.deleteTarget.id);
        if (this.selectedRequest?.id === this.deleteTarget.id) {
          this.selectedRequest = null;
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
      if (this.filteredRequests.length === 0) return;

      const headers = [
        "Student Name",
        "Student ID",
        "Class",
        "Board",
        "Branch",
        "Course",
        "Parent",
        "Phone",
        "Email",
        "Fees Paid",
        "Status",
        "Date",
        "Reason",
      ];

      const rows = this.filteredRequests.map((item) => [
        item.studentName || "",
        item.studentId || "",
        item.currentClass || "",
        item.board || "",
        item.branch || "",
        item.courseEnrolled || "",
        item.parentName || "",
        item.phone || "",
        item.email || "",
        item.feesPaid || "",
        item.status || "Pending",
        this.formatDate(item.createdAt, true),
        item.cancellationReason || "",
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(",")),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `manch_refund_requests_${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showSuccess("Excel Exported", "Refund requests downloaded.");
    },
  },
};
</script>
