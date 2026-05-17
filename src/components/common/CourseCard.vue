<template>
  <div class="bg-white rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100/85 overflow-hidden flex flex-col h-full hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300">
    <div class="p-6 md:p-8 flex-grow flex flex-col">
      <!-- Tag / Badge -->
      <div class="mb-5 flex items-center justify-between">
        <span 
          class="px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full"
          :class="tagColorClass"
        >
          {{ tag }}
        </span>
        <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          {{ category }}
        </span>
      </div>

      <!-- Title -->
      <h3 class="text-xl md:text-2xl font-black text-gray-800 mb-3 tracking-tight leading-snug">
        {{ title }}
      </h3>

      <!-- Description -->
      <p class="text-gray-500 text-xs md:text-sm mb-6 leading-relaxed font-medium">
        {{ description }}
      </p>

      <!-- Divider -->
      <div class="w-full h-px bg-gray-100 mb-6"></div>

      <!-- Points (Bullet points) -->
      <ul class="space-y-4 mb-8 flex-grow">
        <li v-for="(point, idx) in points" :key="idx" class="flex items-start text-xs md:text-sm text-gray-600 leading-relaxed font-medium">
          <span class="flex-shrink-0 h-5 w-5 bg-secondary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
            <svg class="h-3 w-3 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span>{{ point }}</span>
        </li>
      </ul>
    </div>
    
    <!-- Action Button -->
    <div class="px-6 md:px-8 pb-6 md:pb-8 mt-auto">
      <router-link 
        to="/admission" 
        class="w-full bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-primary/25 text-xs md:text-sm tracking-wider uppercase text-center block"
      >
        Enquire Details
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseCard',
  props: {
    title: { type: String, required: true },
    tag: { type: String, default: 'General' },
    category: { type: String, default: 'Coaching' },
    description: { type: String, default: 'Excellent academic programs tailored for success.' },
    points: { type: Array, required: true }
  },
  computed: {
    tagColorClass() {
      const lowerTag = this.tag.toLowerCase();
      if (lowerTag.includes('foundation')) {
        return 'bg-blue-50 text-blue-600 border border-blue-100';
      } else if (lowerTag.includes('board')) {
        return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
      } else if (lowerTag.includes('entrance') || lowerTag.includes('competitive') || lowerTag.includes('neet') || lowerTag.includes('jee')) {
        return 'bg-rose-50 text-rose-600 border border-rose-100';
      }
      return 'bg-gray-50 text-gray-600 border border-gray-100';
    }
  }
}
</script>
