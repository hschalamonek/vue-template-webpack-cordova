'use strict'

const replaceCordovaConfigContentSrc = require('./utils').replaceCordovaConfigContentSrc
const { fork, spawnSync } = require('child_process')
const os = require('os')
const ifaces = os.networkInterfaces()
const config = require('../config')

function getFirstExternalIpv4Address () {
  const iface = Object.values(ifaces)
    .reduce((a, b) => a.concat(b), [])
    .find(iface => 'IPv4' === iface.family && iface.internal === false)

  return iface.address
}

fork('node_modules/webpack-dev-server/bin/webpack-dev-server', [
  '--host', '0.0.0.0',
  '--inline',
  '--progress',
  '--config', 'build/webpack.dev.conf.js',
  '--contentBase', 'cordova/platforms/android/platform_www'
  // '--contentBase', 'cordova/platforms/ios/platform_www'
], { stdio: 'inherit'})

replaceCordovaConfigContentSrc(`http://${getFirstExternalIpv4Address()}:${config.dev.port}/`)
spawnSync('cordova', ['run'], { shell: true, cwd: 'cordova', stdio: 'inherit' })
