'use strict'

const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

module.exports = {
  options: {
    map: {
      inline: false,
      annotation: 'build/',
    },
    processors: [
      autoprefixer(),
      cssnano(),
    ],
  },
  dist: {
    files: [{
      expand: true,
      cwd: 'build/',
      src: ['**/*.css'],
      dest: 'build/',
      ext: '.min.css',
      extDot: 'last',
    }],
  },
}
