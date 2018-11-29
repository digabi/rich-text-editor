const path = require('path')

module.exports = function(env, argv) {
    const isDevelopment = argv && argv['mode'] === 'development'

    const bundle = (filename, entry) => ({
        mode: isDevelopment ? 'development' : 'production',
        entry,
        output: {
            path: path.resolve(__dirname, 'site'),
            filename
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
        },
        externals: {
            jquery: 'jQuery',
            baconjs: 'Bacon'
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
    })

    return [
        bundle('rich-text-editor-bundle.js', [
            '@babel/polyfill',
            path.resolve(__dirname, 'proto/rich-text-editor-bundle.js')
        ]),
        bundle('tests.js', ['@babel/polyfill', path.resolve(__dirname, 'test/tests.front.js')]),
        bundle('student.js', path.resolve(__dirname, 'proto/student.front.js')),
        bundle('censor.js', path.resolve(__dirname, 'proto/censor.front.js'))
    ]
}
