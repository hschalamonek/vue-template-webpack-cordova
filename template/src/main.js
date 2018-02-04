{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
{{#router}}
import router from './router'
{{/router}}

Vue.config.productionTip = false

/* eslint-disable no-new */
function initVue() {
  new Vue({
    el: '#app',
    {{#router}}
    router,
    {{/router}}
    {{#if_eq build "runtime"}}
    render: h => h(App)
    {{/if_eq}}
    {{#if_eq build "standalone"}}
    components: { App },
    template: '<App/>'
    {{/if_eq}}
  })
}

const cordova = !!window._cordovaNative // Android
 || !!window._nativeReady // IOS

if (cordova) {
  const tag = document.createElement('script')
  tag.src = 'cordova.js'
  document.body.appendChild(tag)

  document.addEventListener('deviceready', initVue, false)

} else {
  initVue()
}
