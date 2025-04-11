export default defineAppConfig({
  content: {
    navigation: {
      fields: ['title', 'description', 'date', 'tags']
    },
    highlight: {
      theme: 'github-dark',
      preload: ['javascript', 'typescript', 'vue']
    }
  }
})