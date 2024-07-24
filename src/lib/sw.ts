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
  if (!('serviceWorker' in navigator)) return

  const registration = await navigator.serviceWorker.register('/sw.js')
  // const altreg = await navigator.serviceWorker.register('/data.js', {
  //   scope: 'libs'
  // })

  await registration.update()
  // await altreg.update()

  const connection = new BareMuxConnection('/bare-mux/worker.js')
  await connection.setTransport('/epoxy/index.mjs', [{ wisp: wispUrl }])
  console.log('Service worker registered')
}
