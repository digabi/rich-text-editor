const path = require('path')

module.exports = () => [
    {
        mode: 'development',
        entry: ['@babel/polyfill', path.resolve(__dirname, 'test/tests.front.js')],
        output: {
            filename: 'tests-bundle.js'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
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
