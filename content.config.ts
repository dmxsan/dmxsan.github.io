export default defineContentConfig({
  documentDriven: true,
  highlight: {
    theme: 'github-dark'
  },
  markdown: {
    toc: {
      depth: 3,
      searchDepth: 3
    }
  },
  navigation: {
    fields: ['title', 'description', 'date', 'tags']
  }
})
