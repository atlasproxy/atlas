import store from 'store2'
import { clearRegistrations, registerSW, wispUrl } from './sw'
import { handleCloak, type cloaks } from './cloak'

store.set('panicKey', '', false)
store.set('cloak', 'none', false)
store.set('transport', '/epoxy/index.mjs', false)
store.set('wispServer', wispUrl, false)

document.addEventListener('astro:page-load', async () => {
  if ('serviceWorker' in navigator) {
    await clearRegistrations()
    await registerSW()
  }

  const cloak = store('cloak') as keyof typeof cloaks
  if (cloak) {
    handleCloak(cloak)
  }
})
