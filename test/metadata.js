'use strict'

const fs = require('fs').promises
const {expect} = require('chai')
require('./output')

const ICON_NAME = 'alert'
const FORMATS = {
  decimal: {
    path: 'build/codepoints.json',
    value: 61485,
  },
  hexadecimal: {
    path: 'build/metadata.json',
    value: 'f02d',
  },
}

Object.keys(FORMATS).forEach(format => {
  describe(`metadata: ${format}`, () => {
    let fileContent, jsonObject
    before(async () => {
      fileContent = await fs.readFile(FORMATS[format].path, {encoding: 'utf8'})
    })
    it('is valid json', () => {
      expect(() => {
        jsonObject = JSON.parse(fileContent)
      }).to.not.throw()
    })
    it('is not empty', () => {
      expect(jsonObject).to.be.an('object').that.is.not.empty
    })
    it('has the same value as defined', () => {
      expect(jsonObject).to.have.property(ICON_NAME, FORMATS[format].value)
    })
  })
})
