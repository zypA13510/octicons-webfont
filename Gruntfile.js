'use strict'

const path = require('path')
const loadGruntConfig = require('load-grunt-config')

module.exports = function(grunt) {
  loadGruntConfig(grunt, {
    configPath: path.join(process.cwd(), 'tasks/config'),
    init: true,
    data: {
      version: grunt.option('releaseversion') || 'nightly',
    },
  })
}
