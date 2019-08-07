'use strict'

const fs = require('fs').promises

describe('output', () => {
  it('has eot font', () =>
    fs.access('build/octicons.eot'))
  it('has woff font', () =>
    fs.access('build/octicons.woff'))
  it('has woff2 font', () =>
    fs.access('build/octicons.woff2'))
  it('has ttf font', () =>
    fs.access('build/octicons.ttf'))
  it('has svg font', () =>
    fs.access('build/octicons.svg'))
  it('has decimal metadata', () =>
    fs.access('build/codepoints.json'))
  it('has hexadecimal metadata', () =>
    fs.access('build/metadata.json'))
  it('has css stylesheet', () =>
    fs.access('build/octicons.css'))
  it('has minified css stylesheet', () =>
    fs.access('build/octicons.min.css'))
  it('has css source map', () =>
    fs.access('build/octicons.min.css.map'))
  it('has scss stylesheet', () =>
    fs.access('build/_octicons.scss'))
})
