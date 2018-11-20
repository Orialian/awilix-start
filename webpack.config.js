// html 提取插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// css 提取 压缩
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 窗口提示
const WebpackNotifierPlugin = require('webpack-notifier');
// 打包进度条
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// 获取参数
const argv = require('yargs-parser')(process.argv.slice(2));
// 配置合并
const merge = require('webpack-merge');
// 删除文件
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const glob = require('glob');

const htmlAfterPlugin = require('./config/htmlAfterPlugin');

// 环境
const _mode = argv.mode || 'development';
const _modeFlag = (_mode == 'production' ? true : false);
const _mergeConfig = require(`./config/webpack.${_mode}.js`);

// 需要处理的入口文件
const files = glob.sync('./src/webapp/views/**/*.entry.js');

let _entry = {};
let _plugins = [];
for(let item of files) {
    if(/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/.test(item)) {
        let entryKey = RegExp.$1;
        _entry[entryKey] = item;
        let [dist, template] = entryKey.split('-');
        _plugins.push(
            new HtmlWebpackPlugin({
                filename: `../views/${dist}/pages/${template}.html`,
                template: `src/webapp/views/${dist}/pages/${template}.html`,
                chunks: ['runtime', 'common',entryKey],
                minify: {
                    removeComments: _modeFlag,
                    collapseWhitespace: _modeFlag
                },
                inject: false
            })
        )
    }
}

let webpackConfig = {
    entry: _entry,
    module: {
        rules: [{
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
                'file-loader',
                {
                    loader: 'image-webpack-loader',
                    options: {
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                        }
                    }
                },
            ],
        }, {
            test: /\.(png|jpg|gif|ttf|otf|svg)$/i,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10 * 1024
                }
            }]
        }, {
            test: /\.css$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                // options: {
                //     publicPath: '../'
                // }
            }, {
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[name]__[local]--[hash:base64:5]'
                }
            }]
        }]
    },
    optimization: {
        noEmitOnErrors: false,
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    name: "common",
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                }
            }
        },
        runtimeChunk: {
            name: "runtime"
        }
    },
    plugins: [
        // new CleanWebpackPlugin(['dist']),
        ..._plugins,
        new htmlAfterPlugin(),
        new MiniCssExtractPlugin({
            filename: _modeFlag ? "styles/[name].[contenthash:5].css" : "styles/[name].css",
            chunkFilename: _modeFlag ? "styles/[id].[contenthash:5].css" : "styles/[id].css"
        }),
        new ProgressBarPlugin({
            format: '  build [:bar] ' + ':percent' + ' (:elapsed seconds)',
            clear: true
        }),
        new WebpackNotifierPlugin({
            title: _mode,
            contentImage: 'http://life.southmoney.com/tuwen/UploadFiles_6871/201804/20180424144712208.jpg'
        }),
    ]
}
module.exports = merge(_mergeConfig, webpackConfig);