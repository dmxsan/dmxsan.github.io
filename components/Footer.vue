<template>
    <footer class="footer">
      <div class="footer-content">
        <p>© {{ currentYear }} dmxsan. All rights reserved.</p>
        <div class="social-links">
          <!-- Replace these with your actual social links -->
          <a href="https://github.com/dmxsan" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://twitter.com/dmxsan" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Automatically display the current year
  const currentYear = new Date().getFullYear()
  </script>
  
  <style scoped>
  .footer {
    background-color: #f1f1f1;
    padding: 20px;
    text-align: center;
    font-size: 0.9em;
    color: #777;
    border-top: 1px solid #ddd;
  }
  
  .footer-content {
    max-width: 960px;
    margin: 0 auto;
  }
  
  .social-links {
    margin-top: 10px;
  }
  
  .social-links a {
    margin: 0 10px;
    color: #007acc;
    text-decoration: none;
    transition: color 0.2s ease-in-out;
  }
  
  .social-links a:hover {
    color: #005fa3;
  }
  </style>
  