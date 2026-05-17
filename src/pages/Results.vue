<template>
  <div class="py-16 bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 italic tracking-tight">
          Our <span class="text-primary">Hall of Fame</span>
        </h1>
        <p class="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Celebrating years of academic excellence and the remarkable success of our students in competitive exams and board certifications.
        </p>
        <div class="w-24 h-1 bg-secondary mx-auto mt-6 rounded-full"></div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="space-y-12">
        <div v-for="i in 2" :key="i" class="space-y-6">
          <div class="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="j in 3" :key="j" class="aspect-[4/5] bg-gray-200 rounded-2xl animate-pulse"></div>
          </div>
        </div>
      </div>

      <!-- Year Wise Results -->
      <div v-else-if="groupedByYear.length > 0" class="space-y-16">
        <div v-for="yearGroup in groupedByYear" :key="yearGroup.year" class="space-y-8">
          <!-- Year Heading -->
          <div class="flex items-center gap-4">
            <h2 class="text-3xl font-black text-gray-900 tabular-nums">{{ yearGroup.year }}</h2>
            <div class="flex-1 h-px bg-gray-200"></div>
            <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Achievements</span>
          </div>

          <div class="flex flex-wrap gap-8" :class="yearGroup.items.length <= 3 ? 'justify-center' : 'justify-start'">
            <div
              v-for="result in yearGroup.items"
              :key="result.id"
              class="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col"
            >
              <!-- Poster Image Container -->
              <div class="relative aspect-[4/5] overflow-hidden bg-gray-100 cursor-pointer" @click="expandImage(result.imageUrl)">
                <img
                  :src="result.imageUrl"
                  :alt="result.description || 'Result Poster'"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <!-- Overlay Gradient -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                
                <!-- Hover Zoom Icon -->
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                  <div class="bg-white/20 backdrop-blur-md p-4 rounded-full text-white shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-500 delay-75">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                    </svg>
                  </div>
                </div>
                
              </div>

              <!-- Content Area -->
              <div class="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 class="text-xl font-bold text-gray-800 mb-2 leading-tight">
                    {{ result.description || (result.category + ' Results ' + result.year) }}
                  </h3>
                  <div v-if="result.exam || result.score" class="flex flex-wrap gap-2 mt-3">
                    <span v-if="result.exam" class="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">{{ result.exam }}</span>
                    <span v-if="result.score" class="text-xs font-bold text-secondary bg-secondary/10 px-2 py-1 rounded">{{ result.score }}</span>
                  </div>
                </div>
                
                <div class="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                  <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Academic Year {{ result.year }}</span>
                  <div class="h-2 w-2 rounded-full bg-secondary animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
        <div class="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">No results found</h3>
        <p class="text-gray-500 text-sm">We are currently updating our hall of fame. Please check back soon!</p>
      </div>
    </div>

    <!-- Image Expansion Modal -->
    <div 
      v-if="expandedImage" 
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-sm transition-opacity duration-300"
      @click="expandedImage = null"
    >
      <button 
        class="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors"
        @click="expandedImage = null"
      >
        <svg class="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
      <img 
        :src="expandedImage" 
        class="max-w-full max-h-[90vh] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] transform transition-transform duration-300 scale-100"
        @click.stop
        alt="Expanded Result"
      />
    </div>
  </div>
</template>

<script>
import { getResults } from '../services/firestoreService'

export default {
  name: 'ResultsPage',
  data() {
    return {
      results: [],
      loading: true,
      expandedImage: null
    }
  },
  computed: {
    groupedByYear() {
      const groups = {}
      this.results.forEach(res => {
        const year = res.year || 'Other'
        if (!groups[year]) groups[year] = []
        groups[year].push(res)
      })
      
      // Sort years descending
      return Object.keys(groups)
        .sort((a, b) => b.localeCompare(a))
        .map(year => ({
          year,
          items: groups[year]
        }))
    }
  },
  async created() {
    await this.fetchResults()
  },
  methods: {
    expandImage(url) {
      if (url) this.expandedImage = url;
    },
    async fetchResults() {
      this.loading = true
      try {
        this.results = await getResults()
      } catch (err) {
        console.error('Failed to load results:', err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
