<template>
  <main class="px-7 py-32">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold mb-8">
        Blog
      </h1>
      
      <div class="space-y-8">
        <article v-for="post in posts" :key="post._path" 
          class="group cursor-pointer p-4 -mx-4 rounded-lg hover:bg-neutral-800/30 transition-colors"
          tabindex="0"
          @click="handleClick(post._path)"
          @keydown.enter="handleClick(post._path)"
        >
          <div class="space-y-2">
            <div class="flex flex-wrap items-center gap-2 text-sm text-neutral-400">
              <time>{{ formatDate(post.date) }}</time>
              <div class="flex flex-wrap gap-2">
                <span v-for="tag in post.tags" :key="tag"
                  class="px-2 py-0.5 rounded-full bg-neutral-800 text-xs"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <h2 class="text-xl font-semibold group-hover:text-neutral-200 transition-colors">
              {{ post.title }}
            </h2>
            <p class="text-neutral-400">
              {{ post.description }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </main>
</template>

<script setup>
// We're using composables directly without await since we're in the setup function
const { data: posts } = await useAsyncData('blog-posts', () => 
  queryContent('blog')
    .sort({ date: -1 }) // Sort by date in descending order
    .where({ _partial: false }) // Exclude partial content
    .find()
)

const handleClick = (path) => {
  const slug = path.split('/').pop().replace('.md', '')
  navigateTo(`/blog/${slug}`)
}

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
</script>
