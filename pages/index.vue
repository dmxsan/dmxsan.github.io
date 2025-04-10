<!-- pages/index.vue -->
<template>
  <main class="px-7 py-32 min-h-screen" role="main" aria-labelledby="page-title">
    <div class="max-w-3xl mx-auto">
      <h1 id="page-title" class="text-4xl font-bold mb-4 font-mono">
        Dmxsan
      </h1>
      
      <p class="text-neutral-400 mb-8">
        GIS & ML Enthusiast / Open Source Engineer based in Yogyakarta, Indonesia.
      </p>

      <section aria-labelledby="current-status">
        <h2 id="current-status" class="sr-only">Current Status</h2>
        <div class="mb-6">
          <div class="inline-flex items-center px-3 py-1 rounded-full bg-neutral-800 text-sm text-neutral-300">
            🎯 Currently working on Open Source Projects
          </div>
        </div>
      </section>

      <section aria-labelledby="skills-section">
        <h2 id="skills-section" class="sr-only">Skills and Expertise</h2>
        <div class="mb-8">
          <div class="flex flex-wrap gap-2" role="list">
            <span role="listitem" class="px-3 py-1 rounded-md bg-neutral-800 text-sm hover:bg-neutral-700 transition-colors">
              GIS
            </span>
            <span role="listitem" class="px-3 py-1 rounded-md bg-neutral-800 text-sm hover:bg-neutral-700 transition-colors">
              Machine Learning
            </span>
            <span role="listitem" class="px-3 py-1 rounded-md bg-neutral-800 text-sm hover:bg-neutral-700 transition-colors">
              Open Source
            </span>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-section">
        <h2 id="about-section" class="sr-only">About Me</h2>
        <div class="mb-8 text-neutral-400">
          <p>
            I dream of building cool hacks and making them come true. Passionate about
            geographic information systems and machine learning applications.
          </p>
        </div>
      </section>

      <section aria-labelledby="social-section">
        <h2 id="social-section" class="sr-only">Social Links</h2>
        <div class="flex space-x-4 mb-12" role="list">
          <a
            href="https://github.com/dmxsan"
            target="_blank"
            rel="noopener noreferrer"
            class="text-neutral-400 hover:text-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
            aria-label="Visit my GitHub profile"
          >
            <span class="i-carbon-logo-github text-xl" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section aria-labelledby="contact-section">
        <h2 id="contact-section" class="sr-only">Contact</h2>
        <div class="mt-16">
          <a
            href="mailto:your-email@example.com"
            class="inline-block px-4 py-2 rounded-lg bg-neutral-800 text-neutral-300 hover:bg-neutral-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Send me an email to collaborate"
          >
            🤝 Let's collaborate
          </a>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
useHead({
  meta: [
    {
      name: 'description',
      content: 'GIS & ML Enthusiast / Open Source Engineer based in Tokyo. Building tools for geographic data visualization and analysis.'
    }
  ]
})
</script>

<style scoped>
.i-carbon-logo-github {
  display: inline-block;
  width: 1.2em;
  height: 1.2em;
  background-color: currentColor;
  mask-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>');
}
</style>
