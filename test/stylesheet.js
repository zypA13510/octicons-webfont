'use strict'

const fs = require('fs').promises
const {expect} = require('chai')
require('./output')

const FORMATS = {
  css: 'build/octicons.css',
  scss: 'build/_octicons.scss',
  minified: 'build/octicons.min.css',
}

Object.keys(FORMATS).forEach(format => {
  let fileContent
  before(async () => {
    fileContent = await fs.readFile(FORMATS[format], {encoding: 'utf8'})
  })
  describe(`stylesheet: ${format}`, () => {
    it('is not empty', () => {
      expect(fileContent).to.be.a('string').that.is.not.empty
    })
    it('has valid syntax')
    it('has the font-face defined')
    it('uses the correct font for .octicons class')
    it('sets the correct font-size')
    it('contains the correct code points')
  })
})
