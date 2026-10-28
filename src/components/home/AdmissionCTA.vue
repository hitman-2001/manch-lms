<template>
  <section class="bg-primary-50/60 px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8" aria-labelledby="admission-cta-title">
    <div class="admission-panel relative mx-auto max-w-7xl overflow-hidden rounded-2xl border border-primary-800 px-6 py-8 sm:px-9 sm:py-9">
      <div class="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <div class="max-w-xl">
          <p class="mb-2 text-xs font-bold uppercase tracking-widest text-amber-300">Take the next step</p>
          <h2 id="admission-cta-title" class="text-2xl font-bold tracking-tight text-white sm:text-3xl">Let's talk about your admission.</h2>
          <p class="mt-3 text-sm leading-6 text-primary-100">Have questions about courses or admissions? Send an enquiry or speak with the Manch team.</p>
        </div>
        <div class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:shrink-0">
          <router-link to="/admission" class="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-secondary-light px-5 py-3 text-sm font-bold text-primary-950 transition-colors hover:bg-amber-200">
            Enquire for Admission
            <svg class="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </router-link>
          <a href="tel:+918830000914" class="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">Call 883 0000 914</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default { name: "AdmissionCTA" };
</script>

<style scoped>
.admission-panel {
  background: linear-gradient(115deg, var(--color-primary-950), var(--color-primary-800));
}
.admission-panel::before {
  content: "";
  position: absolute;
  right: -5rem;
  top: -10rem;
  width: 24rem;
  height: 24rem;
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: 50%;
  box-shadow: 0 0 0 3rem rgb(255 255 255 / 3%);
  pointer-events: none;
}
</style>

