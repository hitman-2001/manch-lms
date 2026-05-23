<template>
  <div class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row items-center gap-12">
        <div class="w-full lg:w-1/2">
          <!-- Video Embed -->
          <div class="aspect-video rounded-lg overflow-hidden shadow-lg bg-black">
            <iframe
              class="w-full h-full"
              src="https://www.youtube.com/embed/Un5OYE5HTHU"
              title="Welcome to Manch Science Classes"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <!-- test -->
        
        <div class="w-full lg:w-1/2">
          <h2 class="text-sm font-bold text-secondary uppercase tracking-wider mb-2">About Us</h2>
          <h3 class="text-3xl font-bold text-gray-900 mb-6">Welcome to Manch Science Classes</h3>
          <p class="text-gray-600 mb-6 leading-relaxed">
            At Manch, we believe in nurturing creative innovators of tomorrow. Our mission is to provide an interactive learning environment that not only focuses on academic excellence but also well-rounded growth. We empower students to achieve their dreams in competitive exams like NEET, JEE, and Board examinations.
          </p>
          <router-link to="/about" class="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors">
            Read Our Full Story
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPreview'
}
</script>
