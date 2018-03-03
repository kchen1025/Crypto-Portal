var webpack = require('webpack');


module.exports = {
  entry: ['./app/app.js'],
  plugins:[
    
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      './app/components',
      './app/actions',
      './app/reducers'
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
