<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-800">
    <!-- Hide Navbar/Footer on admin routes -->
    <template v-if="!isAdminRoute">
      <MainNavbar />
    </template>

    <main :class="isAdminRoute ? '' : 'flex-grow pt-20'">
      <router-view />
    </main>

    <template v-if="!isAdminRoute">
      <MainFooter />
    </template>

    <!-- Global Toast Notification (always present) -->
    <ToastNotification />

    <!-- Navratri Celebration Wishes & Animations -->
    <NavratriCelebration />

    <!-- Scroll-triggered Admission Enquiry Modal & WhatsApp Contact -->
    <ScrollEnquiryModal />
  </div>
</template>

<script>
import MainNavbar from './components/common/MainNavbar.vue'
import MainFooter from './components/common/MainFooter.vue'
import ToastNotification from './components/common/ToastNotification.vue'
import NavratriCelebration from './components/common/NavratriCelebration.vue'
import ScrollEnquiryModal from './components/common/ScrollEnquiryModal.vue'

export default {
  name: 'App',
  components: {
    MainNavbar,
    MainFooter,
    ToastNotification,
    NavratriCelebration,
    ScrollEnquiryModal
  },
  computed: {
    isAdminRoute() {
      return this.$route.path.startsWith('/admin')
    }
  }
}
</script>

<style>
/* Global styles can also go here, but tailwind is in main.css */
</style>
