module.exports = {
  devServer: {
    port: 8081,  // Força a porta 8081
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
    before: function(app, server) {
      server._watch('./public/index.html');
    }
  }
};