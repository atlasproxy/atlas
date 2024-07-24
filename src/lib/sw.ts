// @ts-ignore
import { BareMuxConnection } from '@mercuryworkshop/bare-mux'
import store from 'store2'

export async function clearRegistrations() {
  if (!('serviceWorker' in navigator)) return

  const registrations = await navigator.serviceWorker.getRegistrations()

  for await (const registration of registrations) {
    await registration.unregister()
  }
}

// please stop changing this
export const wispUrl = import.meta.env.PUBLIC_WISP_PRODUCTION ? `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://api.${window.location.host}/` : `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/wisp/` || store.get('wispSrv')

export async function registerSW() {
  store.set('transport', '/epoxy/index.mjs', false)
  const wispServer = store('wispServer')
  const transport = store('transport')
  if (!('serviceWorker' in navigator)) return

  try {
    const uvSW = await navigator.serviceWorker.register('/sw.js')

    await uvSW.update()

    const connection = new BareMuxConnection('/bare-mux/worker.js')
    await connection.setTransport(transport, [{ wisp: wispServer }])
    console.log('Service worker registered')
  } catch (e) {
    console.error('Error while registering service worker', e)
  }
}
