<template>
  <main class="px-7 py-32 min-h-screen" role="main">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold mb-8">Projects</h1>
      
      <div class="grid gap-8">
        <article class="p-6 rounded-lg bg-neutral-800/50 hover:bg-neutral-800 transition-colors">
          <h2 class="text-2xl font-bold mb-4">GIS Visualization Tool</h2>
          <p class="text-neutral-300 mb-4">
            A web-based tool for visualizing and analyzing geographic data using modern web technologies.
          </p>
          <div class="flex flex-wrap gap-2">
            <span class="px-2 py-1 text-sm rounded bg-neutral-700 text-neutral-300">TypeScript</span>
            <span class="px-2 py-1 text-sm rounded bg-neutral-700 text-neutral-300">WebGL</span>
            <span class="px-2 py-1 text-sm rounded bg-neutral-700 text-neutral-300">GIS</span>
          </div>
        </article>

        <article class="p-6 rounded-lg bg-neutral-800/50 hover:bg-neutral-800 transition-colors">
          <h2 class="text-2xl font-bold mb-4">ML for Spatial Analysis</h2>
          <p class="text-neutral-300 mb-4">
            Machine learning models for analyzing spatial patterns and making predictions based on geographic data.
          </p>
          <div class="flex flex-wrap gap-2">
            <span class="px-2 py-1 text-sm rounded bg-neutral-700 text-neutral-300">Python</span>
            <span class="px-2 py-1 text-sm rounded bg-neutral-700 text-neutral-300">TensorFlow</span>
            <span class="px-2 py-1 text-sm rounded bg-neutral-700 text-neutral-300">GeoPandas</span>
          </div>
        </article>
      </div>
    </div>
  </main>
</template>

<script setup>
useHead({
  title: 'Projects - Dmxsan',
  meta: [
    {
      name: 'description',
      content: 'Explore my projects in GIS development, machine learning, and open source tools.'
    }
  ]
})
</script>
