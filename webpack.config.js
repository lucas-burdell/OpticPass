const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");
const { title } = require("./package.json");

module.exports = ({ mode } = { mode: "development" }) => ({
    entry: "./src/index.tsx",
    mode,
    plugins: [
        mode === "production" ? new CleanWebpackPlugin() : { apply: () => {} },
        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, "./src/assets/images/") },
            { from: path.resolve(__dirname, "./src/manifest.json") }
        ]),
        new HtmlWebpackPlugin({
            title,
            base: mode === "production" ? "/OpticPass/" : "/",
            favicon: path.resolve(__dirname, "./src/favicon.ico"),
            template: path.resolve(__dirname, "./src/assets/template.html"),
            hash: true,
            inject: true
        }),
        new HtmlWebpackPlugin({
            title,
            base: mode === "production" ? "/OpticPass/" : "/",
            favicon: path.resolve(__dirname, "./src/favicon.ico"),
            filename: "404.html",
            template: path.resolve(__dirname, "./src/assets/template.html"),
            inject: true,
            hash: true
        }),

        new GenerateSW({
            importWorkboxFrom: "local"
        })
    ],
    output: {
        path: path.resolve(__dirname, "./docs"),
        filename: "[name].[contenthash].js",
        publicPath: "/"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        plugins: [new TsconfigPathsPlugin()]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: {
                    test: [/webpack/]
                }
            },
            {
                test: /\.(png|jpg)$/,
                loader: "url-loader",
                exclude: {
                    test: [/node_modules/]
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        port: 8080
    }
});
