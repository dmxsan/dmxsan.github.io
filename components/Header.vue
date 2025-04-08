<template>
    <nav>
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/projects">Projects</NuxtLink></li>
        <li><NuxtLink to="/blog">Blog</NuxtLink></li>
        <li><NuxtLink to="/about">About</NuxtLink></li>
      </ul>
    </nav>
  </template>
  
  <script setup>
  // No special logic needed yet, 
  // but you can add refs, reactive data, or composables if you want
  </script>
  
  <style scoped>
  nav {
    display: flex;
    justify-content: center;
    background-color: #007acc;
    padding: 16px;
  }
  ul {
    display: flex;
    gap: 24px;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  a {
    color: white;
    font-weight: bold;
    text-decoration: none;
  }
  </style>
  