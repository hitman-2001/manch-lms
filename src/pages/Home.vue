<template>
  <div class="home-page bg-white">
    <HeroCarousel />
    <CourseCardsSection />
    <AboutPreview />
    <AdmissionCTA />
  </div>
</template>

<script>
import HeroCarousel from "../components/home/HeroCarousel.vue";
import AboutPreview from "../components/home/AboutPreview.vue";
import CourseCardsSection from "../components/home/CourseCardsSection.vue";
import AdmissionCTA from "../components/home/AdmissionCTA.vue";

export default {
  name: "HomePage",
  components: { HeroCarousel, AboutPreview, CourseCardsSection, AdmissionCTA },
};
</script>

<style scoped>
.home-page :deep(a:focus-visible),
.home-page :deep(button:focus-visible) {
  outline: 2px solid var(--color-primary-dark);
  outline-offset: 4px;
}
.home-page :deep(.admission-panel a:focus-visible) {
  outline-color: #fcd34d;
}
</style>
