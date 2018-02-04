'use strict'

const replaceCordovaConfigContentSrc = require('./utils').replaceCordovaConfigContentSrc
const rm = require('rimraf')
const ncp = require('ncp').ncp
const { execSync } = require('child_process')

execSync('node build/build.js', { stdio: 'inherit' })
replaceCordovaConfigContentSrc('index.html')
rm('cordova/www', err => {
  if (err) throw err
  ncp('dist', 'cordova/www', err => {
    if (err) throw err

    const forwardedArgs = process.argv.slice(3)
    execSync(`cordova ${forwardedArgs.join(' ')}`, { cwd: 'cordova', stdio: 'inherit' })
  })
})
