const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
entry: './src/index.tsx',
mode: 'development',
output: {
filename: 'bundle.js',
path: path.resolve(__dirname, 'build')
},
plugins: [
new HtmlWebpackPlugin({
    template: './public/index.html'
})
],
resolve: {
extensions: [
    '.tsx',
    '.ts',
    '.js'
]
},
module: {
rules: [
    {
    test: /\.ts(x)?$/,
    exclude: /node_modules/,
    use: 'ts-loader'
    },
    {
    test: /\.js(x)?$/,
    exclude: /node_modules/,
    use: 'babel-loader'
    },
    {
    test: /\.css$/,
    use: [
        'style-loader',
        'css-loader'
    ]
    },
    {
    test: /\.png$/,
    use: [
        {
        loader: 'url-loader',
        options: {
            mimetype: 'image/png'
        }
        }
    ]
    },
    {
    test: /\.svg$/,
    use: 'file-loader'
    }
]
}
};
