const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// get the compiled js module for template
const template = require('../dist/templates/templates');

// get the compiled js module for components
const components = require('../dist/components/components');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        component_css: ['./dist/components/components.css'],
    },
    mode: "development",
    output: {
        path: path.resolve(__dirname, '../build')
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
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin(
            {
                templateContent: (config) => {
                    const inlineCss = config.compilation.assets['component_css.css'].source();
                    return template.getHTML(
                        {
                            body: components.Header,
                            inlineCss: inlineCss,
                            compProps: {
                                text: 'This is Header'
                            }
                        }
                    );
                },
                inject: false
            }
        )
    ]
}
