const path = require('path')
const { ProvidePlugin } = require('webpack')

module.exports = () => [
    {
        mode: 'development',
        entry: ['@babel/polyfill', path.resolve(__dirname, 'test/tests.front.js')],
        output: {
            filename: 'tests-bundle.js',
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            alias: {
                buffer: 'buffer',
            },
        },
        plugins: [
            new ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            }),
        ],
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
                            compilerOptions: { target: 'es5' },
                        },
                    },
                },
            ],
        },
        stats: 'errors-only',
        performance: {
            hints: false,
        },
    },
]
