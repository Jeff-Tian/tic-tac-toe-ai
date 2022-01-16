import {babel} from '@rollup/plugin-babel';
import css from "rollup-plugin-import-css";
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';

export default ({
    input: 'src/ai.js',
    output: {
        file: 'public/ai.js',
        format: 'iife'
    },
    plugins: [
        replace({
            "process.env.NODE_ENV": JSON.stringify("development")
        }),
        resolve(),
        json(),
        babel({
            exclude: 'node_modules/**',
            presets: ['@babel/env', '@babel/preset-react']
        }),
        css()
    ],
    external: ['react', 'react-dom']
})