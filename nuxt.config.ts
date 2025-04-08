// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: false, // disables server-side rendering, making your site a SPA/static site
  devtools: { enabled: true },
  app: {
    head: {
      title: 'dmxsan - Developer & Innovator',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Personal branding site for dmxsan featuring projects, articles, and more.',
        },
      ],
    },
  },
});
