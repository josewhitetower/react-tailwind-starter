const path = require("path");
const HtmlWepackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function(env) {
    return {
        entry: './src/index.js',
        output:{
            path: path.resolve(__dirname, 'build'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test:/\.(js|jsx)$/,
                    exclude:/(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test:/\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader", "postcss-loader",
                    ],
                },
            ],
        },
        plugins: [
            new HtmlWepackPlugin({
                template: './index.html',
                filename: 'index.html',
                minify: true
            }),
            new MiniCssExtractPlugin({
                filename: "styles.css",
                chunkFilename: "styles.css"
            })
        ],
        devServer: {
            contentBase: path.join(__dirname, 'build'),
            port: 8081,
            open: 'Google Chrome', // 'google-chrome' on Linux and 'chrome' on Windows
        },
        devtool: env.developmet ? 'source-map': '',
    }
}