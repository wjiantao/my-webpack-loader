const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    devtool: 'source-map',
    mode: 'production',
    entry: {
        index: './src/index',
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, './dist'),
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: './src/loader/clearlog-loader',
            },
            {
                test: /\.(css)$/,
                use: './src/loader/css-loader',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({})
    ]
}