# vue-webpack-boilerplate with cordova support including hot-reload even on mobile

## Documentation

- Forked from [this](https://github.com/vuejs-templates/webpack): search there for more details.

## Usage for android

Install Android studio or SDK only + Gradle for your platform.

``` bash
$ npm install -g vue-cli cordova
$ vue init hschalamonek/vue-template-webpack-cordova my-project
$ cd my-project
$ npm install
$ cd cordova
$ cordova platform add android
$ cordova requirements
$ cd ..
$ npm run cordova:dev
```
