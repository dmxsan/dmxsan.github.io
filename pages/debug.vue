<template>
  <main class="px-7 py-32">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold mb-8">Debug Page</h1>
      <div v-if="pending" class="text-neutral-400">Loading posts...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else class="space-y-4">
        <div v-for="post in posts" :key="post?._path">
          <strong>{{ post?.title || 'Untitled' }}</strong> - {{ post?.description || 'No description available' }}
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
const { pending, data: posts, error } = await useAsyncData(
  'debug-posts',
  () => queryContent('blog').find()
)
</script>