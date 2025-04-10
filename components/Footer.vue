<template>
  <footer class="px-7 py-8 mt-32">
    <div class="max-w-3xl mx-auto">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
        <p class="text-center sm:text-left">
          Built with Nuxt and Tailwind CSS
        </p>
        <div class="flex items-center gap-4">
          <a 
            href="https://github.com/dmxsan/dmxsan.github.io" 
            target="_blank" 
            rel="noopener noreferrer"
            class="hover:text-neutral-200 transition-colors"
          >
            Source
          </a>
          <span class="hidden sm:inline">·</span>
          <a 
            href="mailto:your-email@example.com"
            class="hover:text-neutral-200 transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

// Automatically display the current year
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background-color: #f1f1f1;
  padding: 20px;
  text-align: center;
  font-size: 0.9em;
  color: #777;
  border-top: 1px solid #ddd;
}

.footer-content {
  max-width: 960px;
  margin: 0 auto;
}

.social-links {
  margin-top: 10px;
}

.social-links a {
  margin: 0 10px;
  color: #007acc;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

.social-links a:hover {
  color: #005fa3;
}
</style>
