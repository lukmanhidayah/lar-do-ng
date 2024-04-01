const mix = require("laravel-mix");
require('laravel-mix-postcss-config');


/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js("resources/js/app.js", "public/js")
    .react()
    .postCss("resources/js/Assets/Css/app.css", "public/css")
    .postCssConfig({
        postcssOptions: {
            plugins: [
                require("postcss-import"),
                require("tailwindcss"),
                require("autoprefixer"),
            ],
        },
    })
    .webpackConfig(require("./webpack.config"));

if (mix.inProduction()) {
    mix.version();
}

mix.browserSync('127.0.0.1:8000');

