<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useHead } from '#app'

useHead({
  title: 'Dmxsan',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'GIS & ML Enthusiast / Open Source Engineer' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

html {
  scroll-behavior: smooth;
  background: #1a1a1a;
}

::selection {
  background: rgba(255, 255, 255, 0.1);
}

/* Focus outline styles */
:focus:not(:focus-visible) {
  outline: none;
}

:focus-visible {
  outline: 2px solid rgb(59, 130, 246);
  outline-offset: 2px;
}

/* Improve text rendering */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* Hide scrollbar in WebKit browsers */
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
</style>
