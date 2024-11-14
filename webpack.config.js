// const nodeExternals = require('webpack-node-externals')
// const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin')

module.exports = function (options) {
    const [_, __, appName] = options.output.filename.match(/^(apps\/)(.+)?(\/.*)$/)
    return {
        ...options,
        devtool: 'inline-source-map',
        output: {
            ...options.output,
            filename: `${appName}.[contenthash:8].js`,
        },
        module: {
            rules: [
                {
                    exclude: /node_modules/,
                    test: /\.ts$/,
                    use: {
                        loader: 'swc-loader',
                    },
                },
            ],
        },
        // externals: [
        //     nodeExternals({
        //         allowlist: ['webpack/hot/poll?100'],
        //     }),
        // ],
        // entry: ['webpack/hot/poll?100', options.entry],
        // plugins: [
        //     ...options.plugins,
        //     new webpack.HotModuleReplacementPlugin(),
        //     new webpack.WatchIgnorePlugin({
        //         paths: [/\.js$/, /\.d\.ts$/],
        //     }),
        //     new RunScriptWebpackPlugin({ name: options.output.filename, autoRestart: false }),
        // ],
    }
}
