<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Top KPI Stat Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <!-- Total -->
        <div class="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 flex items-center gap-3">
          <div class="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center flex-shrink-0 font-bold text-sm">
            <svg class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p class="text-xl sm:text-2xl font-bold text-gray-900">{{ refundRequests.length }}</p>
            <p class="text-xs text-gray-500 font-medium">Total Requests</p>
          </div>
        </div>

        <!-- Pending -->
        <div class="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 flex items-center gap-3">
          <div class="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 font-bold text-sm">
            <svg class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="text-xl sm:text-2xl font-bold text-amber-600">{{ countByStatus('Pending') }}</p>
            <p class="text-xs text-gray-500 font-medium">Pending</p>
          </div>
        </div>

        <!-- In Review -->
        <div class="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 flex items-center gap-3">
          <div class="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold text-sm">
            <svg class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <div>
            <p class="text-xl sm:text-2xl font-bold text-blue-600">{{ countByStatus('In Review') }}</p>
            <p class="text-xs text-gray-500 font-medium">In Review</p>
          </div>
        </div>

        <!-- Refunded / Approved -->
        <div class="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 flex items-center gap-3">
          <div class="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 font-bold text-sm">
            <svg class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="text-xl sm:text-2xl font-bold text-emerald-600">
              {{ countByStatus('Refunded') + countByStatus('Approved') }}
            </p>
            <p class="text-xs text-gray-500 font-medium">Approved / Refunded</p>
          </div>
        </div>

        <!-- Total Claim Amount -->
        <div class="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 flex items-center gap-3 col-span-2 lg:col-span-1">
          <div class="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 font-bold text-sm">
            <svg class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="text-lg sm:text-xl font-bold text-purple-700">₹{{ totalFeesClaimed.toLocaleString('en-IN') }}</p>
            <p class="text-xs text-gray-500 font-medium">Claimed Fees</p>
          </div>
        </div>
      </div>

      <!-- Main Content Card -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <!-- Page Header & Actions -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 class="text-lg font-bold text-gray-800">Admission Cancellation & Refund Requests</h2>
            <p class="text-xs text-gray-500 mt-1">
              Verify cancellation particulars, track refund workflow, and contact parents directly.
            </p>
          </div>
          <div class="flex items-center gap-3">
            <button
              @click="exportToExcel"
              :disabled="filteredRequests.length === 0"
              class="px-4 py-2 text-xs font-medium text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download Excel
            </button>
            <button
              @click="fetchRefundRequests"
              class="px-4 py-2 text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <svg
                class="h-3.5 w-3.5"
                :class="{ 'animate-spin': loading }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        <!-- Search & Filters -->
        <div class="mb-6 grid grid-cols-1 sm:grid-cols-12 gap-3">
          <!-- Search box -->
          <div class="relative sm:col-span-6 lg:col-span-6">
            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search by student, ID, parent, phone, email, course..."
              class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <!-- Status Filter -->
          <div class="sm:col-span-3 lg:col-span-3">
            <select
              v-model="selectedStatus"
              class="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Review">In Review</option>
              <option value="Approved">Approved</option>
              <option value="Refunded">Refunded</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <!-- Month Filter Dropdown -->
          <div class="sm:col-span-3 lg:col-span-3">
            <select
              v-model="selectedMonth"
              class="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all bg-white"
            >
              <option value="All Months">All Months</option>
              <option v-for="month in availableMonths.slice(1)" :key="month" :value="month">
                {{ month }}
              </option>
            </select>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="py-16 flex flex-col items-center justify-center">
          <svg class="animate-spin h-8 w-8 text-blue-600 mb-3" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          <span class="text-sm text-gray-500 font-medium">Fetching refund requests...</span>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredRequests.length === 0" class="py-16 text-center">
          <div class="h-16 w-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-800 text-sm">No refund requests found</h3>
          <p class="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
            {{ searchQuery || selectedStatus !== 'All' ? "Try adjusting your filters or keyword query." : "When students or parents submit cancellation requests, they will appear here." }}
          </p>
        </div>

        <!-- Table View -->
        <div v-else class="overflow-x-auto -mx-6">
          <table class="w-full text-left border-collapse min-w-[950px]">
            <thead>
              <tr class="bg-gray-50 border-y border-gray-100">
                <th class="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student & ID</th>
                <th class="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Parent Details</th>
                <th class="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Cancellation & Reason</th>
                <th class="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fees & Refund</th>
                <th class="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Submitted</th>
                <th class="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr
                v-for="item in filteredRequests"
                :key="item.id"
                class="hover:bg-gray-50/60 transition-colors group"
              >
                <!-- Student & ID -->
                <td class="px-6 py-4">
                  <div class="font-bold text-gray-900 text-sm flex items-center gap-2">
                    {{ item.studentName || 'Unknown Student' }}
                    <span v-if="item.studentId" class="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-mono font-semibold">
                      ID: {{ item.studentId }}
                    </span>
                  </div>
                  <div class="flex flex-wrap items-center gap-1.5 mt-1.5">
                    <span class="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md text-[10px] font-semibold border border-blue-100">
                      {{ item.currentClass || 'Class N/A' }} {{ item.board ? `(${item.board})` : '' }}
                    </span>
                    <span v-if="item.branch" class="px-2 py-0.5 bg-purple-50 text-purple-700 rounded-md text-[10px] font-medium border border-purple-100">
                      {{ item.branch }}
                    </span>
                  </div>
                </td>

                <!-- Parent Details -->
                <td class="px-6 py-4">
                  <div class="font-medium text-gray-800 text-xs">
                    {{ item.parentName || 'Parent / Guardian' }}
                    <span v-if="item.relationship" class="text-gray-400">({{ item.relationship }})</span>
                  </div>
                  <div class="flex flex-col gap-1 mt-1.5">
                    <a
                      v-if="item.phone"
                      :href="'tel:' + item.phone"
                      class="text-xs text-gray-600 hover:text-blue-600 font-medium flex items-center gap-1 w-max"
                    >
                      <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {{ item.phone }}
                    </a>
                    <a
                      v-if="item.email"
                      :href="'mailto:' + item.email"
                      class="text-[11px] text-gray-400 hover:text-blue-600 flex items-center gap-1 w-max truncate max-w-[150px]"
                    >
                      <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {{ item.email }}
                    </a>
                  </div>
                </td>

                <!-- Cancellation Info & Reason -->
                <td class="px-6 py-4 max-w-xs">
                  <div class="text-xs font-semibold text-gray-700 truncate">
                    {{ item.courseEnrolled || 'General Admission' }}
                  </div>
                  <div class="text-[11px] text-gray-400 mt-0.5">
                    Last Attended: <span class="text-gray-600 font-medium">{{ item.lastDateAttended || '—' }}</span>
                  </div>
                  <p class="text-xs text-gray-500 line-clamp-1 mt-1 leading-relaxed">
                    {{ item.cancellationReason || '—' }}
                  </p>
                  <button
                    @click="openDetails(item)"
                    class="text-[11px] font-bold text-blue-600 hover:underline mt-1 block"
                  >
                    Read full reason
                  </button>
                </td>

                <!-- Fees Paid & Refund Option -->
                <td class="px-6 py-4">
                  <div class="text-sm font-bold text-gray-900">
                    ₹{{ Number(item.feesPaid || 0).toLocaleString('en-IN') }}
                  </div>
                  <div class="text-[11px] text-emerald-700 font-medium mt-0.5">
                    {{ item.refundRequested || 'Refund Requested' }}
                  </div>
                  <div v-if="item.paymentReference && item.paymentReference !== 'N/A'" class="text-[10px] text-gray-400 mt-0.5 font-mono">
                    Ref: {{ item.paymentReference }}
                  </div>
                </td>

                <!-- Status Badge & Selector -->
                <td class="px-6 py-4">
                  <div class="relative inline-block text-left">
                    <select
                      :value="item.status || 'Pending'"
                      @change="handleStatusChange(item, $event.target.value)"
                      class="px-2.5 py-1 text-xs font-bold rounded-full border outline-none cursor-pointer transition-all"
                      :class="statusBadgeClasses(item.status || 'Pending')"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Review">In Review</option>
                      <option value="Approved">Approved</option>
                      <option value="Refunded">Refunded</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </td>

                <!-- Submitted Date -->
                <td class="px-6 py-4 text-xs text-gray-500 font-medium whitespace-nowrap">
                  {{ formatDate(item.createdAt, true) }}
                </td>

                <!-- Actions -->
                <td class="px-6 py-4 text-right whitespace-nowrap">
                  <div class="flex items-center justify-end gap-1.5">
                    <!-- View details button -->
                    <button
                      @click="openDetails(item)"
                      class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
                      title="View all details"
                    >
                      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>

                    <!-- Delete button -->
                    <button
                      @click="confirmDelete(item)"
                      class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
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
    </div>

    <!-- Complete Details Modal -->
    <div
      v-if="selectedRequest"
      class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs transition-opacity overflow-y-auto"
      @click.self="selectedRequest = null"
    >
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100 my-8 animate-in fade-in zoom-in-95 duration-150">
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-blue-700 to-indigo-700 px-6 py-5 text-white flex items-center justify-between">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="font-bold text-base sm:text-lg">{{ selectedRequest.studentName }}</h3>
              <span v-if="selectedRequest.studentId" class="px-2 py-0.5 bg-white/20 rounded text-xs font-mono font-semibold">
                ID: {{ selectedRequest.studentId }}
              </span>
            </div>
            <p class="text-xs text-blue-100 mt-1">
              Cancellation & Refund Request • Submitted {{ formatDate(selectedRequest.createdAt, true) }}
            </p>
          </div>
          <button @click="selectedRequest = null" class="text-white/80 hover:text-white transition-colors cursor-pointer p-1">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-sm">
          <!-- Status Ribbon inside Modal -->
          <div class="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span class="text-xs text-gray-500 font-medium">Current Status:</span>
              <div class="font-bold text-gray-800 text-sm mt-0.5">
                {{ selectedRequest.status || 'Pending' }}
              </div>
            </div>
            <div class="flex items-center gap-2">
              <label class="text-xs text-gray-600 font-medium">Update:</label>
              <select
                :value="selectedRequest.status || 'Pending'"
                @change="handleStatusChange(selectedRequest, $event.target.value)"
                class="px-3 py-1.5 text-xs font-bold rounded-lg border outline-none bg-white cursor-pointer"
              >
                <option value="Pending">Pending</option>
                <option value="In Review">In Review</option>
                <option value="Approved">Approved</option>
                <option value="Refunded">Refunded</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <!-- Section A: Student Information -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3 flex items-center gap-2">
              <span class="h-5 w-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px]">A</span>
              Student Information
            </h4>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-gray-50/70 p-4 rounded-xl text-xs">
              <div>
                <span class="text-gray-400 block">Student Name</span>
                <span class="font-semibold text-gray-800">{{ selectedRequest.studentName }}</span>
              </div>
              <div>
                <span class="text-gray-400 block">Student ID / Roll</span>
                <span class="font-semibold text-gray-800 font-mono">{{ selectedRequest.studentId || 'N/A' }}</span>
              </div>
              <div>
                <span class="text-gray-400 block">Class & Board</span>
                <span class="font-semibold text-gray-800">{{ selectedRequest.currentClass }} ({{ selectedRequest.board }})</span>
              </div>
              <div>
                <span class="text-gray-400 block">Enrolled Branch</span>
                <span class="font-semibold text-gray-800">{{ selectedRequest.branch }}</span>
              </div>
              <div class="col-span-2">
                <span class="text-gray-400 block">Enrolled Course / Batch</span>
                <span class="font-semibold text-gray-800">{{ selectedRequest.courseEnrolled }}</span>
              </div>
            </div>
          </div>

          <!-- Section B: Parent / Guardian Information -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3 flex items-center gap-2">
              <span class="h-5 w-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px]">B</span>
              Parent / Guardian Details
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gray-50/70 p-4 rounded-xl text-xs">
              <div>
                <span class="text-gray-400 block">Parent Name</span>
                <span class="font-semibold text-gray-800">{{ selectedRequest.parentName }} ({{ selectedRequest.relationship }})</span>
              </div>
              <div>
                <span class="text-gray-400 block">Phone Number</span>
                <a :href="'tel:' + selectedRequest.phone" class="font-semibold text-blue-600 hover:underline flex items-center gap-1 mt-0.5">
                  📞 {{ selectedRequest.phone }}
                </a>
              </div>
              <div>
                <span class="text-gray-400 block">Email Address</span>
                <a :href="'mailto:' + selectedRequest.email" class="font-semibold text-blue-600 hover:underline flex items-center gap-1 mt-0.5 truncate">
                  ✉️ {{ selectedRequest.email || 'N/A' }}
                </a>
              </div>
            </div>
          </div>

          <!-- Section C: Cancellation Particulars -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3 flex items-center gap-2">
              <span class="h-5 w-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px]">C</span>
              Cancellation Particulars & Reason
            </h4>
            <div class="space-y-3 bg-gray-50/70 p-4 rounded-xl text-xs">
              <div class="grid grid-cols-2 gap-3 pb-2 border-b border-gray-200">
                <div>
                  <span class="text-gray-400 block">Date of Admission</span>
                  <span class="font-semibold text-gray-800">{{ selectedRequest.admissionDate }}</span>
                </div>
                <div>
                  <span class="text-gray-400 block">Last Date Attended / Effective Date</span>
                  <span class="font-semibold text-gray-800">{{ selectedRequest.lastDateAttended }}</span>
                </div>
              </div>
              <div>
                <span class="text-gray-400 block mb-1">Detailed Reason for Cancellation</span>
                <p class="text-gray-800 font-medium whitespace-pre-line leading-relaxed bg-white p-3 rounded-lg border border-gray-100">
                  {{ selectedRequest.cancellationReason || 'No reason specified.' }}
                </p>
              </div>
            </div>
          </div>

          <!-- Section D: Fees & Refund Request Details -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3 flex items-center gap-2">
              <span class="h-5 w-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px]">D</span>
              Financial & Payment Details
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gray-50/70 p-4 rounded-xl text-xs">
              <div>
                <span class="text-gray-400 block">Total Fees Paid</span>
                <span class="text-base font-bold text-gray-900">₹{{ selectedRequest.feesPaid }}</span>
              </div>
              <div>
                <span class="text-gray-400 block">Refund Option</span>
                <span class="font-semibold text-emerald-700">{{ selectedRequest.refundRequested }}</span>
              </div>
              <div>
                <span class="text-gray-400 block">Payment / Receipt Reference</span>
                <span class="font-semibold text-gray-800 font-mono">{{ selectedRequest.paymentReference || 'N/A' }}</span>
              </div>
            </div>
          </div>

          <!-- Section E: Review & Consents -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3 flex items-center gap-2">
              <span class="h-5 w-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px]">E</span>
              Consent & Declarations
            </h4>
            <div class="space-y-2 bg-emerald-50/50 border border-emerald-100 p-3.5 rounded-xl text-xs text-gray-700">
              <div class="flex items-center gap-2">
                <span class="text-emerald-600 font-bold">✓</span>
                <span>Confirmed accuracy and parent/guardian authority</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-emerald-600 font-bold">✓</span>
                <span>Acknowledged deductions and institute refund policy verification</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-emerald-600 font-bold">✓</span>
                <span>Authorized Manch Science Classes administrative contact</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <a
              :href="'tel:' + selectedRequest.phone"
              class="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              📞 Call Parent
            </a>
            <a
              v-if="selectedRequest.email"
              :href="'mailto:' + selectedRequest.email"
              class="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              ✉️ Email Parent
            </a>
          </div>

          <button
            @click="selectedRequest = null"
            class="px-5 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="deleteTarget"
      class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs transition-opacity"
      @click.self="deleteTarget = null"
    >
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center animate-in fade-in zoom-in-95 duration-150">
        <div class="h-12 w-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 class="font-bold text-gray-900 text-base mb-1">Delete Refund Request?</h3>
        <p class="text-xs text-gray-500 mb-6">
          Are you sure you want to delete the refund request for <strong>{{ deleteTarget.studentName }}</strong>? This action cannot be undone.
        </p>
        <div class="flex items-center gap-3">
          <button
            @click="deleteTarget = null"
            class="flex-1 py-2.5 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            @click="handleDelete"
            :disabled="deleting"
            class="flex-1 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
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
    totalFeesClaimed() {
      return this.refundRequests.reduce((acc, curr) => {
        const val = Number(curr.feesPaid || 0);
        return acc + (isNaN(val) ? 0 : val);
      }, 0);
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

      // Search query filter
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
            item.currentClass?.toLowerCase().includes(q) ||
            item.paymentReference?.toLowerCase().includes(q)
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
          return "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100";
        case "In Review":
          return "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100";
        case "Approved":
          return "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100";
        case "Refunded":
          return "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100";
        case "Rejected":
          return "bg-red-50 text-red-700 border-red-200 hover:bg-red-100";
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
        showSuccess("Status Updated", `Request for ${item.studentName} marked as ${newStatus}.`);
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
        showSuccess("Request Deleted", "Refund record successfully removed.");
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
        "Course Enrolled",
        "Admission Date",
        "Last Date Attended",
        "Parent Name",
        "Relationship",
        "Phone",
        "Email",
        "Total Fees Paid",
        "Refund Requested",
        "Payment Reference",
        "Status",
        "Submission Date",
        "Cancellation Reason",
      ];

      const rows = this.filteredRequests.map((item) => [
        item.studentName || "",
        item.studentId || "",
        item.currentClass || "",
        item.board || "",
        item.branch || "",
        item.courseEnrolled || "",
        item.admissionDate || "",
        item.lastDateAttended || "",
        item.parentName || "",
        item.relationship || "",
        item.phone || "",
        item.email || "",
        item.feesPaid || "",
        item.refundRequested || "",
        item.paymentReference || "",
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
      showSuccess("Excel Exported", "Refund requests exported to CSV successfully.");
    },
  },
};
</script>

