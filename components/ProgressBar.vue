<template>
  <div
    class="fixed top-0 left-0 right-0 h-0.5 bg-neutral-800 z-50"
    :class="{ 'opacity-0': !isLoading }"
  >
    <div
      class="h-full bg-blue-500 transition-[width] ease-in-out duration-200"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const progress = ref(0)
const isLoading = ref(false)
let progressInterval: ReturnType<typeof setInterval> | null = null

const resetProgress = () => {
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
  progress.value = 0
  isLoading.value = false
}

const startProgress = () => {
  resetProgress()
  isLoading.value = true
  progress.value = 0
  progressInterval = setInterval(() => {
    if (progress.value < 90) {
      progress.value += (90 - progress.value) * 0.1
    }
  }, 100)
}

const finishProgress = () => {
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
  progress.value = 100
  setTimeout(() => {
    isLoading.value = false
    progress.value = 0
  }, 400)
}

onMounted(() => {
  router.beforeEach((to, from, next) => {
    if (to.path !== from.path) {
      startProgress()
    }
    next()
  })

  router.afterEach((to, from) => {
    if (to.path !== from.path) {
      finishProgress()
    }
  })

  router.onError(() => {
    resetProgress()
  })
})

onUnmounted(() => {
  resetProgress()
})
</script>

<style scoped>
.opacity-0 {
  transition: opacity 400ms ease-out;
}
</style>