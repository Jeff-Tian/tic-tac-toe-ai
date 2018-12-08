const path = require('path');
const theme = require('./package.json').theme;

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
                noParse: /jquery/,
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {loader: 'less-loader', options: {modifyVars: theme}},
                ],
                include: /node_modules/,
            },
        ]
    }
};