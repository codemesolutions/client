const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.setPublicPath('public');
mix.webpackConfig({
    node: {
        fs: "empty",
        module:"empty"
    }
})
mix.react('app/index.js', 'public/js').sass('app/style.scss', 'public/css');
