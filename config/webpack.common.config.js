const VueLoaderPlugin = require('vue-loader/lib/plugin');
const relativePath = require('./relative-path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: relativePath('src/main.js'),
    service_worker: relativePath('service_worker/ServiceWorkerEntry.ts')
  },
  output: {
    path: relativePath('dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          }
        }
      },
      {
        test: /\.(ts|tsx)?$/,
        loader: 'ts-loader',
        exclude: [
          /node_modules/,
          /service_worker/
        ],
        options: {
          appendTsSuffixTo: [/\.vue$/],
          instance: 'main'
        }
      },
      {
        test: /\.(ts|tsx)?$/,
        loader: 'ts-loader?tsconfig=service_worker/tsconfig.json',
        exclude: [
          /node_modules/,
          /src/
        ],
        options: {
          instance: 'service_worker'
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },

      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(jpg|png|gif|ico|mp4|eot|woff|woff2|svg|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]?[hash]'
            }
          }
        ]
      }

    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json', '.scss'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: relativePath('static/index.html'),
      inject: true
    }),
    new CopyWebpackPlugin([{
      from: relativePath('static'),
      to: relativePath('dist'),
      toType: 'dir'
    }])
  ]
};
