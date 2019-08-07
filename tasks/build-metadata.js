'use strict'

const fs = require('fs').promises
const path = require('path')
const yaml = require('js-yaml')

const SVG_DIR = 'node_modules/@primer/octicons/build/svg'
const INPUT_FILE = 'lib/codepoints.yml'
const OUTPUT_DIR = 'build'
const OUTPUT_FILE_DEC = 'codepoints.json'
const OUTPUT_FILE_HEX = 'metadata.json'

async function buildMetadata() {
  let raw = fs.readFile(INPUT_FILE, 'utf8')
  let filenames = fs.readdir(SVG_DIR)
  let icons = filenames.then(names => names.map(name => name.replace(/\.svg$/i, '')))
  let codePoints = yaml.safeLoad(await raw)
  let resultDec = {}, resultHex = {}
  ;(await icons).forEach(icon => {
    if (!Object.prototype.hasOwnProperty.call(codePoints, icon)) {
      throw new Error(`Code point of icon ${icon} is not defined.`)
    }
    resultDec[icon] = codePoints[icon]
    resultHex[icon] = codePoints[icon].toString(16)
  })
  await fs.mkdir(OUTPUT_DIR).catch(() => {
    // do nothing, most likely the directory already exists
  })
  return Promise.all([
    fs.writeFile(path.join(OUTPUT_DIR, OUTPUT_FILE_DEC), JSON.stringify(resultDec)),
    fs.writeFile(path.join(OUTPUT_DIR, OUTPUT_FILE_HEX), JSON.stringify(resultHex)),
  ])
}

buildMetadata().catch(err => console.error(err))
