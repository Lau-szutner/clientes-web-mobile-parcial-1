const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Importa el plugin

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Limpia el directorio de salida en cada compilación
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/, // Regla para manejar archivos CSS
        use: ['style-loader', 'css-loader', 'postcss-loader'], // Utiliza estos loaders
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Ruta de tu archivo HTML fuente
      filename: 'index.html', // Nombre del archivo generado en dist
    }),
  ],
};
