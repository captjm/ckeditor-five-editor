// webpack.config.js
const path = require('path');
const {styles} = require('@ckeditor/ckeditor5-dev-utils');

const CKE_PACKAGES = [
    '@ckeditor/ckeditor5-core',
    '@ckeditor/ckeditor5-engine',
    '@ckeditor/ckeditor5-ui',
    '@ckeditor/ckeditor5-utils',
    '@ckeditor/ckeditor5-upload',
    '@ckeditor/ckeditor5-image',
    '@ckeditor/ckeditor5-theme-lark',
];

module.exports = {
    mode: 'production',

    entry: {
        editor: './src/editor.ts',
        cif: './src/cif/index.ts',
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            name: '[name]',
            type: 'umd',
            export: 'default'
        },
        globalObject: 'this'
    },

    externals: {
        './cif/index': 'cif',
        './cif': 'cif',
        '../cif/index': 'cif',
        '../cif': 'cif'
    },

    module: {
        rules: [
            {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
                type: 'asset/source',   // equivalent of raw-loader; built into webpack 5
            },
            {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            injectType: 'singletonStyleTag',
                            attributes: {'data-cke': true},
                        },
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: styles.getPostCssConfig({
                                themeImporter: {
                                    themePath: require.resolve(
                                        '@ckeditor/ckeditor5-theme-lark',
                                    ),
                                },
                                minify: true,
                            }),
                        },
                    },
                ],
            },
            {
                test: /\.module\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/i,
                exclude: /ckeditor5-[^/\\]+[/\\]theme[/\\]/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.svg$/i,
                exclude: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\]/,
                type: 'asset/resource',
            },
            {
                test: /\.handlebars$/,
                loader: 'handlebars-loader',
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    configFile: path.resolve(__dirname, 'tsconfig.json'),
                    context: __dirname
                },
                exclude: /node_modules/
            }
        ],
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: Object.fromEntries(
            CKE_PACKAGES.map(pkg => [
                pkg,
                path.resolve(__dirname, 'node_modules', pkg),
            ]),
        ),
    },
};