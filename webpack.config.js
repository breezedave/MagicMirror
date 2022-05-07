const path = require("path");

module.exports = {
    entry: "./Client/index.js",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env", 
                            "@babel/preset-react", 
                        ],
                    },
                },
            },
            {
                test: /\.scss$/,
                use:
                [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use:
                [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: './Mirror/public/images/'
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: 
                [
                    {
                        loader: "svg-inline-loader"
                    }
                ]
            }
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    output: {
        path: path.resolve(__dirname, "Mirror", "public"),
        filename: "main.js",
    },
};