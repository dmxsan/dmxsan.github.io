export const useContent = () => {
  const getBlogPosts = () => {
    return useFetch('/api/_content/query', {
      method: 'POST',
      body: {
        where: [{ _path: /^\/blog/ }],
        sort: [{ date: -1 }]
      }
    })
  }

  const getBlogPost = (slug: string) => {
    return useFetch(`/api/_content/query/${slug}`, {
      method: 'GET'
    })
  }

  return {
    getBlogPosts,
    getBlogPost
  }
}