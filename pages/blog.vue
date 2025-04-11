<template>
  <main class="px-7 py-32">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold mb-8">Blog</h1>
      
      <div v-if="pending" class="text-neutral-400">Loading posts...</div>
      <div v-else-if="error">{{ error.message }}</div>
      <div v-else-if="!posts || posts.length === 0" class="text-neutral-400">No blog posts found.</div>
      <div v-else class="space-y-8">
        <NuxtLink
          v-for="post in posts"
          :key="post._path"
          :to="`/blog/${post._path.split('/').pop()}`"
          class="block group p-4 -mx-4 rounded-lg hover:bg-neutral-800/30 transition-colors"
        >
          <article>
            <div class="space-y-2">
              <div class="flex flex-wrap items-center gap-2 text-sm text-neutral-400">
                <time>{{ formatDate(post.date) }}</time>
                <div class="flex flex-wrap gap-2">
                  <span v-for="tag in post.tags" :key="tag"
                    class="px-2 py-0.5 rounded-full bg-neutral-800 text-xs"
                  >{{ tag }}</span>
                </div>
              </div>
              <h2 class="text-xl font-semibold group-hover:text-neutral-200 transition-colors">
                {{ post.title }}
              </h2>
              <p class="text-neutral-400">{{ post.description }}</p>
            </div>
          </article>
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<script setup>
const { pending, data: posts } = await useAsyncData(
  'blog-posts',
  () => queryContent('blog').sort({ date: -1 }).find()
)

const error = ref(null)

useHead({
  title: 'Blog - Dmxsan',
  meta: [
    {
      name: 'description',
      content: 'Thoughts and tutorials on GIS development, machine learning, and open source technologies.'
    }
  ]
})

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Clear Nuxt's page cache when component is unmounted
onBeforeUnmount(() => {
  useState('blog-posts').value = null
})
</script>
