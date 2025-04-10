export default defineContentConfig({
  documentDriven: false,
  highlight: {
    theme: 'github-dark'
  },
  navigation: true,
  contentHead: true,
  markdown: {
    mdc: true,
    toc: {
      depth: 3,
      searchDepth: 3
    }
  }
})