<template>
  <main class="px-7 py-32">
    <div class="max-w-3xl mx-auto">
      <ContentDoc>
        <template #default="{ doc }">
          <article class="prose prose-invert prose-lg max-w-none">
            <h1 class="text-4xl font-bold mb-4">{{ doc.title }}</h1>
            <div class="flex items-center gap-4 mt-4 mb-8 text-sm text-neutral-400">
              <time>{{ formatDate(doc.date) }}</time>
              <div class="flex gap-2">
                <span v-for="tag in doc.tags" :key="tag" 
                  class="px-2 py-0.5 rounded-full bg-neutral-800 text-xs">
                  {{ tag }}
                </span>
              </div>
            </div>
            <ContentRenderer :value="doc" />
          </article>
        </template>
        <template #not-found>
          <div class="text-center py-16">
            <h1 class="text-2xl font-bold mb-4">Post not found</h1>
            <p class="text-neutral-400 mb-8">The blog post you're looking for doesn't exist.</p>
            <NuxtLink 
              to="/blog"
              class="inline-block px-4 py-2 rounded-lg bg-neutral-800 text-neutral-300 hover:bg-neutral-700 transition-colors"
            >
              ← Back to Blog
            </NuxtLink>
          </div>
        </template>
      </ContentDoc>
      
      <div class="mt-16 pt-8 border-t border-neutral-800">
        <NuxtLink 
          to="/blog"
          class="text-neutral-400 hover:text-neutral-200 transition-colors focus:outline-none rounded px-3 py-2"
        >
          ← Back to Blog
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<script setup>
const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

useHead({
  title: 'Blog - Dmxsan',
  meta: [
    {
      name: 'description',
      content: 'Blog post about GIS development and machine learning'
    }
  ]
})
</script>

<style>
.prose {
  max-width: 100%;
}

.prose code:not(pre code) {
  background-color: rgb(31, 31, 31);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
}

.prose pre {
  background-color: rgba(31, 31, 31, 0.5);
  padding: 1rem;
  border-radius: 0.5rem;
}

.prose a {
  color: rgb(96, 165, 250);
  text-decoration: none;
}

.prose a:hover {
  color: rgb(147, 197, 253);
}

.prose img {
  border-radius: 0.5rem;
}
</style>