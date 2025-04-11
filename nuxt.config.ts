export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: true,
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
          name: 'description',
          content: 'Personal branding site for dmxsan featuring projects, articles, and more.'
        },
        { name: 'format-detection', content: 'telephone=no' }
      ]
    }
  },
  nitro: {
    output: {
      dir: './docs'
    },
    preset: 'static',
    prerender: {
      routes: ['/blog']
    }
  },
  experimental: {
    payloadExtraction: false
  },
  css: [
    '@/assets/css/main.css'
  ],
  modules: ['@nuxtjs/tailwindcss', '@nuxt/content', '@nuxt/image'],
  content: {
    navigation: {
      fields: ['title', 'description', 'date', 'tags']
    }
  },
  components: {
    global: true,
    dirs: ['~/components']
  },
  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {}
    }
  }
})