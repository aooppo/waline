const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { version } = require('./package.json');

const pkgName = 'Waline';

module.exports = {
  entry: {
    [`${pkgName}.min`]: path.resolve(__dirname, 'src/index.tsx'),
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: pkgName,
    libraryExport: 'default',
    libraryTarget: 'umd',
  },

  resolve: {
    alias: {
      react: 'anujs',
      'react-dom': 'anujs',
      'prop-types': 'anujs/lib/ReactPropTypes',
      'create-react-class': 'anujs/lib/createClass',
    },
    extensions: ['.ts', '.tsx', '.js'],
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { sourceMap: false },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: false },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          { loader: 'babel-loader?cacheDirectory' },
          { loader: 'ts-loader' },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader?cacheDirectory',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({ VERSION: JSON.stringify(version) }),
    new htmlWebpackPlugin({
      inject: false,
      templateContent: ({ htmlWebpackPlugin }) => `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${htmlWebpackPlugin.options.title}</title>
        </head>
        <body>
        <span id="/" class="leancloud_visitors">
          <em class="post-meta-item-text">阅读量 </em>
          <i class="leancloud-visitors-count"></i>
        </span>
          <div id="waline" style="max-width: 800px;margin: 0 auto;"></div>
          ${htmlWebpackPlugin.tags.bodyTags}
          <script>
            new Waline({
              el: '#waline',
              path: '/',
              visitor: true,
              serverURL: 'http://localhost:3000'
            });
          </script>
        </body>
        </html>
      `,
    }),
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
