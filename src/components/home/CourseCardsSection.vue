<template>
  <section class="border-b border-primary-100/70 bg-white py-10 sm:py-14" aria-labelledby="home-courses-title">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-7 flex flex-col items-start justify-between gap-4 sm:mb-8 sm:flex-row sm:items-end">
        <div>
          <p class="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-primary-dark">
            <span class="h-0.5 w-8 rounded-full bg-secondary" aria-hidden="true"></span>
            Our Programs
          </p>
          <h2 id="home-courses-title" class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Find your <span class="text-primary">starting point.</span>
          </h2>
          <p class="mt-3 max-w-xl text-sm leading-6 text-gray-600">From building the basics to preparing for entrance exams, explore a course that fits your goals.</p>
        </div>
        <router-link
          to="/courses"
          class="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-primary/20 bg-white px-5 py-3 text-sm font-semibold text-primary-dark transition-colors hover:border-primary/40 hover:bg-primary-50"
        >
          View All Courses
          <svg class="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </router-link>
      </div>

      <div class="grid gap-5 md:grid-cols-3 lg:gap-6">
        <article
          v-for="course in topCourses"
          :key="course.title"
          class="flex flex-col rounded-2xl border border-primary-100 bg-gradient-to-b from-primary-50/80 to-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-primary-100 bg-white text-primary-dark">
            <svg class="h-6 w-6" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" :d="course.icon" />
            </svg>
          </div>
          <h3 class="text-xl font-bold leading-snug tracking-tight text-gray-900">{{ course.title }}</h3>
          <ul class="mt-4 mb-5 flex-1 space-y-2">
            <li v-for="point in course.points" :key="point" class="flex items-start gap-2.5 text-sm leading-6 text-gray-600">
              <svg class="mt-1 h-4 w-4 shrink-0 text-secondary-dark" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ point }}
            </li>
          </ul>
          <div class="border-t border-gray-100 pt-5">
            <router-link
              to="/admission"
              :aria-label="'Enquire about ' + course.title"
              class="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Enquire about this course
            </router-link>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CourseCardsSection",
  data() {
    return {
      topCourses: [
        {
          title: "8th - 9th Foundation",
          points: ["Building basic concepts", "Mental ability training"],
          icon: "M12 6.5C9 4.5 5.5 4.5 3 5.5v14c2.5-1 6-1 9 1 3-2 6.5-2 9-1v-14c-2.5-1-6-1-9 1zm0 0v14",
        },
        {
          title: "Medical Entrance (NEET)",
          points: ["Medical entrance focus", "Rigorous biology training"],
          icon: "M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z",
        },
        {
          title: "Engineering Entrance (JEE)",
          points: ["Engineering entrance", "Advanced problem solving"],
          icon: "M8 8l-4 4 4 4m8-8l4 4-4 4M14 4l-4 16",
        },
      ],
    };
  },
};
</script>
