<template>
  <section class="bg-primary-50/60 py-10 sm:py-14" aria-labelledby="home-about-title">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid items-center gap-7 lg:grid-cols-2 lg:gap-12">
        <figure class="min-w-0">
          <div class="aspect-video overflow-hidden rounded-xl bg-gray-900 shadow-sm">
            <iframe
              class="h-full w-full border-0"
              src="https://www.youtube.com/embed/Un5OYE5HTHU"
              title="Welcome to Manch Science Classes"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <figcaption class="mt-3 text-center text-sm leading-6 text-gray-600">
            A day at Manch — a glimpse into life beyond the classroom.
          </figcaption>
        </figure>

        <div>
          <p class="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-primary-dark">
            <span class="h-0.5 w-8 rounded-full bg-secondary" aria-hidden="true"></span>
            About Us
          </p>
          <h2 id="home-about-title" class="max-w-lg text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
            Welcome to <span class="text-primary">Manch Science Classes</span>
          </h2>
          <p class="mt-5 text-base leading-7 text-gray-600">
            At Manch, we believe in nurturing creative innovators of tomorrow. Our mission is to provide an interactive learning environment that not only focuses on academic excellence but also well-rounded growth. We empower students to achieve their dreams in competitive exams like NEET, JEE, and Board examinations.
          </p>
          <router-link
            to="/about"
            class="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-primary-dark transition-colors hover:text-primary"
          >
            Read Our Full Story
            <svg class="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default { name: "AboutPreview" };
</script>
