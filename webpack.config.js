const webpack = require('webpack');
const path = require('path');

const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpritePlugin = require('svg-sprite-loader/plugin');
const autoprefixer = require('autoprefixer');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

const jsSourcePath = path.join(__dirname, './app');
const buildPath = path.join(__dirname, './public');
const imgPath = path.join(__dirname, './app/assets/images');
const fontPath = path.join(__dirname, './app/assets/fonts');
const iconPath = path.join(__dirname, './app/assets/icons');
const sourcePath = path.join(__dirname, './app');

// Common plugins
const plugins = [
    new SpritePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor-[hash].js',
        minChunks(module) {
            const context = module.context;
            return context && context.indexOf('node_modules') >= 0;
        },
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(nodeEnv),
        },
    }),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
        template: path.join(sourcePath, 'index.html'),
        path: buildPath,
        filename: 'index.html',
    }),

];

// Common rules
const rules = [
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
            'babel-loader',
        ],
    },
    {
        test: /\.svg$/,
        use: [
            {
                loader: 'svg-sprite-loader',
                options: {
                    extract: true,
                    spriteFilename: 'icons-sprite.svg',
                },
            },
            'svgo-loader',
        ],
        include: iconPath,
    },
    {
        test: /\.(jp?g|png|svg)$/,
        loader: 'url-loader',
        options: {
            limit: 25000,
        },

    },

    {

        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff',
                    name:'assets/fonts/[name]-[hash].[ext]'
                }
            }

        ]
    },
    {

        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,

        use: [
            { loader: 'file-loader',
                options: {
                    limit: 10000,
                    name:'assets/fonts/[name]-[hash].[ext]'
                }}
        ]
    },

    {
        test: /\.css$/,
        loader: "style-loader!css-loader"
    },

]

if (isProduction) {
    console.log('iProduction build')
    // Production plugins
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            },
            output: {
                comments: false,
            },
        },
            new webpack.HotModuleReplacementPlugin()
        ),

    );

    // Production rules

} else {
    // Development plugins
    plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new DashboardPlugin()
    );

    // Development rules

}

module.exports = {
    devtool: isProduction ? false : 'source-map',
    context: jsSourcePath,
    entry: {
        js: ['babel-polyfill','./app.js'],
    },
    output: {
        path: buildPath,
        publicPath: '',
        filename: 'app-[hash].js',
    },
    module: {
        rules,
    },
    resolve: {
        extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
        modules: [

            'node_modules',
            './app/containers',
            './app/components',
            './app/components/files',
            './app/components/rules',
            './app/components/fileTypes',
            './app/api',
        ],
    },
    plugins,
    devServer: {
        contentBase: path.join(__dirname, "public"),
        historyApiFallback: true,
        port: 3002,
        compress: isProduction,
        inline: !isProduction,
        hot: true,
        host: '0.0.0.0',
        disableHostCheck: true,
        stats: {
            assets: true,
            children: false,
            chunks: false,
            hash: false,
            modules: false,
            publicPath: false,
            timings: true,
            version: false,
            warnings: true,
            colors: {
                green: '\u001b[32m',
            },
        },
    },
};