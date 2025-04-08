<template>
  <section class="hero">
    <div class="hero-content">
      <h1>Hello, I'm Dimas!</h1>
      <p>Developer | GIS Enthusiast | Open Source Enthusiast</p>
      <NuxtLink to="/projects" class="btn">View My Work</NuxtLink>
      <div class="social">
        <!-- Example Social Links -->
        <a href="https://github.com/dmxsan" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
  </section>
</template>

<script setup>
// No script needed for now
</script>

<style scoped>
/* Hero Section Container */
.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background: linear-gradient(135deg, #007acc 0%, #00acc1 100%);
  color: #fff;
  text-align: center;
  padding: 20px;
}

/* Container for hero content */
.hero-content {
  max-width: 800px;
  width: 100%;
}

/* Main Heading */
.hero h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

/* Description Paragraph */
.hero p {
  font-size: 1.5rem;
  margin-bottom: 30px;
}

/* Button Styling */
.btn {
  display: inline-block;
  background: #fff;
  color: #007acc;
  padding: 12px 24px;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
  transition: background 0.3s ease;
}

.btn:hover {
  background: #e6e6e6;
}

/* Social Links Container */
.social {
  margin-top: 20px;
}

/* Social Links */
.social a {
  margin: 0 10px;
  color: #fff;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.social a:hover {
  color: #ddd;
}
</style>
