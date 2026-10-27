<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Mobile Backdrop Overlay -->
    <div
      v-if="isMobileSidebarOpen"
      @click="isMobileSidebarOpen = false"
      class="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs transition-opacity"
    ></div>

    <!-- Sidebar Drawer (Slides in on mobile, fixed on desktop) -->
    <aside
      class="w-64 bg-white shadow-xl lg:shadow-md flex flex-col fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out"
      :class="isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
    >
      <!-- Logo & Brand Header -->
      <router-link
        to="/"
        class="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-700 to-blue-600 block hover:opacity-95 transition-opacity"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="h-9 w-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <div class="min-w-0">
              <p class="text-white font-bold text-sm leading-tight truncate">Manch Science</p>
              <p class="text-blue-200 text-xs">Admin Panel</p>
            </div>
          </div>
          <!-- Close button on mobile -->
          <button
            @click.prevent="isMobileSidebarOpen = false"
            class="lg:hidden text-white/80 hover:text-white p-1"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </router-link>

      <!-- Nav links -->
      <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          @click="isMobileSidebarOpen = false"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group"
          :class="[
            $route.path === item.to
              ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-100'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          ]"
        >
          <span class="flex-shrink-0" v-html="item.icon"></span>
          <span class="truncate">{{ item.label }}</span>
        </router-link>
      </nav>

      <!-- Bottom User Profile & Logout -->
      <div class="px-3 py-3 border-t border-gray-100 bg-gray-50/50">
        <div class="flex items-center gap-2.5 mb-2.5 p-2 rounded-xl bg-white border border-gray-100 shadow-xs">
          <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs flex-shrink-0">
            {{ adminInitial }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-semibold text-gray-800 truncate">{{ adminEmail }}</p>
            <p class="text-[10px] text-gray-400">Administrator</p>
          </div>
        </div>
        <button
          @click="handleLogout"
          class="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium cursor-pointer"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 lg:ml-64 flex flex-col min-h-screen min-w-0 w-full">
      <!-- Top Sticky Bar -->
      <header class="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div class="flex items-center gap-3">
          <!-- Mobile Hamburger Toggle -->
          <button
            @click="isMobileSidebarOpen = true"
            class="p-2 -ml-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl lg:hidden cursor-pointer"
            aria-label="Open Navigation"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div>
            <h1 class="text-base sm:text-lg font-bold text-gray-900 leading-tight">{{ currentPageTitle }}</h1>
            <p class="text-[11px] text-gray-400 hidden sm:block">Manch Science Classes Admin</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <router-link
            to="/"
            target="_blank"
            class="text-xs font-medium text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-gray-200 flex items-center gap-1.5 transition-colors"
          >
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>View Site</span>
          </router-link>
        </div>
      </header>

      <!-- Main Page Content Slot -->
      <main class="flex-1 p-3.5 sm:p-6 lg:p-8 min-w-0">
        <slot />
      </main>
    </div>
  </div>
</template>

<script>
import { useAuth } from '../../composables/useAuth'
import { useRouter } from 'vue-router'
import { showSuccess } from '../common/ToastNotification.vue'

const NAV_ICONS = {
  dashboard: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>`,
  gallery: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>`,
  materials: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>`,
  faculty: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>`,
  results: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
  enquiry: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" /></svg>`,
  refunds: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
  students: `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`,
}

export default {
  name: 'AdminLayout',
  setup() {
    const { user, logout } = useAuth()
    const router = useRouter()

    const handleLogout = async () => {
      await logout()
      showSuccess('Logged out', 'See you next time!')
      router.push('/admin/login')
    }

    return { user, handleLogout }
  },
  data() {
    return {
      isMobileSidebarOpen: false,
      navItems: [
        { to: '/admin/dashboard', label: 'Dashboard', icon: NAV_ICONS.dashboard },
        { to: '/admin/gallery', label: 'Gallery', icon: NAV_ICONS.gallery },
        { to: '/admin/materials', label: 'Study Materials', icon: NAV_ICONS.materials },
        { to: '/admin/faculty', label: 'Faculty', icon: NAV_ICONS.faculty },
        { to: '/admin/results', label: 'Results', icon: NAV_ICONS.results },
        { to: '/admin/enquiries', label: 'Admission Enquiries', icon: NAV_ICONS.enquiry },
        { to: '/admin/refunds', label: 'Refund Requests', icon: NAV_ICONS.refunds },
        { to: '/admin/students', label: 'Registered Students', icon: NAV_ICONS.students },
      ]
    }
  },
  watch: {
    $route() {
      this.isMobileSidebarOpen = false
    }
  },
  computed: {
    adminEmail() {
      return this.user?.email || 'admin@manch.com'
    },
    adminInitial() {
      return (this.user?.email || 'A').charAt(0).toUpperCase()
    },
    currentPageTitle() {
      const titles = {
        '/admin/dashboard': 'Dashboard',
        '/admin/gallery': 'Gallery Management',
        '/admin/materials': 'Study Materials',
        '/admin/faculty': 'Faculty Management',
        '/admin/results': 'Results Management',
        '/admin/enquiries': 'Admission Enquiries',
        '/admin/refunds': 'Refund Requests',
        '/admin/students': 'Registered Students',
      }
      return titles[this.$route.path] || 'Admin Panel'
    }
  }
}
</script>
