const mix = require('laravel-mix')
require('laravel-mix-purgecss')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.react('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')

mix.options({   
  processCssUrls: false,
  // purifyCss: true,
  whitelistPatterns: [/ic-/, /icomoon/],
})
.purgeCss({
  extend: {
    content: [
      path.join(__dirname, 'resources/views/*.edge'),
      path.join(__dirname, 'resources/js/*.js'),
      path.join(__dirname, 'resources/js/*.jsx')
    ],
  }
})