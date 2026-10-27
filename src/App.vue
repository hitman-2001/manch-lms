<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-800">
    <!-- Hide Navbar/Footer on admin routes and during print -->
    <template v-if="!isAdminRoute">
      <MainNavbar class="print:hidden" />
    </template>

    <main :class="isAdminRoute ? '' : 'flex-grow pt-16 print:pt-0 print:m-0 print:p-0'">
      <router-view />
    </main>

    <template v-if="!isAdminRoute">
      <MainFooter class="print:hidden" />
    </template>

    <!-- Global Toast Notification (always present) -->
    <ToastNotification class="print:hidden" />

    <!-- Scroll-triggered Admission Enquiry Modal & WhatsApp Contact -->
    <ScrollEnquiryModal class="print:hidden" />
  </div>
</template>

<script>
import MainNavbar from './components/common/MainNavbar.vue'
import MainFooter from './components/common/MainFooter.vue'
import ToastNotification from './components/common/ToastNotification.vue'
import ScrollEnquiryModal from './components/common/ScrollEnquiryModal.vue'

export default {
  name: 'App',
  components: {
    MainNavbar,
    MainFooter,
    ToastNotification,
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
/* Global print adjustments to ensure clean documents */
@media print {
  header,
  footer,
  nav,
  aside,
  .print\:hidden,
  [class*="whatsapp"],
  [id*="whatsapp"] {
    display: none !important;
  }

  body {
    background-color: #ffffff !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}
</style>
