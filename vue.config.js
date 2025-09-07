// vue.config.js
module.exports = {
  devServer: {
    port: 8081,
    open: true,
    hot: true,
    proxy: {
      '/api': {
        target: 'https://localhost:7052',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
    setupMiddlewares: (middlewares) => {
      return middlewares;
    },
  },
};