import store from 'store2'
import { clearRegistrations, registerSW, wispUrl } from './sw'

store.set('panicKey', '', false)
store.set('cloak', 'none', false)
store.set('transport', '/epoxy/index.mjs', false)
store.set('wispServer', wispUrl, false)

if ('serviceWorker' in navigator) {
  await clearRegistrations()
  await registerSW()
}
