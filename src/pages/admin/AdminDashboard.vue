<template>
  <AdminLayout>
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4"
      >
        <div :class="['h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0', stat.bg]">
          <span v-html="stat.icon"></span>
        </div>
        <div>
          <p class="text-2xl font-bold text-gray-900">
            <span v-if="loading">—</span>
            <span v-else>{{ stat.value }}</span>
          </p>
          <p class="text-sm text-gray-500">{{ stat.label }}</p>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="mb-10">
      <h2 class="text-base font-semibold text-gray-700 mb-4">Quick Actions</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <router-link
          v-for="action in quickActions"
          :key="action.to"
          :to="action.to"
          :class="['p-5 rounded-2xl border-2 border-dashed transition-all hover:shadow-md hover:border-solid group', action.border, action.hover]"
        >
          <div :class="['h-10 w-10 rounded-xl flex items-center justify-center mb-3', action.iconBg]" v-html="action.icon"></div>
          <p class="font-semibold text-gray-800 text-sm">{{ action.title }}</p>
          <p class="text-xs text-gray-500 mt-1">{{ action.description }}</p>
        </router-link>
      </div>
    </div>

    <!-- Recent Activity placeholder -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 class="text-base font-semibold text-gray-700 mb-4">Welcome, {{ adminName }}!</h2>
      <p class="text-sm text-gray-500 leading-relaxed">
        Use the sidebar to manage gallery images, study materials, and faculty profiles.
        All changes reflect immediately on the public website.
      </p>
      <div class="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <p class="text-xs text-blue-700 font-medium">💡 Tip: Real-time lecture updates are powered by Firestore's onSnapshot listener — students see changes instantly without refreshing.</p>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from '../../components/admin/AdminLayout.vue'
import { useAuth } from '../../composables/useAuth'
import { getGalleryImages, getMaterials, getFaculty, getEnquiries, getStudents } from '../../services/firestoreService'

const ICON = {
  gallery: `<svg class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>`,
  materials: `<svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>`,
  faculty: `<svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>`,
  results: `<svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
  enquiries: `<svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" /></svg>`,
  students: `<svg class="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`,
}

export default {
  name: 'AdminDashboard',
  components: { AdminLayout },
  setup() {
    const { user } = useAuth()
    return { user }
  },
  data() {
    return {
      loading: true,
      galleryCount: 0,
      materialsCount: 0,
      facultyCount: 0,
      resultsCount: 0,
      enquiriesCount: 0,
      studentsCount: 0,
      stats: [],
      quickActions: [
        {
          to: '/admin/students',
          title: 'Registered Students',
          description: 'View student logs unlocking study materials',
          icon: ICON.students,
          iconBg: 'bg-amber-100',
          border: 'border-amber-200',
          hover: 'hover:bg-amber-50'
        },
        {
          to: '/admin/enquiries',
          title: 'View Enquiries',
          description: 'Respond to general admission requests',
          icon: ICON.enquiries,
          iconBg: 'bg-blue-100',
          border: 'border-blue-200',
          hover: 'hover:bg-blue-50'
        },
        {
          to: '/admin/gallery',
          title: 'Upload Gallery Image',
          description: 'Add new event or campus photos',
          icon: ICON.gallery,
          iconBg: 'bg-purple-100',
          border: 'border-purple-200',
          hover: 'hover:bg-purple-50'
        },
        {
          to: '/admin/materials',
          title: 'Upload Study Material',
          description: 'Share PDFs or notes with students',
          icon: ICON.materials,
          iconBg: 'bg-green-100',
          border: 'border-green-200',
          hover: 'hover:bg-green-50'
        },
        {
          to: '/admin/faculty',
          title: 'Manage Faculty',
          description: 'Update team profiles and photos',
          icon: ICON.faculty,
          iconBg: 'bg-indigo-100',
          border: 'border-indigo-200',
          hover: 'hover:bg-indigo-50'
        },
        {
          to: '/admin/results',
          title: 'Manage Results',
          description: 'Upload yearly result posters',
          icon: ICON.results,
          iconBg: 'bg-red-100',
          border: 'border-red-200',
          hover: 'hover:bg-red-50'
        }
      ]
    }
  },
  computed: {
    adminName() {
      return this.user?.email?.split('@')[0] || 'Admin'
    }
  },
  async created() {
    try {
      const { getResults } = await import('../../services/firestoreService')
      const [gallery, materials, faculty, results, enquiries, students] = await Promise.all([
        getGalleryImages(),
        getMaterials(),
        getFaculty(),
        getResults(),
        getEnquiries(),
        getStudents(),
      ])
      this.galleryCount = gallery.length
      this.materialsCount = materials.length
      this.facultyCount = faculty.length
      this.resultsCount = results.length
      this.enquiriesCount = enquiries.length
      this.studentsCount = students.length
    } catch {
      // Non-critical
    } finally {
      this.loading = false
      this.stats = [
        { label: 'Registered Students', value: this.studentsCount, bg: 'bg-amber-100', icon: ICON.students },
        { label: 'General Enquiries', value: this.enquiriesCount, bg: 'bg-blue-100', icon: ICON.enquiries },
        { label: 'Gallery Images', value: this.galleryCount, bg: 'bg-purple-100', icon: ICON.gallery },
        { label: 'Study Materials', value: this.materialsCount, bg: 'bg-green-100', icon: ICON.materials },
        { label: 'Faculty Members', value: this.facultyCount, bg: 'bg-indigo-100', icon: ICON.faculty },
        { label: 'Results Published', value: this.resultsCount, bg: 'bg-red-100', icon: ICON.results },
      ]
    }
  }
}
</script>
