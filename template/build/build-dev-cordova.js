'use strict'

const { fork, spawnSync } = require('child_process')
const os = require('os')
const ifaces = os.networkInterfaces()
const fs = require('fs')
const { DOMParser, XMLSerializer } = require('xmldom')
const config = require('../config')

function getFirstExternalIpv4Address () {
  const iface = Object.values(ifaces)
    .reduce((a, b) => a.concat(b), [])
    .find(iface => 'IPv4' === iface.family && iface.internal === false)

  return iface.address
}

function fixCordovaConfigXml(ip, port) {
  const xml = fs.readFileSync('config.xml', 'utf-8')
  const dom =  new DOMParser().parseFromString(xml);
  const contentSrc = `http://${ip}:${port}/`
  dom.getElementsByTagName('content')[0].setAttribute('src', contentSrc)
  const newXml = new XMLSerializer().serializeToString(dom);
  fs.writeFileSync('cordova/config.xml', newXml, 'utf-8')
}

fork('node_modules/webpack-dev-server/bin/webpack-dev-server', [
  '--host', '0.0.0.0',
  '--inline',
  '--progress',
  '--config', 'build/webpack.dev.conf.js',
  '--contentBase', 'cordova/platforms/android/platform_www'
  // '--contentBase', 'cordova/platforms/ios/platform_www'
], { stdio: 'inherit'})

fixCordovaConfigXml(getFirstExternalIpv4Address(), config.dev.port)
spawnSync('cordova', ['run'], { shell: true, cwd: 'cordova', stdio: 'inherit' })
