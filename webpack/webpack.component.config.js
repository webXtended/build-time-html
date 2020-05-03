const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        components: ['./src/components/index.ts'],
        templates: ['./src/templates/index.tsx']
    },
    mode: "development",
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name]/[name].js',
        library: 'build-time-html',
        libraryTarget: 'umd',
        globalObject: 'this'
    },
    externals:{
        react: 'react',
        "react-dom": "react-dom"
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'typings-for-css-modules-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]/[name].css',
        })
    ]
}
