<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen bg-neutral-900 text-neutral-200 flex flex-col">
    <ProgressBar />
    <Header />
    <main class="flex-1">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<style scoped>
/* Example minimal styling; can be extended or replaced with Tailwind classes if you prefer. */
</style>
