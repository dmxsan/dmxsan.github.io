<template>
  <main class="px-7 py-32">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold mb-8">Debug Content</h1>
      <pre class="bg-neutral-800 p-4 rounded overflow-auto">{{ debug }}</pre>
    </div>
  </main>
</template>

<script setup>
const { data: debug } = await useAsyncData('debug', async () => {
  const content = await queryContent().find()
  return JSON.stringify(content, null, 2)
})
</script>