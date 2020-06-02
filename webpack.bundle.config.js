const path = require('path')

module.exports = () => [
    {
        mode: 'production',
        entry: ['@babel/polyfill', path.resolve(__dirname, 'src/rich-text-editor-bundle.js')],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'rich-text-editor-bundle.js'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
        },
        externals: {
            jquery: '$'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx|json)$/,
                    exclude: path.resolve(__dirname, 'node_modules'),
                    use: {
                        loader: 'ts-loader',
                        options: {
                            onlyCompileBundledFiles: true,
                            transpileOnly: true,
                            compilerOptions: { target: 'es5' }
                        }
                    }
                }
            ]
        },
        stats: 'errors-only',
        performance: {
            hints: false
        }
    }
]
