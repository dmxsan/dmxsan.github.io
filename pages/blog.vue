<template>
    <section class="blog">
      <h2>Latest Articles</h2>
      <article class="blog-post">
        <h3>First Post</h3>
        <p>This is an example blog post overview...</p>
        <!-- Could link to a detail page if you have dynamic routes, like /blog/first-post -->
        <!-- <NuxtLink to="/blog/first-post">Read More</NuxtLink> -->
      </article>
      <!-- More articles as needed -->
    </section>
  </template>
  
  <script setup></script>
  
  <style scoped>
  .blog {
    padding: 20px;
  }
  .blog-post {
    background: #fff;
    margin-bottom: 20px;
    padding: 20px;
    border-left: 5px solid #007acc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
  </style>
  