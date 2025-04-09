<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen bg-neutral-900 text-neutral-200 flex flex-col">
    <!-- Header / Navigation -->
    <header class="py-4 px-8 flex justify-end">
      <nav class="space-x-4">
        <!-- Change these routes to your actual pages or external links -->
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/Projects">Projects</NuxtLink>
        <NuxtLink to="/blog">Blog</NuxtLink>
        <NuxtLink to="/About">About</NuxtLink>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <!-- NuxtPage renders the current page component -->
      <NuxtPage />
    </main>

    <!-- (Optional) Global Footer -->
    <footer class="py-4 px-8 text-sm text-center text-neutral-400">
      © {{ currentYear }} YourName. All rights reserved.
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const currentYear = new Date().getFullYear()
</script>

<style scoped>
/* Example minimal styling; can be extended or replaced with Tailwind classes if you prefer. */
</style>
