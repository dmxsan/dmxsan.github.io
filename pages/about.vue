<template>
  <main class="px-7 py-32 min-h-screen" role="main">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold mb-8">About Me</h1>
      
      <div class="prose prose-invert">
        <p class="text-lg text-neutral-300 mb-6">
          I'm a GIS and Machine Learning enthusiast based in Tokyo, passionate about building tools 
          that make geographic data visualization and analysis more accessible.
        </p>

        <h2 class="text-2xl font-bold mt-12 mb-4">Background</h2>
        <p class="text-neutral-300 mb-6">
          With experience in both GIS development and machine learning, I focus on creating 
          innovative solutions that bridge these two fields. I'm particularly interested in 
          applying ML techniques to solve complex spatial problems.
        </p>

        <h2 class="text-2xl font-bold mt-12 mb-4">Skills</h2>
        <ul class="list-none grid grid-cols-2 gap-4 mt-4">
          <li class="flex items-center space-x-2">
            <span class="text-neutral-300">Geographic Information Systems</span>
          </li>
          <li class="flex items-center space-x-2">
            <span class="text-neutral-300">Machine Learning</span>
          </li>
          <li class="flex items-center space-x-2">
            <span class="text-neutral-300">Python</span>
          </li>
          <li class="flex items-center space-x-2">
            <span class="text-neutral-300">JavaScript/TypeScript</span>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script setup>
useHead({
  title: 'About - Dmxsan',
  meta: [
    {
      name: 'description',
      content: 'Learn more about my experience in GIS development, machine learning, and open source contributions.'
    }
  ]
})
</script>
