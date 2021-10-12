module.exports = {
    env: {
      customKey: 'localhost',
    },
    async rewrites() {
      return [
        {
          source: '/',
          destination: 'http://localhost:3001' // Proxy to Backend
        }
      ]
    }
  }