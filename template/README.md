# {{ name }}

> {{ description }}

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# add cordova platform (android or ios)
cd cordova
cordova platform add [platform]

# check cordova requirements
cd cordova
cordova requirements

# serve at 0.0.0.0:8080 and run cordova project which connects to the dev-server via the host's external IP (hot reload even on mobile)
npm run cordova:dev

# build for production with minification
npm run build

# build for production with minification for cordova release
npm run cordova:build

# build for production with minification for cordova and run project
npm run cordova:run

# build for production and view the bundle analyzer report
npm run build --report
{{#unit}}

# run unit tests
npm run unit
{{/unit}}
{{#e2e}}

# run e2e tests
npm run e2e
{{/e2e}}
{{#if_or unit e2e}}

# run all tests
npm test
{{/if_or}}
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
