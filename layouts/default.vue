<template>
  <div>
    <!-- Global Header -->
    <Header />

    <!-- Page content goes here -->
    <NuxtPage />

    <!-- Optional Global Footer -->
  </div>
</template>

<script setup>
// Import your global Header component
import Header from '~/components/Header.vue'
</script>

<style scoped>
/* Global layout styles (optional) */
</style>
