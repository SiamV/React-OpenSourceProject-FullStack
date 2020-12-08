const config = (async () => {
  try {
    config = await import('./config.js')
  }catch (e) {}
})();

module.exports = {
  entry: __dirname + '/client/main.js',
  output: {
    publicPath: '/client/build/',
    path: __dirname + "/client/build/",
    filename: 'bundle.js'
  },
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  devServer: {
    host: 'localhost',
    port: 8080, //project
    historyApiFallback: true,
    hot: true,
    proxy: [
      {
        context: ['/api', '/auth', '/ws'],
        target: `http://localhost:${config.port || 8090}`, //server
        secure: false,
        changeOrigin: true,
        ws: false
      }
    ],
    overlay: {
      warnings: true,
      errors: true
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' },
        { loader: 'css-loader' }
        ]
      },
      {
        test: /\.js$|jsx/,
        use: [{ loader: 'react-hot-loader/webpack' },
        { loader: 'babel-loader' }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 400000,
            },
          },
        ],
      },
    ]
  }
}