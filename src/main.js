/* eslint-disable no-unused-vars */
import Vue from 'vue'
import App from './App.vue'

import { UnleashClient } from 'unleash-proxy-client';

const unleash = new UnleashClient({
  url: 'http://localhost:3003/proxy',
  clientKey: 'bandung',
  appName: 'unleash-vue-app',
  refreshInterval: 5,
});

Vue.config.productionTip = false

function getAppVersion() {
  return 2
}

function getConfig(key) {
  const variant = unleash.getVariant('lalala')
  console.log({ variant })
  const payload = JSON.parse(variant.payload.value)
  return payload[key]
}

function updateAxiosConfig() {
  const apiBaseUrl = getConfig('apiBaseUrl')
  console.log(`baseURL sudah diganti ke ${apiBaseUrl}`)
}

async function initApp () {
  unleash.updateContext({
    userId: `v3`
  })
  await unleash.start()
  console.log('sebelum init Vue')
  updateAxiosConfig()

  unleash.on('update', () => {
    // const variant1 = unleash.getVariant('lalala.v1')
    // const variant2 = unleash.getVariant('lalala.v2')
    // console.log({ variant1, variant2 })
    // console.log('saat unleash update event')
    updateAxiosConfig()
  })

  new Vue({
    render: h => h(App),
  }).$mount('#app')
}

initApp()
