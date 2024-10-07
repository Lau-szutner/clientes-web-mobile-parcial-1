const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Importa el plugin

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, // Limpia el directorio de salida en cada compilación
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Regla para manejar archivos JS/JSX
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
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i, // Regla para manejar archivos de imagen
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]', // Conserva el nombre y extensión original del archivo
              outputPath: 'images/', // Carpeta de salida para imágenes
              esModule: false, // Para evitar conflictos con el manejo de imágenes
            },
          },
        ],
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
