<template>
  <header 
    class="fixed top-0 left-0 right-0 z-50 px-7 py-4 bg-neutral-900 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/90"
    role="banner"
  >
    <nav class="max-w-3xl mx-auto flex justify-between items-center">
      <!-- Home link with logo -->
      <NuxtLink to="/" class="hover:opacity-90 transition-opacity">
        <img src="/dmxsan.png" alt="Dmxsan Logo" class="h-8 w-auto" />
      </NuxtLink>

      <!-- Desktop navigation -->
      <div class="hidden md:flex items-center space-x-4">
        <ul class="flex space-x-4 text-sm">
          <li v-for="item in navItems" :key="item.path">
            <NuxtLink 
              :to="item.path"
              class="hover:text-neutral-200 transition-colors focus:outline-none rounded px-2 py-1"
              :class="{ 
                'text-neutral-200': isActive(item.path),
                'text-neutral-400': !isActive(item.path)
              }"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>

        <!-- Social links -->
        <div class="flex space-x-3 text-neutral-400">
          <a href="https://github.com/dmxsan" 
            target="_blank" 
            rel="noopener noreferrer"
            class="hover:text-neutral-200 transition-colors focus:outline-none">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Mobile menu button -->
      <button 
        class="md:hidden p-2"
        @click="isMenuOpen = !isMenuOpen"
        :aria-expanded="isMenuOpen"
      >
        <span class="sr-only">Menu</span>
        <svg 
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path 
            v-if="!isMenuOpen"
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path 
            v-else
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- Mobile menu -->
      <div 
        v-if="isMenuOpen"
        class="md:hidden fixed inset-x-0 top-[73px] p-4 bg-neutral-900/95 backdrop-blur"
      >
        <ul class="flex flex-col space-y-4">
          <li v-for="item in navItems" :key="item.path">
            <NuxtLink 
              :to="item.path"
              class="block py-2 hover:text-neutral-200 transition-colors focus:outline-none"
              :class="{ 
                'text-neutral-200': isActive(item.path),
                'text-neutral-400': !isActive(item.path)
              }"
              @click="isMenuOpen = false"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isMenuOpen = ref(false)

const navItems = [
  { path: '/blog', label: 'Blog' },
  { path: '/projects', label: 'Projects' },
  { path: '/about', label: 'About' }
]

const isActive = (path) => {
  if (path === '/blog') {
    return route.path.startsWith('/blog')
  }
  return route.path === path
}

// Close menu when route changes
watch(
  () => route.path,
  () => {
    isMenuOpen.value = false
  }
)
</script>
