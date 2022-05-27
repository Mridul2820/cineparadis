module.exports = {
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: /node_modules\/@firebase\/auth/,
      },
    ],
  },
  ignoreWarnings: [/Failed to parse source map/],
};
