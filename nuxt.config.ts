import { resolve } from 'path';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: false, // disables server-side rendering, making your site a SPA/static site
  devtools: { enabled: true },
  app: {
    head: {
      title: 'dmxsan - GIS Developer',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Personal branding site for dmxsan featuring projects, articles, and more.',
        },
        { name: 'format-detection', content: 'telephone=no' }
      ],
    },
  },
  nitro: {
    output: {
      dir: './docs'  // Set the output directory to docs
    },
    preset: 'static'
  },
  experimental: {
    payloadExtraction: false, // Disable payload extraction to avoid issues with static site generation
  },
  css: [
    '@/assets/css/main.css' // Main CSS file for global styles
  ], 
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content'
  ],
  content: {
    documentDriven: false,
    navigation: {
      fields: ['title', 'description', '_path', 'date', 'tags']
    },
    experimental: {
      clientDB: true,
      stripQueryParameters: false
    },
    markdown: {
      anchorLinks: false,
      toc: {
        depth: 3,
        searchDepth: 3
      }
    }
  },
  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    }
  }
});