import { resolve } from 'path';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: true, // enables server-side rendering
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  app: {
    head: {
      title: 'Dimas Maulana Ichsan',
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        { rel: 'icon', type: 'image/png', href: '/dmxsan.png' }
      ],
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
  modules: ['@nuxtjs/tailwindcss', '@nuxt/content', '@nuxt/image'],
  content: {
    documentDriven: false,
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