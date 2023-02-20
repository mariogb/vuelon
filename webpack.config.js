const path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');


const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack');


const opts = {
  DEBUG: true,
  version: 3,
  "ifdef-verbose": true,       // add this for verbose output
  "ifdef-triple-slash": false  // add this to use double slash comment instead of default triple slash
};


module.exports = (env = {}) => ({
  stats: { logging: 'verbose' },

  mode: env.WEBPACK_BUILD === true ? 'production' : 'development',
  devtool: env.WEBPACK_BUILD === true ? 'source-map' : 'eval-source-map',//
  entry: {
    //  vendor: ['vue'],
    app: path.resolve(__dirname, './src/main.ts'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    //   publicPath: '/dist/',
    chunkFilename: '[name]_chF.js',
  },
  resolve: {
    "extensions": ['.ts', '.js'],
    alias: {

      // this isn't technically needed, since the default `vue` entry for bundlers
      // is a simple `export * from '@vue/runtime-dom`. However having this
      // extra re-export somehow causes webpack to always invalidate the module
      // on the first HMR update and causes the page to reload.
      'vue': '@vue/runtime-dom'
    }
  },
  module: {
    rules: [

      // {
      //   test: /\.png$/,
      //   use: [{
      //     loader: 'url-loader'
      //   }]
      // },
      {
        test: /\.pug$/,
        use: [{ loader: 'pug-plain-loader' }]
      },
      {
        test: /\.vue$/,
        use: [{ loader: 'vue-loader' },
     /* { loader: "ifdef-loader", options: opts }*/]
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: { appendTsSuffixTo: [/\.vue$/] }
        , exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      },

    //  { test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3|html|ico)$/, loader: "assets/resource" }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),

    new MiniCssExtractPlugin({
      filename: '[name].css'
    })

    , new webpack.DefinePlugin({
      // Definitions...
      // __VUE_OPTIONS_API__ : env.prod ? true:false
    }),
    new HtmlWebpackPlugin({

      title: 'LONSOFT ',
      template: './src/index.html',
 
      // templateContent: `<body>
      // <script async src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
      // <div id="app"></div></body>`,
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        autor: 'Mario Garcia Burgos'        
      },

      
      



      // createHtmlTagObject({tagName:'div',innerHTML:`<a href="https://github.com/aa">ProtoLon</a>`

    })



  ],

  stats: 'minimal',
  devServer: {
    // inline: true,
    hot: true,
    static: path.join(__dirname, "public"),
    client: {
      overlay: true
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
})

