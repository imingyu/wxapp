import resolve from 'rollup-plugin-node-resolve';

export default {
    entry: 'src/index.js',
    format: 'cjs',
    plugins: [resolve()],
    dest: 'dist/index.js'
};