export default {
  default: {
    navigation: {
      fields: ['title', 'description', '_path']
    }
  },
  blog: {
    directory: 'blog',
    navigation: {
      fields: ['title', 'description', 'date', 'tags', '_path']
    }
  }
}