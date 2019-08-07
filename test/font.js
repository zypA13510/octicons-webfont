'use strict'

const {expect} = require('chai')
const fontkit = require('fontkit')
const glob = require('glob')
require('./output')

const ALERT_ICON_CODE_POINT = 61485

;['ttf', 'woff', 'woff2'].forEach(type => {
  describe(`font: ${type}`, () => {
    let font, numberOfIcons, numberOfFiles
    before(async() => Promise.all([
      new Promise((resolve, reject) => {
        fontkit.open(`build/octicons.${type}`, (err, result) => {
          if (err) {
            return reject(err)
          } else {
            font = result
            numberOfIcons = font.characterSet.length
            return resolve()
          }
        })
      }),
      new Promise((resolve, reject) => {
        glob('node_modules/@primer/octicons/build/svg/*.svg', (err, files) => {
          if (err) {
            return reject(err)
          } else {
            numberOfFiles = files.length
            return resolve()
          }
        })
      }),
    ]))
    describe('number of icons', () => {
      it('should be greater than zero', () => {
        expect(numberOfIcons).to.be.above(0)
      })
      it('should be equal to the number of source svg files', () => {
        expect(numberOfIcons).to.equal(numberOfFiles)
      })
    })
    describe('icon', () => {
      it('occupies the defined code point', () => {
        expect(font.hasGlyphForCodePoint(ALERT_ICON_CODE_POINT)).to.be.true
      })
      it('has a non-empty svg path', () => {
        expect(font.glyphForCodePoint(ALERT_ICON_CODE_POINT).path.toSVG())
          .to.be.a('string').that.is.not.empty
      })
    })
  })
})

// these types are not supported by fontkit
;['eot', 'svg'].forEach(type => {
  describe(`font: ${type}`, () => {
    describe('number of icons', () => {
      it('should be greater than zero')
      it('should be equal to the number of source svg files')
    })
    describe('icon', () => {
      it('occupies the defined code point')
      it('has a non-empty svg path')
    })
  })
})
