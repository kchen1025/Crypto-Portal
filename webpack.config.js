var webpack = require('webpack');


module.exports = {
  entry: ['webpack-hot-middleware/client','react-hot-loader/patch','./app/app.js'],
  plugins:[
    // OccurenceOrderPlugin is needed for webpack 1.x only
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js',
    hotUpdateChunkFilename:'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json'
  },
  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      './app/components'
    ],
    alias: {
      'Main': 'app/components/Main.js'
    },
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    loaders: [
      {
        loader: ['babel-loader'],
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['transform-decorators-legacy']
        },
        test: /\.jsx?$/,
        use: ['react-hot-loader/webpack'],
        exclude: /(node_modules|bower_components)/
      }, {
        test: /\.json$/,
        loader: "json"
      }, {
        test: /\.scss$/,
        loaders: ["style-loader","css-loader","sass-loader"]
      }
    ]
  }
};
