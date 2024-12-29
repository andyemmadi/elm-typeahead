import postcss from 'rollup-plugin-postcss';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';


export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm',
            sourcemap: true,
        },
    ],
    plugins: [
        peerDepsExternal(), 
        resolve(), 
        commonjs(), 
        typescript({tsconfig: './tsconfig.json' }),
        postcss({
            extensions: ['.css', '.scss'],
            use: [
                ['sass', { includePaths: ['./src/**/*.scss'] }],
            ],
            minimize: true,
            extract: false, // Extracts styles into a separate CSS file
        }), 
        terser()
    ],
};
