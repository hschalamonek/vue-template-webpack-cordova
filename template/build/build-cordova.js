'use strict'

const rm = require('rimraf')
const fs = require('fs')
const ncp = require('ncp').ncp
const { execSync } = require('child_process')

execSync('node build/build.js', { stdio: 'inherit' })
fs.copyFileSync('config.xml', 'cordova/config.xml')
rm('cordova/www', err => {
  if (err) throw err
  ncp('dist', 'cordova/www', err => {
    if (err) throw err

    const forwardedArgs = process.argv.slice(3)
    execSync(`cordova ${forwardedArgs.join(' ')}`, { cwd: 'cordova', stdio: 'inherit' })
  })
})
