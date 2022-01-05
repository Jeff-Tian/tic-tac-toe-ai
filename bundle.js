const esbuild = require('esbuild');
const cssModulesPlugin = require('esbuild-css-modules-plugin');

const pathPlugin = {
    name: 'patha',
    setup(build) {
        build.onResolve({filter: /^~antd\/dist\/antd\.css$/}, async () => {
            const result = await build.resolve('./antd/dist/antd.css', {resolveDir: './node_modules'})
            if (result.errors.length > 0) {
                return {errors: result.errors}
            }
            return {path: result.path, external: true}
        })
    },
}


esbuild.build({
    entryPoints: ['src/index.js'],
    define: {DEBUG: 'true', process: JSON.stringify({env: {"PUBLIC_URL": "https://tictactoe.js.org"}})},
    bundle: true,
    minify: false,
    sourcemap: true,
    outfile: 'public\\scripts\\bundle.js',
    target: ['chrome98'],
    loader: {'.png': 'dataurl', '.js': 'jsx', '.svg': 'dataurl', '.jpg': 'dataurl'},
    plugins: [pathPlugin, cssModulesPlugin({
        // optional. set to false to not inject generated CSS into <head>, default is true.
        // could be a function with params content & digest (return a string of js code to inject to page),
        // e.g.
        // ```
        // inject: (cssContent, digest) => `console.log("${cssContent}", "${digest}")`
        // ```
        inject: true,

        localsConvention: 'camelCaseOnly', // optional. value could be one of 'camelCaseOnly', 'camelCase', 'dashes', 'dashesOnly', default is 'camelCaseOnly'

        generateScopedName: (name, filename, css) => string, // optional.

        v2: true // experimental. v2 can bundle images in css, note if set `v2` to true, the `inject` option will be ignored. and v2 only works with `bundle: true`.
    })]
}).catch((error) => {
    console.error(error)
    return process.exit(1);
})