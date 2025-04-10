interface MetaOptions {
  title?: string
  description?: string
  image?: string
  type?: string
}

export const useMeta = (options: MetaOptions) => {
  const route = useRoute()
  const baseUrl = 'https://dmxsan.github.io'
  const defaultDescription = 'GIS & ML Enthusiast / Open Source Engineer based in Tokyo'
  const defaultImage = `${baseUrl}/og-image.jpg`

  useHead({
    title: options.title ? `${options.title} | Dmxsan` : 'Dmxsan',
    meta: [
      {
        name: 'description',
        content: options.description || defaultDescription,
      },
      // Open Graph
      {
        property: 'og:title',
        content: options.title || 'Dmxsan',
      },
      {
        property: 'og:description',
        content: options.description || defaultDescription,
      },
      {
        property: 'og:image',
        content: options.image || defaultImage,
      },
      {
        property: 'og:url',
        content: `${baseUrl}${route.path}`,
      },
      {
        property: 'og:type',
        content: options.type || 'website',
      },
      // Twitter
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:site',
        content: '@dmxsan',
      },
      {
        name: 'twitter:title',
        content: options.title || 'Dmxsan',
      },
      {
        name: 'twitter:description',
        content: options.description || defaultDescription,
      },
      {
        name: 'twitter:image',
        content: options.image || defaultImage,
      },
    ],
  })
}