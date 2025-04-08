<template>
    <section class="projects">
      <h2>Featured Projects</h2>
      <div class="project-list">
        <!-- Example project card -->
        <article class="project-card">
          <h3>Project One</h3>
          <p>My amazing project that uses Nuxt and deploys to GitHub Pages.</p>
          <a href="https://github.com/dmxsan/project-one" target="_blank">View on GitHub</a>
        </article>
        <!-- Add more projects as needed -->
      </div>
    </section>
  </template>
  
  <script setup>
  // No script needed, but you could fetch data here if you want
  </script>
  
  <style scoped>
  .projects {
    padding: 20px;
  }
  .project-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  .project-card {
    background: #f1f1f1;
    padding: 20px;
    border-radius: 8px;
    flex: 1 1 200px;
  }
  </style>
  