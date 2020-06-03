const mix = require('laravel-mix');

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

mix.webpackConfig({
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {loader: 'file-loader'},
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {removeTitle: true},
                {convertColors: {shorthex: false}},
                {convertPathData: false}
              ]
            }
          }
        ]
      }
    ]
  }
})

mix.options({   
  processCssUrls: false,
  // purifyCss: true,
})