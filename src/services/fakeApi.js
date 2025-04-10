// Fake API implementation with local data

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export default {
  get: async (url) => {
    await delay(300)
    if (url === '/products') {
      return { data: orders }
    }
    return { data: [] }
  },
  post: async (url, data) => {
    await delay(300)
    const newOrder = { id: orders.length + 1, ...data }
    orders.push(newOrder)
    return { data: newOrder }
  },
  put: async (url, data) => {
    await delay(300)
    const id = parseInt(url.split('/').pop())
    const index = orders.findIndex(order => order.id === id)
    if (index !== -1) {
      orders[index] = { ...orders[index], ...data }
      return { data: orders[index] }
    }
    throw new Error('Order not found')
  },
  delete: async (url) => {
    await delay(300)
    const id = parseInt(url.split('/').pop())
    const index = orders.findIndex(order => order.id === id)
    if (index !== -1) {
      orders.splice(index, 1)
      return { data: { id } }
    }
    throw new Error('Order not found')
  }
}