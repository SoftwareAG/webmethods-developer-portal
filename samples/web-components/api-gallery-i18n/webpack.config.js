const path = require('path');

module.exports = {
    mode: "production",
    // devtool: 'eval-source-map',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')]
            }
        ]
    },
    resolve: {
        extensions: ['.ts']
    },
    output: {
        publicPath: "public",
        filename: "bundle.js",
        path: path.resolve(__dirname, 'public')
    }
}
