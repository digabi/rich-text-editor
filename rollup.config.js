import typescript from 'rollup-plugin-typescript'

function bundle(name) {
    return {
        input: `./src/${name}`,
        output: {
            file: `./dist-amd/${name}.js`,
            format: 'amd'
        },
        external: ['jquery', 'baconjs', 'sanitize-html'],
        plugins: [typescript({ target: 'es5', include: ['src/*.js', 'src/*.ts'] })],
        watch: {
            include: ['src/*.js', 'src/*.ts'],
            clearScreen: false
        }
    }
}

export default [bundle('math-editor'), bundle('rich-text-editor')]
